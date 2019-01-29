/**
 * Created by tonis.kasekamp on 10/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';
import {getTableHeader} from './ColumnHelper';
import {Button} from 'react-md/lib/Buttons/index';
import {makeCSV} from '../../util/csvDownload';

const opts = {width: '100%', page: 'enable'};

const ResultTableCard = (props) => {
  const title = `${props.predictionMethod.replace(/\b\w/g, l => l.toUpperCase())} results`;
  let chart = null;
  let downloadButton = null;
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
    const href = 'data:text/csv;charset=utf-8,' + encodeURI(makeCSV(columns, props.data));
    downloadButton =
      <Button flat primary swapTheming href={href} download='data.csv' className="md-cell--right">
        Download table data</Button>;
  }

  return <Card className="md-block-centered">
    <CardTitle title={title}>{downloadButton}</CardTitle>
    <CardText>
      {chart}
    </CardText>
  </Card>;
};

ResultTableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION]),
};

export default ResultTableCard;
