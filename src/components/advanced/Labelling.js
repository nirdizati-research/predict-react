import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md/lib/index';
import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  controlCreator,
  labelTypeControls,
  REMAINING_TIME,
  thresholdControls
} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';
import {labelPropType, traceAttributeShape} from '../../helpers';

const traceAttributeToLabel = (traceAttr) => {
  return {label: traceAttr.name, value: traceAttr.name, message: `First trace value: ${traceAttr.example}`};
};

const methodConfig = 'label';
/* eslint-disable no-invalid-this */
/* eslint-disable react/prop-types */
const Labelling = (props) => {
  const helpText = <p key='key' className="md-cell md-cell--12">
    Classification supports all 4 labelling types. For Regression, the supoorted types are remaining time and number
    attribute.</p>;

  const type = <SelectField
    key="type"
    id="type"
    label="Label type"
    className="md-cell md-cell--3"
    menuItems={labelTypeControls}
    position={SelectField.Positions.BELOW}
    onChange={props.onChange.bind(this, {methodConfig, key: 'type'})}
    value={props.label.type}
  />;

  const addRemainingTime = <Checkbox
    key="add_remaining_time"
    id="add_remaining_time"
    name="add_remaining_time"
    label="Add remaining time"
    className="md-cell md-cell--3"
    checked={props.label.add_remaining_time}
    onChange={props.onChange.bind(this, {methodConfig, key: 'add_remaining_time'})}
  />;

  const addElapsedTime = <Checkbox
    key="add_elapsed_time"
    id="add_elapsed_time"
    name="add_elapsed_time"
    label="Add elapsed time"
    className="md-cell md-cell--3"
    checked={props.label.add_elapsed_time}
    onChange={props.onChange.bind(this, {methodConfig, key: 'add_elapsed_time'})}/>;

  const threshold = (label) => {
    if (label.type === REMAINING_TIME || label.type === ATTRIBUTE_NUMBER) {
      const thresholdType = <SelectField
        key="threshold_type"
        id="threshold_type"
        label="Threshold type"
        className="md-cell md-cell--3"
        menuItems={thresholdControls}
        position={SelectField.Positions.BELOW}
        onChange={props.onChange.bind(this, {methodConfig, key: 'threshold_type'})}
        value={label.threshold_type}
      />;

      const threshold = <TextField
        key="threshold"
        id="threshold"
        label="Threshold"
        type="number"
        value={label.threshold}
        onChange={props.onChange.bind(this, {methodConfig, key: 'threshold', isNumber: true})}
        min={0}
        className="md-cell md-cell--3"
      />;

      return [thresholdType, threshold];
    } else {
      return [];
    }
  };

  const attributeSelector = ({label, traceAttributes, onChange}) => {
    let filteredAttributes = [];
    if (label.type === ATTRIBUTE_NUMBER) {
      filteredAttributes = traceAttributes.filter((t) => t.type === 'number');
    } else if (label.type === ATTRIBUTE_STRING) {
      filteredAttributes = traceAttributes.filter((t) => t.type === 'string');
    } else {
      return null;
    }
    const traceLabels = controlCreator(filteredAttributes.map(traceAttributeToLabel));
    return <SelectField
      key="attribute_name"
      id="attribute_name"
      label="Attribute name"
      className="md-cell md-cell--3"
      menuItems={traceLabels}
      position={SelectField.Positions.BELOW}
      onChange={onChange.bind(this, {methodConfig, key: 'attribute_name'})}
      value={label.attribute_name}
    />;
  };

  return [helpText, type, attributeSelector(props), addRemainingTime, addElapsedTime, ...threshold(props.label)];
};

Labelling.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.shape(labelPropType).isRequired,
  traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};
export default Labelling;
