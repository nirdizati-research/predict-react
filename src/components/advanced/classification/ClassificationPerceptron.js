import React from 'react';
import PropTypes from 'prop-types';
import {CLASSIFICATION, REGRESSION} from '../../../reference';
import SelectField from 'react-md/lib/SelectFields';
import {penaltyPerceptron} from '../advancedConfig';
import TextField from 'react-md/lib/TextFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

const defaults = {
    'penalty': null,
    'alpha': 0.0001,
    'fit_intercept': true,
    'max_iter': null,
    'tol': 1e-3,
    'shuffle': true,
    'eta0': 1,
    'early_stopping': false,
    'validation_fraction': 0.1,
    'n_iter_no_change': 5
};

const ClassificationPerceptronClassifier = (props) => {
    const methodConfig = `${CLASSIFICATION}.${REGRESSION}`;

    const penalty = <SelectField
        key="penalty"
        id="penalty"
        label="penalty"
        className="md-cell md-cell--3"
        menuItems={penaltyPerceptron}
        defaultValue={defaults.penalty}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'penalty'})}
        required
    />;
    const alpha = <TextField
        key="alpha"
        id="alpha"
        label="alpha"
        type="number"
        defaultValue={defaults.alpha}
        onChange={props.onChange.bind(this, {methodConfig, key: 'alpha', isNumber: true})}
        min={0}
        className="md-cell md-cell--3"
    />;
    const fitIntercept = <Checkbox
        key="fit_intercept"
        id="fit_intercept"
        name="fit_intercept"
        label="fit_intercept"
        className="md-cell md-cell--3"
        defaultChecked={defaults.fit_intercept}
        onChange={props.onChange.bind(this, {methodConfig, key: 'fit_intercept'})}
    />;
    const maxIter = <TextField
        key="max_iter"
        id="max_iter"
        label="max_iter"
        type="number"
        defaultValue={defaults.max_iter}
        onChange={props.onChange.bind(this, {methodConfig, key: 'max_iter', isNumber: true})}
        min={1}
        className="md-cell md-cell--3"
        required
    />;
    const tol = <TextField
        key="tol"
        id="tol"
        label="tol"
        type="number"
        defaultValue={defaults.tol}
        onChange={props.onChange.bind(this, {methodConfig, key: 'tol', isNumber: true})}
        min={1e-4}
        className="md-cell md-cell--3"
    />;
    const shuffle = <Checkbox
        key="shuffle"
        id="shuffle"
        name="shuffle"
        label="shuffle"
        className="md-cell md-cell--3"
        defaultChecked={defaults.shuffle}
        onChange={props.onChange.bind(this, {methodConfig, key: 'shuffle'})}
    />;
    const eta0 = <TextField
        key="eta0"
        id="eta0"
        label="eta0"
        type="number"
        defaultValue={defaults.eta0}
        onChange={props.onChange.bind(this, {methodConfig, key: 'eta0', isNumber: true})}
        min={1}
        className="md-cell md-cell--3"
    />;
    const earlyStopping = <Checkbox
        key="early_stopping"
        id="early_stopping"
        name="early_stopping"
        label="early_stopping"
        className="md-cell md-cell--3"
        defaultChecked={defaults.early_stopping}
        onChange={props.onChange.bind(this, {methodConfig, key: 'early_stopping'})}
    />;
    const validationFraction = <TextField
        key="validation_fraction"
        id="validation_fraction"
        label="validation_fraction"
        type="number"
        defaultValue={defaults.validation_fraction}
        onChange={props.onChange.bind(this, {methodConfig, key: 'validation_fraction', isNumber: true})}
        min={0.01}
        className="md-cell md-cell--3"
    />;
    const nIterNoChange = <TextField
        key="n_iter_no_change"
        id="n_iter_no_change"
        label="n_iter_no_change"
        type="number"
        defaultValue={defaults.n_iter_no_change}
        onChange={props.onChange.bind(this, {methodConfig, key: 'n_iter_no_change', isNumber: true})}
        min={1}
        className="md-cell md-cell--3"
    />;

    return [
        penalty,
        alpha,
        fitIntercept,
        maxIter,
        tol,
        shuffle,
        eta0,
        earlyStopping,
        validationFraction,
        nIterNoChange
    ];
};

ClassificationPerceptronClassifier.protoTypes = {
    onChange: PropTypes.func.isRequired
};

export default ClassificationPerceptronClassifier;
