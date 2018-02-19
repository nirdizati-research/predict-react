/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {splitToString} from '../util/dataReducers';
import {jobPropType} from '../helpers';

/* eslint-disable camelcase */
const JobStatusTable = (props) => {
  const headers = ['id', 'Type', 'Status', 'Created date', 'Modified date', 'Split', 'Error', 'Config'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({id, type, status, created_date, modified_date, split, config, error}) => (
        <TableRow key={id} selectable={false}>
          <TableColumn numeric>{id}</TableColumn>
          <TableColumn>{status}</TableColumn>
          <TableColumn>{type}</TableColumn>
          <TableColumn>{created_date}</TableColumn>
          <TableColumn>{modified_date}</TableColumn>
          <TableColumn>{splitToString(split)}</TableColumn>
          <TableColumn>{error}</TableColumn>
          <TableColumn grow><code>{JSON.stringify(config, null, 2)}</code></TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
};

JobStatusTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired
};

export default JobStatusTable;
