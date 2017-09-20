/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';

const JobStatusTable = (props) => {
  const headers = ['__id__', 'Status', 'Run', 'Log', 'TimeStamp', 'Rule', 'Prefix', 'Threshold', '__version__', 'Type'];

  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map(header => <TableColumn key={header}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.jobs.map(({__id__, Status, Run, Log, TimeStamp, Rule, Prefix, Threshold, __version__, Type}) => (
        <TableRow key={__id__} selectable={false}>
          <TableColumn numeric>{__id__}</TableColumn>
          <TableColumn>{Status}</TableColumn>
          <TableColumn>{Run}</TableColumn>
          <TableColumn>{Log}</TableColumn>
          <TableColumn>{TimeStamp}</TableColumn>
          <TableColumn>{Rule}</TableColumn>
          <TableColumn>{Prefix}</TableColumn>
          <TableColumn numeric>{Threshold}</TableColumn>
          <TableColumn numeric>{__version__}</TableColumn>
          <TableColumn>{Type}</TableColumn>
        </TableRow>
      ))}
    </TableBody>

  </DataTable>);
};

JobStatusTable.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    __id__: PropTypes.string.isRequired,
    Status: PropTypes.string.isRequired,
    Run: PropTypes.string.isRequired,
    Log: PropTypes.string.isRequired,
    TimeStamp: PropTypes.string.isRequired,
    Prefix: PropTypes.string.isRequired,
    Rule: PropTypes.string.isRequired,
    Threshold: PropTypes.string.isRequired,
    __version__: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired
  })).isRequired
};

export default JobStatusTable;
