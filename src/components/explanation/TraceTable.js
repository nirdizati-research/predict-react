import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';

/* eslint-disable camelcase */
class TraceTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.traceArr.events.slice(0, 10),
      // traceValues: this.props.jobs.traceAttributes
    };
  }

  handlePagination(start, rowsPerPage) {
    this.setState({
      events: this.props.traceArr.events.slice(start, start + rowsPerPage)
    });
  }

  componentDidUpdate(prevProps) {
  //   if (prevProps.jobs.traceAttributes!=null && this.props.jobs.traceAttributes!=null) {
  //     if (prevProps.jobs.traceAttributes.trace_id != this.props.jobs.traceAttributes.trace_id) {
  //       this.setState({events: this.props.traceArr.events.slice(0, 10)});
  //   }
  // }
    if (prevProps.traceArr.events.length !== this.props.traceArr.events.length) {
      this.setState({events: this.props.traceArr.events.slice(0, 10)});
    }
  }

  getHeaderColumns(headers) {
    return headers.map(header => {
      let grow = false;
      if (header === 'Configuration') {
        grow = true;
      }
      return (
        <TableColumn key={header} grow={grow}>
          {' '}
          {header}
        </TableColumn>
      );
    });
  }

  getTraceValuesTable(attributes) {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumns(this.props.traceAttributesHeader)}
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow selectable={false}>
          {attributes.map(
            (value) => (
                <TableColumn key={value}>{value}</TableColumn>
            )
          )}
          </TableRow>

        </TableBody>
      </DataTable>
    );
  }

  getPrefixValuesTable(values) {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumns(this.props.traceEventsHeaders)}
          </TableRow>
        </TableHeader>
        <TableBody>
        {values.map(
            (value, index) => (
              <TableRow key={value+index} selectable={false}>
              {value.map(
                (v) => (
                    <TableColumn key={v}>{v}</TableColumn>
                )
              )}
              </TableRow>
              )
          )}
        </TableBody>
        <TablePagination
          rows={this.props.traceArr.events.length}
          rowsPerPageLabel={'Rows per page'}
          onPagination={this.handlePagination.bind(this)}
        ></TablePagination>
      </DataTable>
    );
  }
  render() {
    if (this.props.traceArr.events.length > 0) {
      return <div>{this.getTraceValuesTable(this.props.traceArr.attributes)}
       {this.getPrefixValuesTable(this.state.events)}</div>;
    }
    return null;
  }
}

TraceTable.propTypes = {
  traceAttributesHeader: PropTypes.any.isRequired,
  traceEventsHeaders: PropTypes.any.isRequired,
  traceArr: PropTypes.any.isRequired
};

export default TraceTable;
