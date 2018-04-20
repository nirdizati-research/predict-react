/**
 * Created by tonis.kasekamp on 10/10/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {tableColumns} from './ColumnHelper';

const opts = {width: '100%'};

const ResultTableCard = (props) => {
  const title = `Results`;
  let chart = null;
  if (props.data.length !== 0) {
    const columns = tableColumns;
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
};

export default ResultTableCard;
