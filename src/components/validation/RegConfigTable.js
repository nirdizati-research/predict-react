/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {jobFlatPropType} from '../../helpers';
import JsonHolder from './JsonHolder';

/* eslint-disable camelcase */

/* eslint-disable max-len */
class RegConfigTable extends PureComponent {
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
    const headers =
      ['id', 'Type', 'Encoding', 'Clustering', 'Method', 'Prefix length', 'Label',
        'Padding', 'Create models', 'HyperOpt', 'Advanced configuration'];
    return (<DataTable baseId="simple-pagination" selectableRows={false}>
      <TableHeader>
        <TableRow>
          {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          (job) => (
            <TableRow key={job.id}>
              <TableColumn style={columnStyle}>{job.id}</TableColumn>
              <TableColumn style={columnStyle}>{job.type}</TableColumn>
              <TableColumn style={columnStyle}>{job.encoding}</TableColumn>
              <TableColumn style={columnStyle}>{job.clustering}{job.kmeans ?
                <JsonHolder data={job.kmeans}/> : null}</TableColumn>
              <TableColumn style={columnStyle}>{job.method}</TableColumn>
              <TableColumn style={columnStyle} numeric>{job.prefix_length}</TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.label}/></TableColumn>
              <TableColumn style={columnStyle} numeric>{job.padding}</TableColumn>
              <TableColumn style={columnStyle}>{JSON.stringify(job.create_models, null, 1)}</TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.hyperopt}/></TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.advanced}/></TableColumn>
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
