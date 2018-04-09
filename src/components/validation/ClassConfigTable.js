/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {jobFlatPropType} from '../../helpers';

/* eslint-disable camelcase */
const ClassConfigTable = (props) => {
  const headers = ['id', 'Type', 'Encoding', 'Clustering', 'Method', 'Rule', 'Threshold', 'Prefix length', 'Split'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map((job) => (
        <TableRow key={job.id}>
          <TableColumn style={columnStyle}>{job.id}</TableColumn>
          <TableColumn style={columnStyle}>{job.type}</TableColumn>
          <TableColumn style={columnStyle}>{job.encoding}</TableColumn>
          <TableColumn style={columnStyle}>{job.clustering}</TableColumn>
          <TableColumn style={columnStyle}>{job.method}</TableColumn>
          <TableColumn style={columnStyle}>{job.rule}</TableColumn>
          <TableColumn style={columnStyle} numeric>{job.threshold}</TableColumn>
          <TableColumn style={columnStyle} numeric>{job.prefix_length}</TableColumn>
          <TableColumn style={columnStyle} grow>{job.splitName}</TableColumn>

        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

ClassConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired
};

export default ClassConfigTable;
