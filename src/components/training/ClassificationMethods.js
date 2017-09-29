/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const ClassificationMethods = (props) => {
  return <div className="md-cell">
    <SelectionControlGroup type="checkbox" label="Classification methods" name="classification" id="classification"
                           onChange={props.checkboxChange} controls={props.classificationMethods}
                           value={props.value}/>
  </div>;
};

ClassificationMethods.propTypes = {
  classificationMethods: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  checkboxChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ClassificationMethods;
