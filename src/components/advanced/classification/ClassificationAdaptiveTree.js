import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import SelectField from 'react-md/lib/SelectFields';
import {leafPredictionHoeffding, splitCriterionHoeffding} from '../advancedConfig';
import {Checkbox} from 'react-md/lib';
import {ADAPTIVE_TREE, CLASSIFICATION} from '../../../reference';

const defaults = {
    'grace_period': 200,
    'split_criterion': 'info_gain',
    'split_confidence': .0000001,
    'tie_threshold': .05,
    'binary_split': false,
    'stop_mem_management': false,
    'remove_poor_atts': false,
    'no_preprune': false,
    'leaf_prediction': 'nba',
    'nb_threshold': 0
};

const ClassificationAdaptiveTree = (props) => {
    const methodConfig = `${CLASSIFICATION}.${ADAPTIVE_TREE}`;

    const gracePeriod = <TextField
        key="grace_period"
        id="grace_period"
        label="grace_period"
        type="number"
        defaultValue={defaults.grace_period}
        onChange={props.onChange.bind(this, {methodConfig, key: 'grace_period', isNumber: true})}
        min={0}
        className="md-cell md-cell--3"
    />;
    const splitCriterion = <SelectField
        key="split_criterion"
        id="split_criterion"
        label="split_criterion"
        className="md-cell md-cell--3"
        menuItems={splitCriterionHoeffding}
        defaultValue={defaults.split_criterion}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'split_criterion'})}
        required
    />;
    const splitConfidence = <TextField
        key="split_confidence"
        id="split_confidence"
        label="split_confidence"
        type="number"
        defaultValue={defaults.split_confidence}
        onChange={props.onChange.bind(this, {methodConfig, key: 'split_confidence', isNumber: true})}
        className="md-cell md-cell--3"
    />;
    const tieThreshold = <TextField
        key="tie_threshold"
        id="tie_threshold"
        label="tie_threshold"
        type="number"
        defaultValue={defaults.tie_threshold}
        onChange={props.onChange.bind(this, {methodConfig, key: 'tie_threshold', isNumber: true})}
        className="md-cell md-cell--3"
    />;
    const binarySplit = <Checkbox
        key="binary_split"
        id="binary_split"
        name="binary_split"
        label="binary_split"
        className="md-cell md-cell--3"
        defaultChecked={defaults.binary_split}
        onChange={props.onChange.bind(this, {methodConfig, key: 'binary_split'})}
    />;
    const stopMemManagement = <Checkbox
        key="stop_mem_management"
        id="stop_mem_management"
        name="stop_mem_management"
        label="stop_mem_management"
        className="md-cell md-cell--3"
        defaultChecked={defaults.stop_mem_management}
        onChange={props.onChange.bind(this, {methodConfig, key: 'stop_mem_management'})}
    />;
    const removePoorAtts = <Checkbox
        key="remove_poor_atts"
        id="remove_poor_atts"
        name="remove_poor_atts"
        label="remove_poor_atts"
        className="md-cell md-cell--3"
        defaultChecked={defaults.remove_poor_atts}
        onChange={props.onChange.bind(this, {methodConfig, key: 'remove_poor_atts'})}
    />;
    const noPreprune = <Checkbox
        key="no_preprune"
        id="no_preprune"
        name="no_preprune"
        label="no_preprune"
        className="md-cell md-cell--3"
        defaultChecked={defaults.no_preprune}
        onChange={props.onChange.bind(this, {methodConfig, key: 'no_preprune'})}
    />;
    const leafPrediction = <SelectField
        key="leaf_prediction"
        id="leaf_prediction"
        label="leaf_prediction"
        className="md-cell md-cell--3"
        menuItems={leafPredictionHoeffding}
        defaultValue={defaults.leaf_prediction}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'leaf_prediction'})}
        required
    />;
    const nbThreshold = <TextField
        key="nb_threshold"
        id="nb_threshold"
        label="nb_threshold"
        type="number"
        defaultValue={defaults.nb_threshold}
        onChange={props.onChange.bind(this, {methodConfig, key: 'nb_threshold', isNumber: true})}
        min={0}
        className="md-cell md-cell--3"
    />;

    return [
        gracePeriod,
        splitCriterion,
        splitConfidence,
        tieThreshold,
        binarySplit,
        stopMemManagement,
        removePoorAtts,
        noPreprune,
        leafPrediction,
        nbThreshold
    ];
};

ClassificationAdaptiveTree.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default ClassificationAdaptiveTree;
