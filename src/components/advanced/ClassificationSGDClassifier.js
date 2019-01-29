import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {Checkbox} from 'react-md/lib';
import {CLASSIFICATION, SGDCLASSIFIER} from '../../reference';
import SelectField from 'react-md/lib/SelectFields';
import {learningRateSGDClassifier, lossSGDClassifier, penaltySGDClassifier} from './advancedConfig';


const defaults = {
    'loss': 'hinge',
    'penalty': 'l2',
    'alpha': 0.0001,
    'l1_ratio': 0.15,
    'fit_intercept': true,
    'max_iter': 5,
    'tol': 1e-3,
    'eta0': 0.0,
    'power_t': 0.5,
    'early_stopping': false,
    'n_iter_no_change': 5,
    'validation_fraction': 0.1,
    'average': true,
};

const ClassificationSGDClassifier = (props) => {
    const methodConfig = `${CLASSIFICATION}.${SGDCLASSIFIER}`;

    const loss = <SelectField
        key="loss"
        id="loss"
        label="loss"
        className="md-cell md-cell--3"
        menuItems={lossSGDClassifier}
        defaultValue={defaults.loss}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'loss'})}
        required
    />;
    const penalty = <SelectField
        key="penalty"
        id="penalty"
        label="penalty"
        className="md-cell md-cell--3"
        menuItems={penaltySGDClassifier}
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
    const l1Ratio = <TextField
        key="l1_ratio"
        id="l1_ratio"
        label="l1_ratio"
        type="number"
        defaultValue={defaults.l1_ratio}
        onChange={props.onChange.bind(this, {methodConfig, key: 'l1_ratio', isNumber: true})}
        min={0.00000001}
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
    const epsion = <TextField
        key="epsion"
        id="epsion"
        label="epsion"
        type="number"
        defaultValue={defaults.epsion}
        onChange={props.onChange.bind(this, {methodConfig, key: 'epsion', isNumber: true})}
        min={1e-4}
        className="md-cell md-cell--3"
    />;
    const learningRate = <SelectField
        key="learning_rate"
        id="learning_rate"
        label="learning_rate"
        className="md-cell md-cell--3"
        menuItems={learningRateSGDClassifier}
        defaultValue={defaults.learning_rate}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'learning_rate'})}
        required
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
    const powerT = <TextField
        key="power_t"
        id="power_t"
        label="power_t"
        type="number"
        defaultValue={defaults.power_t}
        onChange={props.onChange.bind(this, {methodConfig, key: 'power_t', isNumber: true})}
        min={0.01}
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
    const average = <Checkbox
        key="average"
        id="average"
        name="average"
        label="average"
        className="md-cell md-cell--3"
        defaultChecked={defaults.average}
        onChange={props.onChange.bind(this, {methodConfig, key: 'average'})}
    />;

    return [
        loss,
        penalty,
        alpha,
        l1Ratio,
        fitIntercept,
        maxIter,
        tol,
        epsion,
        learningRate,
        eta0,
        powerT,
        earlyStopping,
        nIterNoChange,
        validationFraction,
        average
    ];
};

ClassificationSGDClassifier.protoTypes = {
    onChange: PropTypes.func.isRequired
};
export default ClassificationSGDClassifier;
