/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';

const BubbleChartCard = (props) => {
  const opts = {
    hAxis: {title: props.hTitle},
    vAxis: {title: props.vTitle},
    bubble: {textStyle: {fontSize: 11}},
    series: {
      0: { pointShape: 'circle' },
      1: { pointShape: 'triangle' },
      2: { pointShape: 'square' },
      3: { pointShape: 'diamond' },
      4: { pointShape: 'star' },
      5: { pointShape: 'polygon' }
    }
  };

  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      <Chart
        chartType="BubbleChart"
        rows={props.data}
        columns={props.columns}
        options={opts}
        graph_id={props.cardTitle}
        width="100%"
        legend_toggle
      />
    </CardText>
  </Card>;
};

BubbleChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  cardTitle: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  hTitle: PropTypes.string.isRequired,
  vTitle: PropTypes.string.isRequired,
};

export default BubbleChartCard;
