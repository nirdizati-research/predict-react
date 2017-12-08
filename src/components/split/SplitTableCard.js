/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';

const SplitTableCard = (props) => {
  const headers = ['id', 'type', 'Log', 'Test log', 'Training log', 'Config'];

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
            {props.splits.map(({id, type, originalLogName, trainingLogName, testLogName, config}) => (
              <TableRow key={id} selectable={false}>
                <TableColumn numberic>{id}</TableColumn>
                <TableColumn>{type}</TableColumn>
                <TableColumn>{originalLogName}</TableColumn>
                <TableColumn>{trainingLogName}</TableColumn>
                <TableColumn>{testLogName}</TableColumn>
                <TableColumn><code>{JSON.stringify(config, null, 2) }</code></TableColumn>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
      </CardText>
    </Card>);
};

SplitTableCard.propTypes = {
  splits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['single', 'double']).isRequired,
    originalLogName: PropTypes.string,
    trainingLogName: PropTypes.string,
    testLogName: PropTypes.string,
    config: PropTypes.object.isRequired,
  })).isRequired
};

export default SplitTableCard;
