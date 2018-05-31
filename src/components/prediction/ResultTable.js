import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import JsonHolder from '../validation/JsonHolder';

/* eslint-disable camelcase */
class ResultTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.jobs.slice(0, 10)};
  }

  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.jobs.slice(start, start + rowsPerPage)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jobs.length !== this.props.jobs.length) {
      this.setState({slicedData: this.props.jobs.slice(0, 10)});
    }
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
    }, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getHeaderColumns() {
    let headers = ['id', 'Status', 'Type', 'Created date', 'Modified date', 'Split', 'Error', 'Results', 'Configuration'];

    return headers.map((header) => {
        let grow = false;
        if (header === 'Configuration') {
          grow = true;
        }
        return <TableColumn key={header} grow={grow}> {header}</TableColumn>;
      }
    );
  }

  render () {
  return (<DataTable baseId="simple-pagination" plain>
    <TableHeader>
      <TableRow selectable={false}>
        {this.getHeaderColumns()}
      </TableRow>
    </TableHeader>
    <TableBody>
      {this.state.slicedData.map(
        ({id, type, status, created_date, modified_date, splitName, config, error, result}) => (
          <TableRow key={id} selectable={false}>
            <TableColumn numeric>{id}</TableColumn>
            <TableColumn>{status}</TableColumn>
            <TableColumn>{type}</TableColumn>
            <TableColumn>{new Date(created_date).toLocaleString()}</TableColumn>
            <TableColumn>{new Date(modified_date).toLocaleString()}</TableColumn>
            <TableColumn>{splitName}</TableColumn>
            <TableColumn>{error}</TableColumn>
            <TableColumn>{result}</TableColumn>
            <TableColumn grow><JsonHolder data={config}/></TableColumn>
          </TableRow>
        ))}
    </TableBody>
    <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                     onPagination={this.handlePagination.bind(this)}/>
  </DataTable>);
  }
};

ResultTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
};

export default ResultTable;
