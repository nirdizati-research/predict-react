/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {logPropType} from '../../helpers';

const SplitTableCard = (props) => {
  const headers = ['id', 'type', 'Log', 'Training log', 'Test log', 'Config'];

  return (
    <Card className="md-block-centered">
      <CardTitle title="Splits overview"/>
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

// TODO show names instead of pure JSON
/* eslint-disable camelcase */
const tableBody = (splits) => {
  return splits.map(({id, type, original_log, training_log, test_log, config}) => {
    return (
      <TableRow key={id} selectable={false}>
        <TableColumn numeric>{id}</TableColumn>
        <TableColumn>{type}</TableColumn>
        <TableColumn>{original_log ? original_log.name : null}</TableColumn>
        <TableColumn>{training_log ? training_log.name : null}</TableColumn>
        <TableColumn>{test_log ? test_log.name : null}</TableColumn>
        <TableColumn><pre>{JSON.stringify(config, null, 2)}</pre></TableColumn>
      </TableRow>
    );
  });
};

SplitTableCard.propTypes = {
  splits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['single', 'double']).isRequired,
    original_log: logPropType,
    training_log: logPropType,
    test_log: logPropType,
    config: PropTypes.object.isRequired,
  })).isRequired
};

export default SplitTableCard;
