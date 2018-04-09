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
  const headers = ['id', 'Type', 'Encoding', 'Clustering', 'Method', 'Prefix length', 'Split'];


  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({id, encoding, clustering, method, splitName, prefix_length, type}) => (
        <TableRow key={id}>
          <TableColumn style={columnStyle}>{id}</TableColumn>
          <TableColumn style={columnStyle}>{type}</TableColumn>
          <TableColumn style={columnStyle}>{encoding}</TableColumn>
          <TableColumn style={columnStyle}>{clustering}</TableColumn>
          <TableColumn style={columnStyle}>{method}</TableColumn>
          <TableColumn style={columnStyle} numeric>{prefix_length}</TableColumn>
          <TableColumn style={columnStyle} grow>{splitName}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

RegConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired
};

export default RegConfigTable;
