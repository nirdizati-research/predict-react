import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md/lib/index';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';
import {
  classificationDecisionTreeCriterion, classificationDecisionTreeSplitter,
  regressionRFCriterion
} from './advancedConfig';

const defaults = {
  'fit_intercept': true,
  'normalize': false,
  'copy_X': true
};
const RegressionLinear = (props) => {
  const methodConfig = `regression.linear`;

  const fitIntercept = <Checkbox
    key="fit_intercept"
    id="fit_intercept"
    name="fit_intercept"
    label="fit_intercept"
    className="md-cell md-cell--3"
    defaultChecked={defaults.fit_intercept}
    onChange={props.onChange.bind(this, {methodConfig, key: 'fit_intercept'})}
  />;
  const normalize = <Checkbox
    key="normalize"
    id="normalize"
    name="normalize"
    label="normalize"
    className="md-cell md-cell--3"
    defaultChecked={defaults.normalize}
    onChange={props.onChange.bind(this, {methodConfig, key: 'normalize'})}
  />;
  const copyX = <Checkbox
    key="copy_X"
    id="copy_X"
    name="copy_X"
    label="copy_X"
    className="md-cell md-cell--3"
    defaultChecked={defaults.copy_X}
    onChange={props.onChange.bind(this, {methodConfig, key: 'copy_X'})}
  />;

  return [fitIntercept, normalize, copyX];
};

RegressionLinear.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default RegressionLinear;
