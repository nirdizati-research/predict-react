/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {jobFlatPropType} from '../../helpers';

/* eslint-disable camelcase */
const RegConfigTable = (props) => {
  const headers = ['id', 'Status', 'Type', 'Run', 'Split', 'Created', 'Modified', 'Prefix length'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({id, status, run, splitName, created_date, modified_date, prefix_length, type}) => (
        <TableRow key={id} selectable={false}>
          <TableColumn style={columnStyle}>{id}</TableColumn>
          <TableColumn style={columnStyle}>{status}</TableColumn>
          <TableColumn style={columnStyle}>{type}</TableColumn>
          <TableColumn style={columnStyle}>{run}</TableColumn>
          <TableColumn style={columnStyle}>{splitName}</TableColumn>
          <TableColumn style={columnStyle}>{created_date}</TableColumn>
          <TableColumn style={columnStyle}>{modified_date}</TableColumn>
          <TableColumn style={columnStyle} numeric>{prefix_length}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

RegConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired
};

export default RegConfigTable;
