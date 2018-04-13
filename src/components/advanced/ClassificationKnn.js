import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from 'react-md/lib/index';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';
import {classificationKnnWeights} from '../../advancedConfig';

const defaults = {
  n_neighbors: 10,
  weights: 'uniform'
};

const ClassificationKnn = (props) => {
  const methodConfig = `${props.predictionMethod}.knn`;

  const weights = <SelectField
    key="weights"
    id="weights"
    label="KNN weights"
    className="md-cell md-cell--4"
    menuItems={classificationKnnWeights}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, methodConfig, 'weights')}
    defaultValue={defaults.weights}
  />;
  const nNeighbors = <TextField
    key="n_neighbors"
    id="n_neighbors"
    label="n_neighbors"
    type="number"
    defaultValue={defaults.n_neighbors}
    onChange={props.onChange.bind(this, methodConfig, 'n_neighbors')}
    min={0}
    className="md-cell md-cell--4"
    required
  />;

  return [weights, nNeighbors];
};

ClassificationKnn.propTypes = {
  onChange: PropTypes.func.isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired
};
export default ClassificationKnn;
