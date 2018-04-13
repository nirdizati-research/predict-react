import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';
import {classificationDecisionTreeCriterion} from './advancedConfig';

const defaults = {
  'n_estimators': 10,
  'criterion': 'gini',
  'max_depth': null,
  'min_samples_split': 2,
  'min_samples_leaf': 1
};
/* eslint-disable no-invalid-this */
const ClassificationRandomForest = (props) => {
  const methodConfig = `${props.predictionMethod}.decisionTree`;

  const nEstimators = <TextField
    key="n_estimators"
    id="n_estimators"
    label="n_estimators"
    type="number"
    defaultValue={defaults.n_estimators}
    onChange={props.onChange.bind(this, {methodConfig, key: 'n_estimators', isNumber: true})}
    min={0}
    className="md-cell md-cell--4"
  />;

  const criterion = <SelectField
    key="criterion"
    id="criterion"
    label="criterion"
    className="md-cell md-cell--4"
    menuItems={classificationDecisionTreeCriterion}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, {methodConfig, key: 'criterion'})}
    defaultValue={defaults.criterion}
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
  const minSamplesSplit = <TextField
    key="min_samples_split"
    id="min_samples_split"
    label="min_samples_split"
    type="number"
    defaultValue={defaults.min_samples_split}
    onChange={props.onChange.bind(this, {methodConfig, key: 'min_samples_split', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
    required
  />;
  const minSamplesLeaf = <TextField
    key="min_samples_leaf"
    id="min_samples_leaf"
    label="min_samples_leaf"
    type="number"
    defaultValue={defaults.min_samples_leaf}
    onChange={props.onChange.bind(this, {methodConfig, key: 'min_samples_leaf', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
    required
  />;

  return [nEstimators, criterion, maxDepth, minSamplesSplit, minSamplesLeaf];
};

ClassificationRandomForest.propTypes = {
  onChange: PropTypes.func.isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired
};
export default ClassificationRandomForest;
