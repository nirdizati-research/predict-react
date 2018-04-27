/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const CheckboxGroup = (props) => {
  return <div className="md-cell md-cell--4">
    <SelectionControlGroup type="checkbox" label={props.label} name={props.id} id={props.id}
                           onChange={props.onChange} controls={props.controls}
                           value={props.value} defaultValue={props.defaultValue}/>
  </div>;
};

CheckboxGroup.propTypes = {
  controls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

export default CheckboxGroup;
