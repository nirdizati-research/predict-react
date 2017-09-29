/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const RemainingTimeFragment = (props) => {
  return <div className="md-cell">
    <SelectionControlGroup type="checkbox" label="Regression methods" name="regression" id="regression"
                           onChange={props.checkboxChange} controls={props.regressionMethods}
                           defaultValue={props.regressionMethods[0].value}/>
  </div>;
};

RemainingTimeFragment.propTypes = {
  regressionMethods: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  checkboxChange: PropTypes.func.isRequired
};

export default RemainingTimeFragment;
