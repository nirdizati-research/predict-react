/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {splitPropType} from '../../propTypes';

const SingleSplitTableCard = (props) => {
  const headers = ['id', 'Log', 'Split type', 'Test set %'];

  return (
    <Card className="md-block-centered">
      <CardTitle title="Split configurations from single logs"/>
      <CardText>
        <DataTable baseId="simple-pagination" plain>
          <TableHeader>
            <TableRow selectable={false}>
              {headers.map((header) => <TableColumn key={header}> {header}</TableColumn>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableBody(props.splits)}
          </TableBody>
        </DataTable>
      </CardText>
    </Card>);
};

/* eslint-disable camelcase */
const tableBody = (splits) => {
  return splits.map(({id, originalLogName, config}) => {
    return (
      <TableRow key={id} selectable={false}>
        <TableColumn numeric>{id}</TableColumn>
        <TableColumn>{originalLogName}</TableColumn>
        <TableColumn>{config.split_type}</TableColumn>
        <TableColumn numeric>{Math.round(config.test_size * 100) / 100}</TableColumn>
      </TableRow>
    );
  });
};

SingleSplitTableCard.propTypes = {
  splits: PropTypes.arrayOf(splitPropType).isRequired
};

export default SingleSplitTableCard;
