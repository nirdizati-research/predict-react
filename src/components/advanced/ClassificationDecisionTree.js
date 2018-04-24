import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';

const defaults = {
  'max_depth': null,
  'min_samples_split': 2,
  'min_samples_leaf': 1
};
/* eslint-disable no-invalid-this */
const ClassificationDecisionTree = (props) => {
  const methodConfig = `classification.decisionTree`;

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

  return [maxDepth, minSamplesSplit, minSamplesLeaf];
};

ClassificationDecisionTree.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default ClassificationDecisionTree;
