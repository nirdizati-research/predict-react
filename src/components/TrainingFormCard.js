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
  DURATION,
  encodingMethods,
  KMEANS,
  LABELLING,
  paddingControls,
  predictionMethods,
  prefixTypeControls,
  REGRESSION,
  regressionMethods,
  REMAINING_TIME,
  THRESHOLD_MEAN,
} from '../reference';
import CheckboxGroup from './training/CheckboxGroup';
import {fetchStatePropType, splitLabelPropType, traceAttributeShape} from '../propTypes';
import PrefixSelector from './training/PrefixSelector';
import AdvancedConfiguration from './advanced/AdvancedConfiguration';
import {classificationMetrics, regressionMetrics} from './advanced/advancedConfig';

const defaultPrefix = 1;
const groupStyle = {height: 'auto'};

const initialState = (props) => {
  const splitId = props.splitLabels[0] ? props.splitLabels[0].value : 0;
  const predictionMethod = props.isLabelForm ? LABELLING : REGRESSION;
  const labelType = props.isLabelForm ? DURATION : REMAINING_TIME;
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
    label: {
      type: labelType,
      attribute_name: '',
      threshold_type: THRESHOLD_MEAN,
      threshold: 0,
      add_remaining_time: false,
      add_elapsed_time: false,
      add_executed_events: false,
      add_resources_used: false,
      add_new_traces: false,
    },
    displayWarning: false,
    predictionMethod: predictionMethod,
    kmeans: {},
    hyperopt: {
      use_hyperopt: false,
      max_evals: 10,
      performance_metric: 'rmse'
    },
    create_models: false
  };
};

const initialAdvancedConfiguration = () => {
  return {
    [`${CLASSIFICATION}.knn`]: {},
    [`${CLASSIFICATION}.randomForest`]: {},
    [`${CLASSIFICATION}.decisionTree`]: {},
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
    this.props.onSplitChange(this.state.split_id);
  }

  componentDidUpdate(prevProps) {
    if (this.state.split_id === 0 && this.props.splitLabels.length > 0) {
      this.setState({split_id: this.props.splitLabels[0].value});
      this.props.onSplitChange(this.props.splitLabels[0].value);
    }
  }

  advanceConfigChange({methodConfig, key, isNumber, isFloat, maybeNumber}, value) {
    // Only the changed values are put in config. Otherwise merged with config in backend
    // classification.knn weights distance
    const config = this.state[methodConfig];
    if (isNumber) {
      // for some reason, value can be "". Don't know, dont care
      value = parseInt(value, 10);
    } else if (isFloat) {
      value = parseFloat(value);
    } else if (maybeNumber) {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        value = parsed;
      }
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
      case 'clusterings[]': {
        // reset kmeans
        const kmeans = value === KMEANS ? {} : this.state.kmeans;
        this.setState({kmeans, clusterings: this.addOrRemove(this.state.clusterings, value)});
        break;
      }
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
    const labelType = value === REGRESSION ? REMAINING_TIME : DURATION;
    this.setState({
      predictionMethod: value, label: {...this.state.label, type: labelType},
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
        this.props.onSubmit(this.getWithMethods(this.state.classification));
        break;
      case LABELLING:
        this.props.onSubmit(this.getLabellingPayload());
        break;
      // no default
    }
  }

  getLabellingPayload() {
    return {
      type: this.state.predictionMethod,
      split_id: this.state.split_id,
      config: {
        prefix: this.state.prefix,
        label: this.state.label,
      }
    };
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
        label: this.state.label,
        create_models: this.state.create_models,
        add_elapsed_time: this.state.add_elapsed_time,
        hyperopt: this.state.hyperopt,
        kmeans: this.state.kmeans,
        [`${CLASSIFICATION}.knn`]: this.state[`${CLASSIFICATION}.knn`],
        [`${CLASSIFICATION}.randomForest`]: this.state[`${CLASSIFICATION}.randomForest`],
        [`${CLASSIFICATION}.decisionTree`]: this.state[`${CLASSIFICATION}.decisionTree`],
        [`${REGRESSION}.randomForest`]: this.state[`${REGRESSION}.randomForest`],
        [`${REGRESSION}.lasso`]: this.state[`${REGRESSION}.lasso`],
        [`${REGRESSION}.linear`]: this.state[`${REGRESSION}.linear`]
      }
    };
  }

  onReset() {
    this.setState({...initialState(this.props), ...initialAdvancedConfiguration()});
  }

  render() {
    let warning = null;
    if (this.state.displayWarning) {
      warning = <p className="md-text md-text--error">Select at least one from every option</p>;
    }

    const predictionControls =
      <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                             value={this.state.predictionMethod} inline controls={predictionMethods}
                             onChange={this.onPredictionMethodChange.bind(this)}/>;
    const regressionFragment = this.state.predictionMethod === REGRESSION ?
      <CheckboxGroup controls={regressionMethods} id="regression" label="Regression methods"
                     onChange={this.checkboxChange.bind(this)}
                     value={this.state.regression.join(',')}/> : null;

    // TODO refactor as 1 component in React 16.0
    const classificationFragment =
      (this.state.predictionMethod === CLASSIFICATION) ?
        <CheckboxGroup controls={classificationMethods} id="classification" label="Classification methods"
                       onChange={this.checkboxChange.bind(this)}
                       value={this.state.classification.join(',')}/> : null;
    const createModels = !this.props.isLabelForm ?
      <Checkbox id="create_models" name="create_models"
                label="Create and save models for runtime prediction"
                checked={this.state.create_models} inline
                onChange={this.checkboxChange.bind(this)}/> : null;
    const clusteringFragment =
      <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                             onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                             value={this.state.clusterings.join(',')} controlStyle={groupStyle}/>;
    const encodingFragment = !this.props.isLabelForm ?
      <SelectionControlGroup type="checkbox" label="Encoding methods" name="encodings" className="md-cell md-cell--4"
                             id="encodings" onChange={this.checkboxChange.bind(this)} controls={encodingMethods}
                             value={this.state.encodings.join(',')} controlStyle={groupStyle}/> : null;

    const title = this.props.isLabelForm ? 'Labelling' : 'Training';

    const otherSelector = this.props.isLabelForm ? null : <div className="md-cell md-cell--4">
      {predictionControls}
      {regressionFragment}
      {classificationFragment}
      {clusteringFragment}
    </div>;
    return (
      <Card className="md-block-centered">
        <CardTitle title={title}>
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
            {otherSelector}
            {encodingFragment}
            <PrefixSelector prefix={this.state.prefix} onChange={this.advanceConfigChange.bind(this)}
                            maxEventsInLog={this.props.maxEventsInLog} isLabelForm={this.props.isLabelForm}/>
          </div>
        </CardText>
        <AdvancedConfiguration classification={this.state.classification} regression={this.state.regression}
                               onChange={this.advanceConfigChange.bind(this)} label={this.state.label}
                               traceAttributes={this.props.traceAttributes} clusterings={this.state.clusterings}
                               predictionMethod={this.state.predictionMethod}/>

        <CardText>
          <div className="md-grid md-grid--no-spacing">
            <div className="md-cell md-cell--12">
              {createModels}
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
  splitLabels: splitLabelPropType,
  fetchState: fetchStatePropType,
  onSubmit: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  maxEventsInLog: PropTypes.number.isRequired,
  isLabelForm: PropTypes.bool,
  traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};

export default TrainingFormCard;
