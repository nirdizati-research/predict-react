import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md/lib/index';
import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  CLASSIFICATION,
  classLabelControls,
  controlCreator,
  LABELLING,
  regLabelControls,
  REGRESSION,
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
  const helpText = <div key='key' className="md-cell md-cell--12"><p>
    Classification supports all 4 labelling types. For regression, the supported types are remaining time and number
    attribute.
  </p><p>
    When using remaining time, the threshold is an integer in seconds. If the remaining time is below this threshold it
    is classified as <code>True</code> or Fast. Times above the threshold are classified as <code>False</code> or Slow.
  </p><p>
    Number attributes below the threshold are set as <code>True</code>.
  </p><p>
    It is not recommended to use String base label testing on a value that has too many classes, like a registration
    date. This will reduce the performance of front-end rendering due to the payload size.</p>
  </div>;

  const controls = () => (props.predictionMethod === REGRESSION ? regLabelControls : classLabelControls);

  const type = <SelectField
    key="type"
    id="type"
    label="Label type"
    className="md-cell md-cell--3"
    menuItems={controls()}
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
    if (props.predictionMethod === REGRESSION) {
      return [];
    } else if (label.type === REMAINING_TIME || label.type === ATTRIBUTE_NUMBER) {
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
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};
export default Labelling;
