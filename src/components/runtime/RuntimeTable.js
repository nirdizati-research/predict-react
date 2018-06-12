import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {tracePropType} from '../../propTypes';

/* eslint-disable camelcase */
/* eslint-disable max-len */
class RuntimeTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.traces.slice(0, 10)};
  }

  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.traces.slice(start, start + rowsPerPage)});
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.onRequestTraces();
      this.setState({slicedData: this.props.traces.slice(0, 10)});
    }, 10000);
    this.setState({intervalId: intervalId});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.traces.length !== this.props.traces.length) {
      this.setState({slicedData: this.props.traces.slice(0, 10)});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getHeaderColumns() {
    const headers =
      ['id', 'Completed', 'Events Elapsed', 'Start Time', 'Latest event time', 'Regression Results', 'Classification Results'];

    return headers.map((header) => {
        return <TableColumn key={header}> {header}</TableColumn>;
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
          ({id, completed, n_events, first_event, last_event, reg_results, class_results}) => (
            <TableRow key={id} selectable={false}>
              <TableColumn numeric>{id}</TableColumn>
              <TableColumn>{completed ? 'True' : 'False'}</TableColumn>
              <TableColumn>{n_events}</TableColumn>
              <TableColumn>{first_event}</TableColumn>
              <TableColumn>{last_event}</TableColumn>
              <TableColumn>{JSON.stringify(reg_results)}</TableColumn>
              <TableColumn>{JSON.stringify(class_results)}</TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.traces.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

RuntimeTable.propTypes = {
  traces: PropTypes.arrayOf(tracePropType).isRequired,
  onRequestTraces: PropTypes.func.isRequired,
};

export default RuntimeTable;
