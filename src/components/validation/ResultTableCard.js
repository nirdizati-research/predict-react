/**
 * Created by tonis.kasekamp on 10/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';

const opts = {width: '100%'};

const ResultTableCard = (props) => {
  let chart = null;
  if (props.data.length === 0) {
    chart = <Chart
      chartType="Table"
      rows={props.data}
      columns={props.columns}
      options={opts}
      width="100%"
      height="auto"
      legend_toggle
    />;
  }

  return <Card className="md-block-centered">
    <CardTitle title={props.cardTitle}/>
    <CardText>
      {chart}
    </CardText>
  </Card>;
};

ResultTableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  cardTitle: PropTypes.string.isRequired
};

export default ResultTableCard;
