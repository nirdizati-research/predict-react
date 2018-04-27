/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from '../FetchState';
import {Chart} from 'react-google-charts';

// Custom compare because why not
const compare = (a, b) => {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] > b[0]) {
    return 1;
  }
  return 0;
};

const LineChartCard = (props) => {
  const rows = Object.keys(props.data).map((key) => [new Date(key), props.data[key]]);
  rows.sort(compare);
  const opts = {
    legend: 'none',
    hAxis: {
      format: 'dd-MM-yy',
      title: 'Date'
    },
    vAxis: {
      title: props.chartTitle
    }
  };

  const columns = [
    {
      type: 'date',
      label: 'Date',
    },
    {
      type: 'number',
      label: props.chartTitle,
    }];

  const chart = <Chart
    chartType="LineChart"
    rows={rows}
    columns={columns}
    options={opts}
    graph_id={props.cardTitle}
    width="100%"
    legend_toggle
  />;
  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      {rows.length < 2 ? 'Chart cannot be shown. Metrics not available.' : chart}
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};

LineChartCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  cardTitle: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};

export default LineChartCard;
