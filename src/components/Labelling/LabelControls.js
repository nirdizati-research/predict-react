import PropTypes from 'prop-types';
import React from 'react';
import {ATTRIBUTE_NUMBER, ATTRIBUTE_STRING, classLabelControls, DURATION, thresholdControls} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';

const methodConfig = 'label';
const LabelControls = (props) => {
  const labelType = <SelectField
    key="type"
    id="type"
    label="Label type"
    className="md-cell md-cell--6"
    menuItems={classLabelControls}
    position={SelectField.Positions.BELOW}
    onChange={props.labelChange.bind(this, {methodConfig, key: 'type'})}
    value={props.label.type}
  />;

  const threshold = (label) => {
    if ([ATTRIBUTE_NUMBER, DURATION].includes(label.type)) {
      const thresholdType = <SelectField
        key="threshold_type"
        id="threshold_type"
        label="Threshold type"
        className="md-cell md-cell--6"
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
        className="md-cell md-cell--6"
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
        className="md-cell md-cell--6"
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
    {atr()}
    {threshold(props.label)[1]}
  </div>;
};

LabelControls.propTypes = {
  label: PropTypes.any.isRequired,
  attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelChange: PropTypes.func.isRequired,
};
export default LabelControls;
