/**
 * Created by tonis.kasekamp on 10/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {classTableColumns, regTableColumns} from './ColumnHelper';

const opts = {width: '100%'};

const ResultTableCard = (props) => {
  const title = `${props.predictionMethod} results`;
  let columns = null;
  switch (props.predictionMethod) {
    case REGRESSION:
      columns = regTableColumns;
      break;
    case CLASSIFICATION:
      columns = classTableColumns;
      break;
    case NEXT_ACTIVITY:
      columns = regTableColumns;
      break;
  }
  let chart = null;
  if (props.data.length !== 0) {
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
