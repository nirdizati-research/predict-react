/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {splitToString} from '../util/dataReducers';
import {jobPropType} from '../helpers';
import {Button} from 'react-md/lib/Buttons/index';
import {FontIcon} from 'react-md/lib/FontIcons/index';
import JsonHolder from './validation/JsonHolder';

/* eslint-disable camelcase */
/* eslint-disable no-invalid-this */
class JobStatusTable extends PureComponent {
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

  getHeaderColumns() {
    let headers = ['id', 'Status', 'Type', 'Created date', 'Modified date', 'Split', 'Error', 'Configuration'];
    if (this.props.showDeleteButton) {
      headers = ['id', '', 'Status', 'Type', 'Created date', 'Modified date', 'Split', 'Error', 'Configuration'];
    }

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
    return (<DataTable baseId="simple-pagination" selectableRows={false}>
      <TableHeader>
        <TableRow selectable={false}>
          {this.getHeaderColumns()}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          ({id, type, status, created_date, modified_date, split, config, error}) => (
            <TableRow key={id} selectable={false}>
              <TableColumn numeric>{id}</TableColumn>
              {this.props.showDeleteButton ?
                <TableColumn><Button iconEl={<FontIcon>delete</FontIcon>} flat
                                     onClick={this.props.onDelete.bind(this, id)}
                                     secondary>Delete</Button></TableColumn> : null}
              <TableColumn>{status}</TableColumn>
              <TableColumn>{type}</TableColumn>
              <TableColumn>{new Date(created_date).toLocaleString()}</TableColumn>
              <TableColumn>{new Date(modified_date).toLocaleString()}</TableColumn>
              <TableColumn>{splitToString(split)}</TableColumn>
              <TableColumn>{error}</TableColumn>
              <TableColumn grow><JsonHolder data={config}/></TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

JobStatusTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default JobStatusTable;
