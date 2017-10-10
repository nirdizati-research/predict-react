/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {sliceUuid} from '../../helpers';
import {columnStyle} from '../../reference';

const RegConfigTable = (props) => {
  const headers = ['uuid', 'Status', 'Type', 'Run', 'Log', 'TimeStamp', 'Prefix'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({uuid, status, run, log, timestamp, prefix, type}) => (
        <TableRow key={uuid} selectable={false}>
          <TableColumn style={columnStyle}>{sliceUuid(uuid)}</TableColumn>
          <TableColumn style={columnStyle}>{status}</TableColumn>
          <TableColumn style={columnStyle}>{type}</TableColumn>
          <TableColumn style={columnStyle}>{run}</TableColumn>
          <TableColumn style={columnStyle}>{log}</TableColumn>
          <TableColumn style={columnStyle}>{timestamp}</TableColumn>
          <TableColumn style={columnStyle} numeric>{prefix}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

RegConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    prefix: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired
};

export default RegConfigTable;
