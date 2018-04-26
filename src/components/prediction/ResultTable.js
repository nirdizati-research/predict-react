import React, {Component} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {splitToString} from '../../util/dataReducers';
import {jobPropType} from '../../helpers';

/* eslint-disable camelcase */
class ResultTable extends Component {

  componentDidMount() {
    // Get only if empty
    // TODO move this check to somewhere else

    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
    }, 5000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render () {
  const headers = ['id', 'Type', 'Status', 'Created date', 'Modified date', 'Split', 'Config', 'results'];
  const jobs = this.props.jobs.reverse();
  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {headers.map((header) => <TableColumn key={header}> {header}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {jobs.map(({id, type, status, created_date, modified_date, split, config, result}) => (
        <TableRow key={id} selectable={false}>
          <TableColumn numeric>{id}</TableColumn>
          <TableColumn>{status}</TableColumn>
          <TableColumn>{type}</TableColumn>
          <TableColumn>{new Date(created_date).toLocaleString()}</TableColumn>
          <TableColumn>{new Date(modified_date).toLocaleString()}</TableColumn>
          <TableColumn>{splitToString(split)}</TableColumn>
          <TableColumn><pre>{JSON.stringify(config, null, 2)}</pre></TableColumn>
          <TableColumn>{result.map(t => <span>{t},<br/></span>)}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>);
  }
};

ResultTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
};

export default ResultTable;
