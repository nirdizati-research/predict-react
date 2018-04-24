import React from 'react';
import {Card, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {modelsLabel} from '../../helpers';


const PredictionHeaderCard = (props) => {

  const selectChange = (value, _) => {
    props.modelChange(value);
  };

  return <Card className="md-block-centered">
    <CardTitle title={props.title}>
    <SelectField
      id="log-name-select"
      placeholder="log.xes"
      className="md-cell"
      menuItems={props.modelsLabel}
      position={SelectField.Positions.BELOW}
      onChange={selectChange}
    /></CardTitle>
  </Card>;
};


PredictionHeaderCard.propTypes = {
  modelsLabel: modelsLabel,
  title: PropTypes.string.isRequired,
  modelChange: PropTypes.func.isRequired,
};
export default PredictionHeaderCard;
