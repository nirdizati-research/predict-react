import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {tracePropType} from '../../propTypes';

/* eslint-disable camelcase */
class RuntimeTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.traces.slice(0, 10)};
  }

  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.traces.slice(start, start + rowsPerPage)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.traces.length !== this.props.traces.length) {
      this.setState({slicedData: this.props.traces.slice(0, 10)});
    }
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.onRequestTraces();
    }, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getHeaderColumns() {
    let headers = ['id', 'Status', 'Regression Results', 'Classification Results'];

    return headers.map((header) => {
        return <TableColumn key={header}> {header}</TableColumn>;
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
        ({id, status, reg_results, class_results}) => (
          <TableRow key={id} selectable={false}>
            <TableColumn numeric>{id}</TableColumn>
            <TableColumn>{status}</TableColumn>
            <TableColumn>{JSON.stringify(reg_results)}</TableColumn>
            <TableColumn>{JSON.stringify(class_results)}</TableColumn>
          </TableRow>
        ))}
    </TableBody>
    <TablePagination rows={this.props.traces.length} rowsPerPageLabel={'Rows per page'}
                     onPagination={this.handlePagination.bind(this)}/>
  </DataTable>);
  }
};

RuntimeTable.propTypes = {
  traces: PropTypes.arrayOf(tracePropType).isRequired,
  onRequestTraces: PropTypes.func.isRequired,
};

export default RuntimeTable;
