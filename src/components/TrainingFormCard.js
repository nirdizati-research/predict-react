/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import FetchState from './FetchState';
import {
  CLASSIFICATION,
  classificationMethods,
  clusteringMethods,
  encodingMethods,
  NEXT_ACTIVITY,
  outcomeRuleControls,
  predictionMethods,
  REGRESSION,
  regressionMethods,
  thresholdControls
} from '../reference';
import OutcomeRules from './training/OutcomeRules';
import Threshold from './training/Threshold';
import CheckboxGroup from './training/CheckboxGroup';
import {splitLabels} from '../helpers';
import {TextField} from 'react-md/lib/TextFields/index';

const defaultPrefix = 1;
const defaultThreshold = 0;
const groupStyle = {height: 'auto'};

const initialState = (props) => {
  const splitId = props.splitLabels[0] ? props.splitLabels[0].value : 0;
  return {
    split_id: splitId,
    encodings: [encodingMethods[0].value],
    clusterings: [clusteringMethods[0].value],
    classification: [classificationMethods[0].value],
    regression: [regressionMethods[0].value],
    prefix_length: defaultPrefix,
    displayWarning: false,
    predictionMethod: REGRESSION,
    rule: outcomeRuleControls[0].value,
    threshold: {
      value: thresholdControls[0].value,
      threshold: defaultThreshold
    }
  };
};

class TrainingFormCard extends Component {
  constructor(props) {
    super(props);

    // TODO group to {} by prediction method
    this.state = initialState(this.props);
  }

  addOrRemove(list, value) {
    const index = list.indexOf(value);
    if (index > -1) {
      return list.filter((val) => val !== value);
    } else {
      return [...list, value];
    }
  }

  // Change methods
  checkboxChange(_, event) {
    const value = event.target.value;
    switch (event.target.name) {
      case 'encodings[]':
        this.setState({encodings: this.addOrRemove(this.state.encodings, value)});
        break;
      case 'clusterings[]':
        this.setState({clusterings: this.addOrRemove(this.state.clusterings, value)});
        break;
      case 'regression[]':
        this.setState({regression: this.addOrRemove(this.state.regression, value)});
        break;
      case 'classification[]':
        this.setState({classification: this.addOrRemove(this.state.classification, value)});
        break;
      case 'rule':
        // not a list, but works
        this.setState({rule: value});
        break;
      // no default
    }

    this.setState((prevState, _) => {
      return {displayWarning: this.displayWarningCheck(prevState)};
    });
  }

  onPredictionMethodChange(value) {
    this.setState({predictionMethod: value});
    this.setState((prevState, _) => {
      return {displayWarning: this.displayWarningCheck(prevState)};
    });
  }

  selectChange(value, _) {
    this.setState({split_id: value});
    this.props.onSplitChange(value);
  }

  onThresholdChange(threshold) {
    this.setState({threshold});
  }

  onPrefixChange(prefixLength) {
    this.setState({prefix_length: parseInt(prefixLength, 10)});
  }

  displayWarningCheck(prevState) {
    switch (prevState.predictionMethod) {
      case REGRESSION:
        return !(prevState.encodings.length !== 0
          && prevState.clusterings.length !== 0
          && prevState.regression.length !== 0);
      case CLASSIFICATION:
        return !(prevState.encodings.length !== 0
          && prevState.clusterings.length !== 0
          && prevState.classification.length !== 0);
      case NEXT_ACTIVITY:
        return !(prevState.encodings.length !== 0
          && prevState.clusterings.length !== 0
          && prevState.classification.length !== 0);
      // no default
    }
  }

  // On submit
  onSubmit() {
    switch (this.state.predictionMethod) {
      case REGRESSION:
        this.props.onSubmit(this.getWithMethods(this.state.regression));
        break;
      case CLASSIFICATION:
        this.props.onSubmit(this.getClassificationPayload());
        break;
      case NEXT_ACTIVITY:
        this.props.onSubmit(this.getWithMethods(this.state.classification));
        break;
      // no default
    }
  }

