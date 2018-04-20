/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import {Checkbox, SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import FetchState from './FetchState';
import {
  CLASSIFICATION,
  classificationMethods,
  clusteringMethods,
  encodingMethods,
  NEXT_ACTIVITY,
  outcomeRuleControls,
  paddingControls,
  predictionMethods,
  prefixTypeControls,
  REGRESSION,
  regressionMethods,
  thresholdControls
} from '../reference';
import OutcomeRules from './training/OutcomeRules';
import Threshold from './training/Threshold';
import CheckboxGroup from './training/CheckboxGroup';
import {splitLabels} from '../helpers';
import PrefixSelector from './training/PrefixSelector';
import AdvancedConfiguration from './advanced/AdvancedConfiguration';
import {classificationMetrics, regressionMetrics} from './advanced/advancedConfig';

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
    prefix: {
      padding: paddingControls[0].value,
      type: prefixTypeControls[0].value,
      prefix_length: defaultPrefix,
    },
    displayWarning: false,
    predictionMethod: REGRESSION,
    rule: outcomeRuleControls[0].value,
    threshold: {
      value: thresholdControls[0].value,
      threshold: defaultThreshold
    },
    hyperopt: {
      use_hyperopt: false,
      max_evals: 10,
      performance_metric: 'mse'
    },
    create_models: false,
    add_elapsed_time: true
  };
};

const initialAdvancedConfiguration = () => {
  return {
    [`${CLASSIFICATION}.knn`]: {},
    [`${CLASSIFICATION}.randomForest`]: {},
    [`${CLASSIFICATION}.decisionTree`]: {},
    [`${NEXT_ACTIVITY}.knn`]: {},
    [`${NEXT_ACTIVITY}.randomForest`]: {},
    [`${NEXT_ACTIVITY}.decisionTree`]: {},
    [`${REGRESSION}.randomForest`]: {},
    [`${REGRESSION}.lasso`]: {},
    [`${REGRESSION}.linear`]: {}
  };
};

class TrainingFormCard extends Component {
  constructor(props) {
    super(props);

    // TODO group to {} by prediction method
    this.state = {...initialState(this.props), ...initialAdvancedConfiguration()};
  }

  advanceConfigChange({methodConfig, key, isNumber, isFloat}, value) {
    // Only the changed values are put in config. Otherwise merged with config in backend
    // classification.knn weights distance
    const config = this.state[methodConfig];
    if (isNumber) {
      // for some reason, value can be "". Don't know, dont care
      value = parseInt(value, 10);
    } else if (isFloat) {
      value = parseFloat(value);
    }
    config[key] = value;
    this.setState({[methodConfig]: config});
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
      case 'create_models':
        this.setState({create_models: event.target.checked});
        break;
      case 'add_elapsed_time':
        this.setState({add_elapsed_time: event.target.checked});
        break;
      // no default
    }

    this.setState((prevState, _) => {
      return {displayWarning: this.displayWarningCheck(prevState)};
    });
  }

  onPredictionMethodChange(value) {
    // Following is a terrible hack for an uncontrolled component
    /* eslint-disable camelcase */
    const performance_metric = value === REGRESSION ? regressionMetrics[0].value : classificationMetrics[0].value;
    this.setState({
      predictionMethod: value,
      hyperopt: {...this.state.hyperopt, performance_metric}, ...initialAdvancedConfiguration()
    });
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

  onPrefixChange(prefix) {
    this.setState({prefix: prefix});
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
        prefix: this.state.prefix,
        encodings: this.state.encodings,
        clusterings: this.state.clusterings,
        methods: methods,
        create_models: this.state.create_models,
        add_elapsed_time: this.state.add_elapsed_time,
        hyperopt: this.state.hyperopt,
        [`${CLASSIFICATION}.knn`]: this.state[`${CLASSIFICATION}.knn`],
        [`${CLASSIFICATION}.randomForest`]: this.state[`${CLASSIFICATION}.randomForest`],
        [`${CLASSIFICATION}.decisionTree`]: this.state[`${CLASSIFICATION}.decisionTree`],
        [`${NEXT_ACTIVITY}.knn`]: this.state[`${NEXT_ACTIVITY}.knn`],
        [`${NEXT_ACTIVITY}.randomForest`]: this.state[`${NEXT_ACTIVITY}.randomForest`],
        [`${NEXT_ACTIVITY}.decisionTree`]: this.state[`${NEXT_ACTIVITY}.decisionTree`],
        [`${REGRESSION}.randomForest`]: this.state[`${REGRESSION}.randomForest`],
        [`${REGRESSION}.lasso`]: this.state[`${REGRESSION}.lasso`],
        [`${REGRESSION}.linear`]: this.state[`${REGRESSION}.linear`]
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
    this.setState({...initialState(this.props), ...initialAdvancedConfiguration()});
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
            <PrefixSelector prefix={this.state.prefix} onChange={this.onPrefixChange.bind(this)}
                            maxEventsInLog={this.props.maxEventsInLog}/>
            <div className="md-cell md-cell--3">
              <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                                     onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                                     value={this.state.clusterings.join(',')} controlStyle={groupStyle}/>
            </div>
            {regressionFragment}
            {classificationFragment}
            {outcomeRuleFragment}
            {thresholdFragment}
          </div>
        </CardText>
        <AdvancedConfiguration classification={this.state.classification} regression={this.state.regression}
                               onChange={this.advanceConfigChange.bind(this)}
                               predictionMethod={this.state.predictionMethod}/>

        <CardText>
          <div className="md-grid md-grid--no-spacing">
            <div className="md-cell md-cell--12">
              <Checkbox id="create_models" name="create_models"
                        label="Create and save models for runtime prediction"
                        checked={this.state.create_models} inline
                        onChange={this.checkboxChange.bind(this)}/>
              <Checkbox id="add_elapsed_time" name="add_elapsed_time"
                        label="Add elapsed time to encoded log" inline
                        checked={this.state.add_elapsed_time}
                        onChange={this.checkboxChange.bind(this)}/>
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
  onSplitChange: PropTypes.func.isRequired,
  maxEventsInLog: PropTypes.number.isRequired
};

export default TrainingFormCard;
