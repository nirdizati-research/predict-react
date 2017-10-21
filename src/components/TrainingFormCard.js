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
  encodingMethods, NEXT_ACTIVITY,
  outcomeRuleControls,
  predictionMethods, REGRESSION,
  regressionMethods,
  thresholdControls
} from '../reference';
import OutcomeRules from './training/OutcomeRules';
import Threshold from './training/Threshold';
import CheckboxGroup from './training/CheckboxGroup';

const defaultPrefix = 0;
const defaultThreshold = 0;
const groupStyle = {height: 'auto'};

const initialState = (props) => {
  return {
    logName: props.logNames[0],
    encoding: [encodingMethods[0].value],
    clustering: [clusteringMethods[0].value],
    classification: [classificationMethods[0].value],
    regression: [regressionMethods[0].value],
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
      case 'encoding[]':
        this.setState({encoding: this.addOrRemove(this.state.encoding, value)});
        break;
      case 'clustering[]':
        this.setState({clustering: this.addOrRemove(this.state.clustering, value)});
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

  selectChange(value) {
    this.setState({logName: value});
  }

  onThresholdChange(threshold) {
    this.setState({threshold});
  }

  displayWarningCheck(prevState) {
    switch (prevState.predictionMethod) {
      case REGRESSION:
        return !(prevState.encoding.length !== 0
          && prevState.clustering.length !== 0
          && prevState.regression.length !== 0);
      case CLASSIFICATION:
        return !(prevState.encoding.length !== 0
          && prevState.clustering.length !== 0
          && prevState.classification.length !== 0);
      case NEXT_ACTIVITY:
        return !(prevState.encoding.length !== 0
          && prevState.clustering.length !== 0
          && prevState.classification.length !== 0);
      // no default
    }
  }

  // On submit
  onSubmit() {
    switch (this.state.predictionMethod) {
      case REGRESSION:
        this.props.onSubmit(this.getRegressionPayload());
        break;
      case CLASSIFICATION:
        this.props.onSubmit(this.getClassificationPayload());
        break;
      case NEXT_ACTIVITY:
        this.props.onSubmit(this.getNextActivityPayload());
        break;
      // no default
    }
  }

  getPayload() {
    // TODO type should be predictionMethod
    return {
      type: this.state.predictionMethod,
      log: this.state.logName,
      prefix: defaultPrefix,
      encoding: this.state.encoding,
      clustering: this.state.clustering
    };
  }

  getRegressionPayload() {
    return {
      ...this.getPayload(),
      regression: this.state.regression,
    };
  }

  getClassificationPayload() {
    let actualThreshold;
    if (this.state.threshold.value === thresholdControls[0].value) {
      actualThreshold = this.state.threshold.value;
    } else {
      actualThreshold = this.state.threshold.threshold;
    }
    return {
      ...this.getPayload(),
      classification: this.state.classification,
      rule: this.state.rule,
      threshold: actualThreshold
    };
  }

  getNextActivityPayload() {
    return {
      ...this.getPayload(),
      classification: this.state.classification,
    };
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
            placeholder="log.xes"
            className="md-cell"
            menuItems={this.props.logNames}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.state.logName}
          /></CardTitle>
        <CardText>
          <div className="md-grid md-grid--no-spacing">
            <div className="md-cell md-cell--12">
              <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                                     value={this.state.predictionMethod} inline controls={predictionMethods}
                                     onChange={this.onPredictionMethodChange.bind(this)}/>
            </div>
            <div className="md-cell">
              <SelectionControlGroup type="checkbox" label="Encoding methods" name="encoding" id="encoding"
                                     onChange={this.checkboxChange.bind(this)} controls={encodingMethods}
                                     value={this.state.encoding.join(',')} controlStyle={groupStyle}/>
            </div>
            <div className="md-cell">
              <SelectionControlGroup type="checkbox" label="Clustering methods" name="clustering" id="clustering"
                                     onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                                     value={this.state.clustering.join(',')} controlStyle={groupStyle}/>
            </div>
            {regressionFragment}
            {classificationFragment}
            {outcomeRuleFragment}
            {thresholdFragment}
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
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TrainingFormCard;
