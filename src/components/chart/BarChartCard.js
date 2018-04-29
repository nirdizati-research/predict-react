/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import DEFAULT_CHART_COLORS from 'react-google-charts/lib/constants/DEFAULT_CHART_COLORS';
// Custom compare because why not
const compare = (a, b) => {
  if (a[1] > b[1]) {
    return -1;
  }
  if (a[1] < b[1]) {
    return 1;
  }
  return 0;
};

// Make every bar different color
const getColor = (index) => {
  return index > 20 ? DEFAULT_CHART_COLORS[0] : DEFAULT_CHART_COLORS[index];
};

const BarChartCard = (props) => {
  // Empty data means empty rows means error
  if (Object.keys(props.data).length === 0 && props.data.constructor === Object) {
    return null;
  }
  const rows = Object.keys(props.data)
    .map((key, index) => [key, props.data[key], props.data[key] + '', getColor(index)]);

  rows.sort(compare);
  const opts = {
    legend: 'none',
    hAxis: {
      title: props.hTitle,
      minValue: 0
    },
    vAxis: {
      title: props.chartTitle
    }
  };
  const columns = [
    {
      type: 'string',
      label: props.hTitle,
    },
    {
      type: 'number',
      label: props.chartTitle,
    },
    {
      type: 'string',
      role: 'annotation'
    },
    {
      type: 'string',
      role: 'style'
    }
  ];
  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      {props.description}
      <Chart
        chartType="BarChart"
        rows={rows}
        columns={columns}
        options={opts}
        graph_id={props.hTitle}
        width="100%"
        legend_toggle
      />
    </CardText>
  </Card>;
};

BarChartCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  cardTitle: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  hTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
};

export default BarChartCard;
