/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from '../FetchState';
import {Chart} from 'react-google-charts';

// Custom compare because why not
const compare = (a, b) =>{
  if (a[1] > b[1]) {
    return -1;
  }
  if (a[1] < b[1]) {
    return 1;
  }
  return 0;
};

const EventChartCard = (props) => {
  const rows = Object.keys(props.data).map((key) => [key, props.data[key]]);

  rows.sort(compare);

  const hTitle = 'Number of Executions';
  const vTitle = 'Events';
  const opts = {
    legend: 'none',
    hAxis: {
      title: hTitle
    },
    vAxis: {
      title: vTitle
    }
  };
  const columns = [
    {
      type: 'string',
      label: hTitle,
    },
    {
      type: 'number',
      label: vTitle,
    }];
  return <Card className="md-block-centered">
    <CardTitle title="Event Occurrences"/>
    <CardText>
      <Chart
        chartType="BarChart"
        rows={rows}
        columns={columns}
        options={opts}
        graph_id={hTitle}
        width="100%"
        legend_toggle
      />
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};

EventChartCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};

export default EventChartCard;
