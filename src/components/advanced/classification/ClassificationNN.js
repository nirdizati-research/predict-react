import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md';
import SelectField from 'react-md/lib/SelectFields';

// TODO: check where to put this
const activations = [
  {
    value: 'sigmoid',
    label: 'Sigmoid',
  },
  {
    value: 'tanh',
    label: 'Tanh',
  },
  {
    value: 'relu',
    label: 'ReLU',
  }
];

const defaults = {
  'n_hidden_layers': 1,
  'n_hidden_units': 10,
  'activation': 'sigmoid',
  'n_epochs': 10,
  'dropout_rate': 0.0
};

/* eslint-disable no-invalid-this */
const ClassificationNN = (props) => {
  const methodConfig = `classification.nn`;

  // TODO: which parameters to put?
  const nHiddenLayers = <TextField
    key="n_hidden_layers"
    id="n_hidden_layers"
    label="Hidden layers"
    type="number"
    defaultValue={defaults.n_hidden_layers}
    onChange={props.onChange.bind(this, {methodConfig, key: 'n_hidden_layers', isNumber: true})}
    min={0}
    className="md-cell md-cell--3"
    required
  />;

  const nHiddenUnits = <TextField
      key="n_hidden_units"
      id="n_hidden_units"
      label="Hidden units"
      type="number"
      defaultValue={defaults.n_hidden_units}
      onChange={props.onChange.bind(this, {methodConfig, key: 'Hidden units', isNumber: true})}
      min={1}
      className="md-cell md-cell--3"
      required
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

  const activationType = <SelectField
      key="activation"
      id="activation"
      label="Activation function"
      defaultValue={defaults.activation}
      menuItems={activations}
      onChange={props.onChange.bind(this, {methodConfig, key: 'activation', isNumber: false})}
      className="md-cell md-cell--3"
  />;

  const dropoutRate = <TextField
      key="dropout_rate"
      id="dropout_rate"
      label="Dropout rate"
      type="number"
      step="0.1"
      defaultValue={defaults.dropout_rate}
      onChange={props.onChange.bind(this, {methodConfig, key: 'dropout_rate', isFloat: true})}
      min={0}
      max={1}
      className="md-cell md-cell--3"
      required
  />;

  return [nHiddenLayers, nHiddenUnits, activationType, nEpochs, dropoutRate];
};

ClassificationNN.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default ClassificationNN;
