/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import JsonHolder from '../validation/JsonHolder';
import Checkbox from './Checkbox';

/* eslint-disable camelcase */

/* eslint-disable no-invalid-this */
class IncrementalTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {slicedData: this.props.jobs.slice(0, 10)};
        this.selectedCheckboxes = new Set();
    }


    handlePagination(start, rowsPerPage) {
        this.setState({slicedData: this.props.jobs.slice(start, start + rowsPerPage)});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.jobs.length !== this.props.jobs.length) {
            this.setState({slicedData: this.props.jobs.slice(0, 10)});
        }
    }

    toggleCheckbox = label => {
    this.props.onClickCheckbox(label);
  };

    getHeaderColumns() {
        let headers = [
            'Selected', 'ID', 'Status', 'Type', 'Creation date', 'Update date',
            'Split configuration', 'Error', 'Configuration'];

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
                            <TableColumn className="selectCheckbox" padding="checkbox">
                                <Checkbox label={id}
                                          handleCheckboxChange={this.toggleCheckbox}
                                          key={id}/>
                            </TableColumn>
                            <TableColumn numeric>{id}</TableColumn>
                            <TableColumn>{status}</TableColumn>
                            <TableColumn>{type}</TableColumn>
                            <TableColumn>{new Date(created_date).toLocaleString()}</TableColumn>
                            <TableColumn>{new Date(modified_date).toLocaleString()}</TableColumn>
                            <TableColumn grow><JsonHolder data={config.split}/></TableColumn>
                            <TableColumn>{error}</TableColumn>
                            <TableColumn grow><JsonHolder data={config}/></TableColumn>
                        </TableRow>
                    ))}
            </TableBody>
            <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                             onPagination={this.handlePagination.bind(this)}/>
        </DataTable>
        );
    }
}

IncrementalTable.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    onClickCheckbox: PropTypes.func,
};

export default IncrementalTable;
