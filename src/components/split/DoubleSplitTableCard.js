/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {logPropType} from '../../helpers';

const DoubleSplitTableCard = (props) => {
  const headers = ['id', 'Training log', 'Test log', 'Configuration'];

  return (
    <Card className="md-block-centered">
      <CardTitle title="Splits overview"/>
      <CardText>
        These logs were uploaded as a separate training and test set.
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
  return splits.map(({id, training_log, test_log}) => {
    return (
      <TableRow key={id} selectable={false}>
        <TableColumn numeric>{id}</TableColumn>
        <TableColumn>{training_log.name}</TableColumn>
        <TableColumn>{test_log.name}</TableColumn>
        <TableColumn>Configuration is user defined</TableColumn>
      </TableRow>
    );
  });
};

DoubleSplitTableCard.propTypes = {
  splits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['single', 'double']).isRequired,
    original_log: logPropType,
    training_log: logPropType,
    test_log: logPropType,
    config: PropTypes.object.isRequired,
  })).isRequired
};

export default DoubleSplitTableCard;
