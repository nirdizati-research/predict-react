/**
 * Created by tonis.kasekamp on 10/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {getTableHeader} from './ColumnHelper';

const opts = {width: '100%', page: 'enable'};

const ResultTableCard = (props) => {
  const title = `${props.predictionMethod} results`;
  let chart = null;
  if (props.data.length !== 0) {
    const columns = getTableHeader(props.predictionMethod);
    chart = <Chart
      chartType="Table"
      rows={props.data}
      columns={columns}
      options={opts}
      width="100%"
      height="auto"
      legend_toggle
    />;
  }

  return <Card className="md-block-centered">
    <CardTitle title={title}/>
    <CardText>
      {chart}
    </CardText>
  </Card>;
};

ResultTableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]),
};

export default ResultTableCard;
