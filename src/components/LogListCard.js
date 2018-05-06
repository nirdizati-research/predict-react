import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './FetchState';
import {fetchStatePropType} from '../propTypes';

const LogListCard = (props) => {
  const itemsWithLabel = props.logList.map(({id, name}) => ({value: id, label: name}));
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
        menuItems={itemsWithLabel}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
        value={props.visibleLogId}
      />
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


LogListCard.propTypes = {
  logList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  visibleLogId: PropTypes.number.isRequired,
  fetchState: fetchStatePropType,
  selectChange: PropTypes.func.isRequired
};
export default LogListCard;
