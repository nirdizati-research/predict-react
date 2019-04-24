import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md';
import SelectField from 'react-md/lib/SelectFields';

// TODO: check where to put this
const rnnTypes = [
    {
        value: 'lstm',
        label: 'LSTM',
    },
    {
        value: 'gru',
        label: 'GRU',
    }
];

const defaults = {
    'n_units': 16,
    'rnn_type': 'lstm',
    'n_epochs': 10,
};

/* eslint-disable no-invalid-this */
const TimeSeriesPredictionRNN = (props) => {
    const methodConfig = `timeSeriesPrediction.rnn`;

    // TODO: which parameters to put?
    const nUnits = <TextField
        key="n_units"
        id="n_units"
        label="RNN cells"
        type="number"
        defaultValue={defaults.n_units}
        onChange={props.onChange.bind(this, {methodConfig, key: 'n_units', isNumber: true})}
        min={8}
        className="md-cell md-cell--3"
        required
    />;

    const rnnType = <SelectField
        key="rnn_type"
        id="rnn_type"
        label="RNN type"
        defaultValue={defaults.rnn_type}
        menuItems={rnnTypes}
        onChange={props.onChange.bind(this, {methodConfig, key: 'rnn_type', isNumber: false})}
        className="md-cell md-cell--3"
    />;

    const nEpochs = <TextField
        key="n_epochs"
        id="n_epochs"
        label="Epochs"
        type="number"
        defaultValue={defaults.n_epochs}
        onChange={props.onChange.bind(this, {methodConfig, key: 'n_epochs', isNumber: true})}
        min={1}
        className="md-cell md-cell--3"
        required
    />;

    return [nUnits, rnnType, nEpochs];
};

TimeSeriesPredictionRNN.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default TimeSeriesPredictionRNN;
