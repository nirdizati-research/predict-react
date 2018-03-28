/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {predictionMethods} from '../../reference';
import {splitLabels} from '../../helpers';

const ValidationHeaderCard = (props) => {
  const prefixControls = props.prefixLengths.map((prefix) => ({label: prefix, value: prefix}));

  const defaultValue = ',' + props.selectedPrefixes.join(',');

  const checkBoxChange = (value, event) => {
    props.prefixChange(event.target.value);
  };

  const checkies = props.prefixLengths.length > 0 ?
    <SelectionControlGroup type="checkbox" label="Prefix lengths" name="prefixLengths" id="prefixLengths"
                           onChange={checkBoxChange} controls={prefixControls} inline
                           defaultValue={defaultValue} /> : null;
  const selectChange = (value, _) => {
    props.splitChange(value);
  };
  const localMethodChange = (value, _) => {
    props.methodChange(value);
  };

  return <Card className="md-block-centered">
    <CardTitle title="Validation selection">
      <SelectField
        id="log-name-select"
        placeholder="log.xes"
        className="md-cell"
        menuItems={props.splitLabels}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
      /></CardTitle>
    <CardText>
      <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                             inline controls={predictionMethods}
                             onChange={localMethodChange}/>
      <div className="md-cell">
        {checkies}
      </div>
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


ValidationHeaderCard.propTypes = {
  splitLabels: splitLabels,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  methodChange: PropTypes.func.isRequired,
  splitChange: PropTypes.func.isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  prefixChange: PropTypes.func.isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default ValidationHeaderCard;
