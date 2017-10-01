/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from '../FetchState';
import {Chart} from 'react-google-charts';

const opts = {
  hAxis: {title: 'Mae'},
  vAxis: {title: 'Rmse'},
  bubble: {textStyle: {fontSize: 11}}
};
const columns = [
  {
    type: 'string',
    label: 'ID',
  },
  {
    type: 'number',
    label: 'Mae',
  },
  {
    type: 'number',
    label: 'Rmse',
  },
  {
    type: 'string',
    label: 'Method',
  },
  {
    type: 'number',
    label: 'Rscore',
  }
];

const BubbleChartCard = (props) => {
  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      <Chart
        chartType="BubbleChart"
        rows={props.data}
        columns={columns}
        options={opts}
        graph_id={props.cardTitle}
        width="100%"
        legend_toggle
      />
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};

BubbleChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  cardTitle: PropTypes.string.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};

export default BubbleChartCard;
