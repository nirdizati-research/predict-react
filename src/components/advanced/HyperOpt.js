import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md/lib/index';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';
import {classificationMetrics, regressionMetrics, timeSeriesPredictionMetrics} from './advancedConfig';
import SelectField from 'react-md/lib/SelectFields/index';

// Has to be changed in TrainingFormCard
const defaults = {
  use_hyperopt: false,
  max_evals: 10
};
/* eslint-disable no-invalid-this */
const HyperOpt = (props) => {
  const methodConfig = 'hyperopt';

  const helpText = <p key="gristel" className="md-cell md-cell--12">
    Hyper optimization tries to guess the optimal method configuration
    to achieve the best performance metric value. It tries to optimize all the method values visible here.
    Maximum evaluations should be high to achieve the best result.</p>;
  const useHyperopt = <Checkbox
    key="use_hyperopt"
    id="use_hyperopt"
    name="use_hyperopt"
    label="Enable Hyper optimization"
    className="md-cell md-cell--3"
    defaultChecked={defaults.use_hyperopt}
    onChange={props.onChange.bind(this, {methodConfig, key: 'use_hyperopt'})}
  />;
  const maxEvals = <TextField
    key="max_evals"
    id="max_evals"
    label="Number of evaluation runs"
    type="number"
    defaultValue={defaults.max_evals}
    onChange={props.onChange.bind(this, {methodConfig, key: 'max_evals', isNumber: true})}
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
      className="md-cell md-cell--3"
      menuItems={labels}
      position={SelectField.Positions.BELOW}
      onChange={onChange.bind(this, {methodConfig, key: 'performance_metric'})}
      required
    />;
  };

  return [helpText, useHyperopt, maxEvals, makeMetric(props.predictionMethod, props.onChange)];
};

HyperOpt.propTypes = {
  onChange: PropTypes.func.isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION]).isRequired
};
export default HyperOpt;
