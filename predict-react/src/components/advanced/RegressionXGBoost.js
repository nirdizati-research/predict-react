import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md';

const defaults = {
  'n_estimators': 100,
  'max_depth': 3
};
/* eslint-disable no-invalid-this */
const RegressionXGBoost = (props) => {
  const methodConfig = `regression.xgboost`;

  const nEstimators = <TextField
    key="n_estimators"
    id="n_estimators"
    label="n_estimators"
    type="number"
    defaultValue={defaults.n_estimators}
    onChange={props.onChange.bind(this, {methodConfig, key: 'n_estimators', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
  />;
  const maxDepth = <TextField
    key="max_depth"
    id="max_depth"
    label="max_depth"
    type="number"
    defaultValue={defaults.max_depth}
    onChange={props.onChange.bind(this, {methodConfig, key: 'max_depth', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
  />;

  return [nEstimators, maxDepth];
};

RegressionXGBoost.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default RegressionXGBoost;
