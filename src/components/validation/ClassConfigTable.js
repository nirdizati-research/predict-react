/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {sliceUuid} from '../../helpers';

const ClassConfigTable = (props) => {
  const headers = ['uuid', 'Status', 'Type', 'Run', 'Log', 'TimeStamp', 'Rule', 'Prefix', 'Threshold'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({uuid, status, run, log, timestamp, prefix, type, rule, threshold}) => (
        <TableRow key={uuid} selectable={false}>
          <TableColumn>{sliceUuid(uuid)}</TableColumn>
          <TableColumn>{status}</TableColumn>
          <TableColumn>{type}</TableColumn>
          <TableColumn>{run}</TableColumn>
          <TableColumn>{log}</TableColumn>
          <TableColumn>{timestamp}</TableColumn>
          <TableColumn>{rule}</TableColumn>
          <TableColumn numeric>{prefix}</TableColumn>
          <TableColumn numeric>{threshold}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

ClassConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    prefix: PropTypes.number.isRequired,
    rule: PropTypes.string,
    threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired
  })).isRequired
};

export default ClassConfigTable;
