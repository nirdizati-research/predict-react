import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md/lib/index';

const defaults = {
  'alpha': 1.0,
  'fit_intercept': true,
  'normalize': false,
  'copy_X': true
};
/* eslint-disable no-invalid-this */
const RegressionLasso = (props) => {
  const methodConfig = `regression.lasso`;

  const alpha = <TextField
    key="alpha"
    id="alpha"
    label="alpha"
    type="number"
    defaultValue={defaults.alpha}
    onChange={props.onChange.bind(this, {methodConfig, key: 'alpha', isFloat: true})}
    min={0}
    className="md-cell md-cell--3"
  />;
  const fitIntercept = <Checkbox
    key="fit_intercept"
    id={`${methodConfig}.fit_intercept`}
    name="fit_intercept"
    label="fit_intercept"
    className="md-cell md-cell--3"
    defaultChecked={defaults.fit_intercept}
    onChange={props.onChange.bind(this, {methodConfig, key: 'fit_intercept'})}
  />;
  const normalize = <Checkbox
    key={`${methodConfig}.normalize`}
    id={`${methodConfig}.normalize`}
    name="normalize"
    label="normalize"
    className="md-cell md-cell--3"
    defaultChecked={defaults.normalize}
    onChange={props.onChange.bind(this, {methodConfig, key: 'normalize'})}
  />;
  const copyX = <Checkbox
    key="copy_X"
    id={`${methodConfig}.copy_X`}
    name="copy_X"
    label="copy_X"
    className="md-cell md-cell--3"
    defaultChecked={defaults.copy_X}
    onChange={props.onChange.bind(this, {methodConfig, key: 'copy_X'})}
  />;

  return [alpha, fitIntercept, normalize, copyX];
};

RegressionLasso.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default RegressionLasso;
