import PropTypes from 'prop-types';
import React from 'react';
import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  classLabelControls,
  DURATION,
  regLabelControls,
  REGRESSION,
  thresholdControls
} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';

/* eslint-disable no-invalid-this */
const methodConfig = 'label';
const LabelControls = (props) => {
  const controls = () => (props.predictionMethod === REGRESSION ? regLabelControls : classLabelControls);
  const labelType = <SelectField
    key="type"
    id="type"
    label="Label type"
    className="md-cell md-cell--4"
    menuItems={controls()}
    position={SelectField.Positions.BELOW}
    onChange={props.labelChange.bind(this, {methodConfig, key: 'type'})}
    value={props.label.type}
  />;

  const threshold = (label) => {
    if (props.predictionMethod === REGRESSION) {
      return [null, null];
    } else if ([ATTRIBUTE_NUMBER, DURATION].includes(label.type)) {
      const thresholdType = <SelectField
        key="threshold_type"
        id="threshold_type"
        label="Threshold type"
        className="md-cell md-cell--4"
        menuItems={thresholdControls}
        position={SelectField.Positions.BELOW}
        onChange={props.labelChange.bind(this, {methodConfig, key: 'threshold_type'})}
        value={props.label.threshold_type}
      />;

      const thresholdLabels = props.thresholds.map((a) => ({label: a, value: a}));
      const thresholdSelect = <SelectField
        key="threshold"
        id="threshold"
        label="Threshold"
        className="md-cell md-cell--4"
        menuItems={thresholdLabels}
        position={SelectField.Positions.BELOW}
        onChange={props.labelChange.bind(this, {methodConfig, key: 'threshold'})}
        value={props.label.threshold}
      />;
      return [thresholdType, thresholdSelect];
    } else {
      return [null, null];
    }
  };

  const atr = () => {
    if ([ATTRIBUTE_NUMBER, ATTRIBUTE_STRING].includes(props.label.type)) {
      const atrLabels = props.attributeNames.map((a) => ({label: a, value: a}));
      return <SelectField
        key="attribute_name"
        id="attribute_name"
        label="Attribute name"
        className="md-cell md-cell--4"
        menuItems={atrLabels}
        position={SelectField.Positions.BELOW}
        onChange={props.labelChange.bind(this, {methodConfig, key: 'attribute_name'})}
        value={props.label.attribute_name}
      />;
    } else {
      return null;
    }
  };

  return <div className="md-grid">
    {labelType}
    {threshold(props.label)[0]}
    {threshold(props.label)[1]}
    {atr()}
  </div>;
};

LabelControls.propTypes = {
  label: PropTypes.any.isRequired,
  attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelChange: PropTypes.func.isRequired,
  predictionMethod: PropTypes.string
};
export default LabelControls;
