import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import SelectField from 'react-md/lib/SelectFields/index';
import {classificationKnnWeights} from '../advancedConfig';
import {CLASSIFICATION, KNN} from '../../../reference';

const defaults = {
  n_neighbors: 10,
  weights: 'uniform'
};
/* eslint-disable no-invalid-this */
const ClassificationKnn = (props) => {
  const methodConfig = `${CLASSIFICATION}.${KNN}`;

  const weights = <SelectField
    key="weights"
    id="weights"
    label="KNN weights"
    className="md-cell md-cell--3"
    menuItems={classificationKnnWeights}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, {methodConfig, key: 'weights'})}
    defaultValue={defaults.weights}
  />;
  const nNeighbors = <TextField
    key="n_neighbors"
    id="n_neighbors"
    label="n_neighbors"
    type="number"
    defaultValue={defaults.n_neighbors}
    onChange={props.onChange.bind(this, {methodConfig, key: 'n_neighbors', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
    required
  />;

  return [weights, nNeighbors];
};

ClassificationKnn.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default ClassificationKnn;
