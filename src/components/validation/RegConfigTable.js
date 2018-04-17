/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow, TablePagination} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {jobFlatPropType} from '../../helpers';

/* eslint-disable camelcase */
class RegConfigTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.jobs.slice(0, 10)};
  }


  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.jobs.slice(start, start + rowsPerPage)});
  }


  render() {
    const headers =
      ['id', 'Type', 'Encoding', 'Clustering', 'Method', 'Prefix length', 'Padding', 'Advanced configuration', 'Split'];
    return (<DataTable baseId="simple-pagination" plain>
      <TableHeader>
        <TableRow>
          {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          ({id, encoding, clustering, method, splitName, prefix_length, type, advanced, padding}) => (
            <TableRow key={id}>
              <TableColumn style={columnStyle}>{id}</TableColumn>
              <TableColumn style={columnStyle}>{type}</TableColumn>
              <TableColumn style={columnStyle}>{encoding}</TableColumn>
              <TableColumn style={columnStyle}>{clustering}</TableColumn>
              <TableColumn style={columnStyle}>{method}</TableColumn>
              <TableColumn style={columnStyle} numeric>{prefix_length}</TableColumn>
              <TableColumn style={columnStyle} numeric>{padding}</TableColumn>
              <TableColumn style={columnStyle}>
                <pre>{JSON.stringify(advanced, null, 1)}</pre>
              </TableColumn>
              <TableColumn style={columnStyle} grow>{splitName}</TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

RegConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired
};

export default RegConfigTable;
