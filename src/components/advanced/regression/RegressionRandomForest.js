import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';

const defaults = {
  'n_estimators': 10,
  'max_depth': null,
  'max_features': null
};

/* eslint-disable no-invalid-this */
const RegressionRandomForest = (props) => {
  const methodConfig = `regression.randomForest`;

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
  const maxFeatures = <TextField
    key="max_features"
    id="max_features"
    label="max_features"
    defaultValue={defaults.max_features}
    onChange={props.onChange.bind(this, {methodConfig, key: 'max_features', maybeNumber: true})}
    className="md-cell md-cell--3"
    required
  />;

  return [nEstimators, maxDepth, maxFeatures];
};

RegressionRandomForest.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default RegressionRandomForest;
