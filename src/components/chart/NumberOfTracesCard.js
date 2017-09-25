/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from '../FetchState';
import {Chart} from 'react-google-charts';

const NumberOfTracesCard = (props) => {
  const values = Object.keys(props.traces).map((key) => [new Date(key), props.traces[key]]);

  const opts = {
    legend: 'none',
    hAxis: {
      format: 'dd-MM-yy',
      title: 'Date'
    },
    vAxis: {
      title: 'Active Traces'
    }
  };
  return <Card className="md-block-centered">
    <CardTitle title="Number of traces"/>
    <CardText>
      <Chart
        chartType="LineChart"
        data={[['Date', 'Active Traces'], ...values]}
        options={opts}
        graph_id="LineChart"
        width="100%"
        height="400px"
        legend_toggle
      />
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};

NumberOfTracesCard.propTypes = {
  traces: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};
export default NumberOfTracesCard;
