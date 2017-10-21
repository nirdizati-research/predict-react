/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {outcomeRuleControls} from '../../reference';

const OutcomeRules = (props) => {
  return <div className="md-cell">
    <p>Choose rule to label traces as true or false</p>
    <SelectionControlGroup type="radio" name="rule" id="rule"
                           onChange={props.checkboxChange} controls={outcomeRuleControls}
                           value={props.value}/>
  </div>;
};

OutcomeRules.propTypes = {
  checkboxChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default OutcomeRules;
