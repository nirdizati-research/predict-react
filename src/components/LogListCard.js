import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './FetchState';

const LogListCard = (props) => {
  const selectChange = (value, _) => {
    props.selectChange(value);
  };
  return <Card className="md-block-centered">
    <CardTitle title="Log overview"/>
    <CardText>
      <p>Pick a log to see details</p>
      <SelectField
        id="log-name-select"
        placeholder="log.xes"
        className="md-cell"
        menuItems={props.logNames}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
        value={props.visibleLogName}
      />
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


LogListCard.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  visibleLogName: PropTypes.string.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  selectChange: PropTypes.func.isRequired
};
export default LogListCard;
