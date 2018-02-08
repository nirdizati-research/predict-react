/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';

/* eslint-disable camelcase */
const ClassConfigTable = (props) => {
  const headers = ['id', 'Status', 'Type', 'Run', 'Split', 'Created', 'Modified', 'Rule', 'Prefix length', 'Threshold'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map((job) => (
        <TableRow key={job.id} selectable={false}>
          <TableColumn style={columnStyle}>{job.id}</TableColumn>
          <TableColumn style={columnStyle}>{job.status}</TableColumn>
          <TableColumn style={columnStyle}>{job.type}</TableColumn>
          <TableColumn style={columnStyle}>{job.run}</TableColumn>
          <TableColumn style={columnStyle}>{job.splitName}</TableColumn>
          <TableColumn style={columnStyle}>{job.created_date}</TableColumn>
          <TableColumn style={columnStyle}>{job.modified_date}</TableColumn>
          <TableColumn style={columnStyle}>{job.rule}</TableColumn>
          <TableColumn style={columnStyle} numeric>{job.prefix_length}</TableColumn>
          <TableColumn style={columnStyle} numeric>{job.threshold}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

ClassConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    splitName: PropTypes.string.isRequired,
    created_date: PropTypes.string.isRequired,
    modified_date: PropTypes.string.isRequired,
    prefix_length: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    rule: PropTypes.string,
    threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired
};

export default ClassConfigTable;
