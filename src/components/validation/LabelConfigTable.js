import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {labelJobFlat} from '../../helpers';

/* eslint-disable camelcase */

/* eslint-disable max-len */
class LabelConfigTable extends PureComponent {
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

  render() {
    const headers = ['id', 'Encoding', 'Label type', 'Threshold type', 'Threshold', 'Attribute name', 'Prefix length', 'Padding', 'Split', 'Result'];

    return (<DataTable baseId="simple-pagination" plain>
      <TableHeader>
        <TableRow>
          {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map((job) => (
          <TableRow key={job.id}>
            <TableColumn style={columnStyle}>{job.id}</TableColumn>
            <TableColumn style={columnStyle}>{job.encoding}</TableColumn>
            <TableColumn style={columnStyle}>{job.label.type}</TableColumn>
            <TableColumn style={columnStyle}>{job.label.threshold_type}</TableColumn>
            <TableColumn style={columnStyle} numeric>{job.label.threshold}</TableColumn>
            <TableColumn style={columnStyle}>{job.label.attribute_name}</TableColumn>
            <TableColumn style={columnStyle} numeric>{job.prefix_length}</TableColumn>
            <TableColumn style={columnStyle} numeric>{job.padding}</TableColumn>
            <TableColumn style={columnStyle} grow>{job.splitName}</TableColumn>
            <TableColumn style={columnStyle}>
              <pre>{JSON.stringify(job.result, null, 1)}</pre>
            </TableColumn>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

LabelConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(labelJobFlat).isRequired
};

export default LabelConfigTable;
