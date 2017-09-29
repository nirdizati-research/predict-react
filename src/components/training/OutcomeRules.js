/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const OutcomeRules = (props) => {
  return <div className="md-cell">
    <p>Choose rule to label traces as true or false</p>
    <SelectionControlGroup type="radio" label="Rule" name="rule" id="rule"
                           onChange={props.checkboxChange} controls={props.outcomeRuleControls}
                           value={props.value}/>
  </div>;
};

OutcomeRules.propTypes = {
  outcomeRuleControls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  checkboxChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default OutcomeRules;
