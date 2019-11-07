import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {kmeansAlgorithm} from './advancedConfig';
import SelectField from 'react-md/lib/SelectFields/index';

// Has to be changed in TrainingFormCard
const defaults = {
    n_clusters: 3,
    max_iter: 300,
    algorithm: 'auto'
};
/* eslint-disable no-invalid-this */
const KMeans = (props) => {
    const methodConfig = 'kmeans';

    const nClusters = <TextField
        key="n_clusters"
        id="n_clusters"
        name="n_clusters"
        label="Number of clusters"
        className="md-cell md-cell--3"
        min={1}
        defaultValue={defaults.n_clusters}
        required
        onChange={props.onChange.bind(this, {methodConfig, key: 'n_clusters', isNumber: true})}
    />;

    const maxIter = <TextField
        key="max_iter"
        id="max_iter"
        label="Maximum number of iterations"
        type="number"
        defaultValue={defaults.max_iter}
        onChange={props.onChange.bind(this, {methodConfig, key: 'max_iter', isNumber: true})}
        min={1}
        className="md-cell md-cell--3"
        required
    />;

    const algorithm = <SelectField
        key="performance_metric"
        id="performance_metric"
        label="Algorithm"
        className="md-cell md-cell--3"
        menuItems={kmeansAlgorithm}
        defaultValue={defaults.algorithm}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'algorithm'})}
        required
    />;

    return [nClusters, maxIter, algorithm];
};

KMeans.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default KMeans;
