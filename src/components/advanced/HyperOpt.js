import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';
import {
    classificationMetrics,
    hyperparameterOptimizerAlgorithms,
    hyperparameterOptmizerLabels,
    regressionMetrics,
    timeSeriesPredictionMetrics
} from './advancedConfig';
import SelectField from 'react-md/lib/SelectFields/index';

// Has to be changed in TrainingFormCard
const defaults = {
    type: false,
    max_evaluations: 10
};
/* eslint-disable no-invalid-this */
const HyperOpt = (props) => {
  const methodConfig = 'hyperparameter_optimizer';

  const helpText = <p key="gristel" className="md-cell md-cell--12">
    Hyperparameter optimization aims at identifying the optimal method configuration to achieve the best performance
      metric value. It aims at optimizing the value of all the reported hyperparameters. The maximum number of
      evaluation runs should be high enough to achieve good results.</p>;

  const hyperparameterOptmizer = <SelectField
    key="type"
    id="type"
    label="Hyperparameter Optmizer"
    className="md-cell md-cell--3"
    menuItems={hyperparameterOptmizerLabels}
    defaultValue={hyperparameterOptmizerLabels[0].value}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, {methodConfig, key: 'type'})}
    required
  />;

  const optimizerAlgorithm = <SelectField
    key="algorithm_type"
    id="algorithm_type"
    label="Optmizer Algorithm"
    className="md-cell md-cell--3"
    menuItems={hyperparameterOptimizerAlgorithms}
    defaultValue={hyperparameterOptimizerAlgorithms[0].value}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, {methodConfig, key: 'algorithm_type'})}
    required
  />;

  const maxEvals = <TextField
    key="max_evals"
    id="max_evals"
    label="Number of evaluation runs"
    type="number"
    defaultValue={defaults.max_evaluations}
    onChange={props.onChange.bind(this, {methodConfig, key: 'max_evaluations', isNumber: true})}
    min={1}
    className="md-cell md-cell--3"
    required
  />;

  // Terrible hack to force the metric to change when prediction method changes
  const makeMetric = (predictionMethod, onChange) => {
      let labels;
      if (predictionMethod === REGRESSION) {
          labels = regressionMetrics;
      } else if (predictionMethod === CLASSIFICATION) {
          labels = classificationMetrics;
      } else if (predictionMethod === TIME_SERIES_PREDICTION) {
          labels = timeSeriesPredictionMetrics;
      }
    return <SelectField
      key="performance_metric"
      id="performance_metric"
      label="Performance metric"
      className="md-cell md-cell--4"
      menuItems={labels}
      position={SelectField.Positions.BELOW}
      onChange={onChange.bind(this, {methodConfig, key: 'performance_metric'})}
      required
    />;
  };

  return [
      helpText,
      hyperparameterOptmizer,
      optimizerAlgorithm,
      maxEvals,
      makeMetric(props.predictionMethod, props.onChange)];
};

HyperOpt.propTypes = {
  onChange: PropTypes.func.isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION]).isRequired
};
export default HyperOpt;
