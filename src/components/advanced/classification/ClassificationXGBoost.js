import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md';
import {CLASSIFICATION, XGBOOST} from '../../../reference';

const defaults = {
    'max_depth': 3,
    'learning_rate': 0.1,
    'n_estimators': 100
};
/* eslint-disable no-invalid-this */
const ClassificationXGBoost = (props) => {
    const methodConfig = `${CLASSIFICATION}.${XGBOOST}`;

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
    const learningRate = <TextField
        key="learning_rate"
        id="learning_rate"
        label="learning rate"
        type="number"
        defaultValue={defaults.learning_rate}
        onChange={props.onChange.bind(this, {methodConfig, key: 'learning_rate', isFloat: true})}
        min={0}
        className="md-cell md-cell--3"
    />;

    return [nEstimators, maxDepth, learningRate];
};

ClassificationXGBoost.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default ClassificationXGBoost;
