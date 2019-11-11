import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {jobRunPropType} from '../../propTypes';
import JsonHolder from '../validation/JsonHolder';

/* eslint-disable camelcase */
class RuntimeTable extends PureComponent {
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

  createTableData() {
      this.props.jobs.map((job) => {
          job.case_id.map((trace_id) => {
              return {
                  trace_id: trace_id,
                  events: job.event_number[trace_id],
                  configuration: job.configuration,
                  prediction: job.results[trace_id],
                  gold_value: job.gold_value[trace_id],
                  error: job.error,
              }
          });
      })
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
      this.setState({slicedData: this.createTableData().slice(0, 10)});
    }, 5000);
    this.setState({intervalId: intervalId});
  }


  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getHeaderColumns() {
    const headers =
      ['Trace_id', 'Events', 'Configuration', 'Prediction', 'Actual value', 'error'];

    return headers.map((header) => {
        let grow = false;
        if (header === 'Configuration') {
          grow = true;
        }
        return <TableColumn key={header} grow={grow}> {header}</TableColumn>;
      }
    );
  }

  render() {
    return (<DataTable baseId="simple-pagination" plain>
      <TableHeader>
        <TableRow selectable={false}>
          {this.getHeaderColumns()}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          ({trace_id, events, configuration, prediction, gold_value}) => (
            <TableRow key={trace_id} selectable={false}>
              <TableColumn numeric>{trace_id}</TableColumn>
              <TableColumn>{JSON.stringify(events)}</TableColumn>
              <TableColumn grow><JsonHolder data={configuration}/></TableColumn>
              <TableColumn>{JSON.stringify(prediction)}</TableColumn>
              <TableColumn>{JSON.stringify(gold_value)}</TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

RuntimeTable.propTypes = {
  jobs: PropTypes.arrayOf(jobRunPropType).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
};

export default RuntimeTable;