  getWithMethods(methods) {
    return {
      type: this.state.predictionMethod,
      split_id: this.state.split_id,
      config: {
        prefix_length: this.state.prefix_length || defaultPrefix,
        encodings: this.state.encodings,
        clusterings: this.state.clusterings,
        methods: methods
      }
    };
  }

  getClassificationPayload() {
    let actualThreshold;
    if (this.state.threshold.value === thresholdControls[0].value) {
      actualThreshold = this.state.threshold.value;
    } else {
      actualThreshold = this.state.threshold.threshold;
    }
    let payload = this.getWithMethods(this.state.classification);
    payload.config.rule = this.state.rule;
    payload.config.threshold = actualThreshold;
    return payload;
  }

  onReset() {
    this.setState(initialState(this.props));
  }

  render() {
    let warning = null;
    if (this.state.displayWarning) {
      warning = <p className="md-text md-text--error">Select at least one from every option</p>;
    }
    const regressionFragment = this.state.predictionMethod === REGRESSION ?
      <CheckboxGroup controls={regressionMethods} id="regression" label="Regression methods"
                     onChange={this.checkboxChange.bind(this)}
                     value={this.state.regression.join(',')}/> : null;

    // TODO refactor as 1 component in React 16.0
    const classificationFragment =
      (this.state.predictionMethod === CLASSIFICATION) ||
      (this.state.predictionMethod === NEXT_ACTIVITY) ?
        <CheckboxGroup controls={classificationMethods} id="classification" label="Classification methods"
                       onChange={this.checkboxChange.bind(this)}
                       value={this.state.classification.join(',')}/> : null;

    const outcomeRuleFragment = this.state.predictionMethod === CLASSIFICATION ?
      <OutcomeRules checkboxChange={this.checkboxChange.bind(this)}
                    value={this.state.rule}/> : null;
    const thresholdFragment = this.state.predictionMethod === CLASSIFICATION ?
      <Threshold onChange={this.onThresholdChange.bind(this)}
                 threshold={this.state.threshold}/> : null;
    return (
      <Card className="md-block-centered">
        <CardTitle title="Training">
          <SelectField
            id="log-name-select"
            placeholder="Split id will be here"
            className="md-cell"
            menuItems={this.props.splitLabels}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.state.split_id}
          /></CardTitle>
        <CardText>
          <div className="md-grid md-grid--no-spacing">
            <div className="md-cell md-cell--12">
              <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                                     value={this.state.predictionMethod} inline controls={predictionMethods}
                                     onChange={this.onPredictionMethodChange.bind(this)}/>
            </div>
            <div className="md-cell md-cell--3">
              <SelectionControlGroup type="checkbox" label="Encoding methods" name="encodings" id="encodings"
                                     onChange={this.checkboxChange.bind(this)} controls={encodingMethods}
                                     value={this.state.encodings.join(',')} controlStyle={groupStyle}/>
            </div>
            <div className="md-cell md-cell--3">
              <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                                     onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                                     value={this.state.clusterings.join(',')} controlStyle={groupStyle}/>
            </div>
            {regressionFragment}
            {classificationFragment}
            {outcomeRuleFragment}
            {thresholdFragment}
            <div className="md-cell md-cell--3">
              <legend className="md-subheading-1">Prefix length</legend>
              <div className="md-selection-control-container md-caption">How many events in a trace to consider.
                Raise number at your own caution because this too high a number will cause errors.</div>
              <TextField
                id="prefixLength"
                label="Prefix length"
                type="number"
                defaultValue={defaultPrefix}
                onChange={this.onPrefixChange.bind(this)}
                min={0}
                className="md-cell"
                required
              />
            </div>
            <div className="md-cell md-cell--12">
              {warning}
              <FetchState fetchState={this.props.fetchState}/>
              <Button raised primary swapTheming onClick={this.onSubmit.bind(this)}
                      disabled={this.state.displayWarning} className="buttons__group">Submit</Button>
              <Button raised secondary swapTheming onClick={this.onReset.bind(this)}
                      className="buttons__group">Reset</Button>
            </div>
          </div>

        </CardText>
      </Card>
    );
  }
}

TrainingFormCard.propTypes = {
  splitLabels: splitLabels,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired
};

export default TrainingFormCard;
