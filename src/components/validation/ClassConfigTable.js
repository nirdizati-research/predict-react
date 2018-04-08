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
  const headers = ['id', 'Status', 'Type', 'Run', 'Split', 'Created', 'Modified', 'Rule', 'Prefix length', 'Threshold'];

  // const a1 = (aa, ab, ac, ad) => {
  //   console.log(aa,ab,ac)
  //   console.log("job id", props.jobs[aa].id)
  //   console.log(ad.target)
  // };
  return (<DataTable baseId="simple-pagination" selectable onRowToggle={props.handleRowToggle}>
    <TableHeader>
      <TableRow>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map((job) => (
        <TableRow key={job.id} selected={job.selected}>
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
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired,
  handleRowToggle: PropTypes.func.isRequired
};

export default ClassConfigTable;
