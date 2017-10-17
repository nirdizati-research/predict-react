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

const ValidationHeaderCard = (props) => {
  const selectChange = (value, _) => {
    props.logChange(value);
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
        menuItems={props.logNames}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
      /></CardTitle>
    <CardText>
      <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                             inline controls={predictionMethods}
                             onChange={localMethodChange}/>
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


ValidationHeaderCard.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  methodChange: PropTypes.func.isRequired,
  logChange: PropTypes.func.isRequired
};
export default ValidationHeaderCard;
