/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {logPropType} from '../../helpers';

const SingleSplitTableCard = (props) => {
  const headers = ['id', 'Log', 'Split type', 'Test set %'];

  return (
    <Card className="md-block-centered">
      <CardTitle title="Splits overview"/>
      <CardText>
        Split created via configuration above
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
  return splits.map(({id, original_log, config}) => {
    return (
      <TableRow key={id} selectable={false}>
        <TableColumn numeric>{id}</TableColumn>
        <TableColumn>{original_log.name}</TableColumn>
        <TableColumn>{config.split_type}</TableColumn>
        <TableColumn numeric>{config.test_size}</TableColumn>
      </TableRow>
    );
  });
};

SingleSplitTableCard.propTypes = {
  splits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['single', 'double']).isRequired,
    original_log: logPropType,
    training_log: logPropType,
    test_log: logPropType,
    config: PropTypes.object.isRequired,
  })).isRequired
};

export default SingleSplitTableCard;
