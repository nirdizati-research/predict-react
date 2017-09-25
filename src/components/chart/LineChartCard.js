/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from '../FetchState';
import {Chart} from 'react-google-charts';

const LineChartCard = (props) => {
  const values = Object.keys(props.data).map((key) => [new Date(key), props.data[key]]);

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
  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      <Chart
        chartType="LineChart"
        rows={values}
        columns={columns}
        options={opts}
        graph_id={props.cardTitle}
        width="100%"
        height="400px"
        legend_toggle
      />
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
