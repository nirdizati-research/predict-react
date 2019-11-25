import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';

/* eslint-disable camelcase */
class TraceTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prefixValues: this.props.jobs.traceList.slice(0, 10),
      traceValues: this.props.jobs.traceAttributes
    };
  }

  handlePagination(start, rowsPerPage) {
    this.setState({
      prefixValues: this.props.jobs.traceList.slice(start, start + rowsPerPage)
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jobs.traceAttributes!=null && this.props.jobs.traceAttributes!=null) {
      if (prevProps.jobs.traceAttributes.trace_id != this.props.jobs.traceAttributes.trace_id) {
        this.setState({prefixValues: this.props.jobs.traceList.slice(0, 10)});
        this.setState({traceValues: this.props.jobs.traceAttributes});
    }
  }
    if (prevProps.jobs.traceList.length !== this.props.jobs.traceList.length) {
      this.setState({prefixValues: this.props.jobs.traceList.slice(0, 10)});
      this.setState({traceValues: this.props.jobs.traceAttributes});
    }
  }

  getHeaderColumnsPrefixValues() {
    const headers = [
      'id',
      'Prefix',
      'Activity code',
      'Number of execution',
      'Producer code',
      'Section',
      'Specialism code',
      'Group',
      'Lifecycle:transition'
    ];

    return headers.map(header => {
      let grow = false;
      if (header === 'Configuration') {
        grow = true;
      }
      return (
        <TableColumn key={header} grow={grow}>
          {''}
          {header}
        </TableColumn>
      );
    });
  }

  getHeaderColumnsTraceValues() {
    const headers = [
      'Trace_id',
      'Age',
      'Diagnosis',
      'Diagnosis Treatment Combination ID',
      'Diagnosis code',
      'End date',
      'Specialism code',
      'Start date',
      'Treatment code',
      'Label'
    ];

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

  getTraceValuesTable(traceValues) {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumnsTraceValues()}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={traceValues.trace_id} selectable={false}>
            <TableColumn>{traceValues.trace_id}</TableColumn>
            <TableColumn>{traceValues.Age}</TableColumn>
            <TableColumn>{traceValues.Diagnosis}</TableColumn>
            <TableColumn>
              {traceValues.Diagnosis_Treatment_Combination_ID}
            </TableColumn>
            <TableColumn>{traceValues.Diagnosis_code}</TableColumn>
            <TableColumn>{traceValues.End_date}</TableColumn>
            <TableColumn>{traceValues.Start_date}</TableColumn>
            <TableColumn>{traceValues.Specialism_code}</TableColumn>
            <TableColumn>{traceValues.Treatment_code}</TableColumn>
            <TableColumn>{traceValues.label}</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );
  }

  getPrefixValuesTable() {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumnsPrefixValues()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.prefixValues.map(
            ({
              id,
              prefix,
              activity_code,
              number_of_execution,
              producer_code,
              section,
              specialism_code,
              group,
              lifecycle
            }) => (
              <TableRow key={id} selectable={false}>
                <TableColumn>{id}</TableColumn>
                <TableColumn>{prefix}</TableColumn>
                <TableColumn>{activity_code}</TableColumn>
                <TableColumn>{number_of_execution}</TableColumn>
                <TableColumn>{producer_code}</TableColumn>
                <TableColumn>{section}</TableColumn>
                <TableColumn>{specialism_code}</TableColumn>
                <TableColumn>{group}</TableColumn>
                <TableColumn>{lifecycle}</TableColumn>
              </TableRow>
            )
          )}
        </TableBody>
        <TablePagination
          rows={this.state.prefixValues.length}
          rowsPerPageLabel={'Rows per page'}
          onPagination={this.handlePagination.bind(this)}
        ></TablePagination>
      </DataTable>
    );
  }
  render() {
    const traceValues = this.state.traceValues;
    if (traceValues != null) {
      return <div>{this.getTraceValuesTable(traceValues)} {this.getPrefixValuesTable()}</div>;
    }
    return <div>{this.getPrefixValuesTable()}</div>;
  }
}

TraceTable.propTypes = {
  jobs: PropTypes.any.isRequired
};

export default TraceTable;
