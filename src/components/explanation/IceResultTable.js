import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {getIceResultListTable} from '../../util/dataReducers';

class IceResultTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      features: this.props.iceResultList.slice(0, 10),
    };
  }

  handlePagination(start, rowsPerPage) {
    this.setState({
      features: this.props.iceResultList.slice(start, start + rowsPerPage)
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.iceResultList.length !== this.props.iceResultList.length) {
      this.setState({features: this.props.iceResultList.slice(0, 10)});
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

  getPrefixValuesTable(values) {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumns(['label', 'value', 'count'])}
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
          rows={this.props.iceResultList.length}
          rowsPerPageLabel={'Rows per page'}
          onPagination={this.handlePagination.bind(this)}
         />
      </DataTable>
    );
  }
  render() {
      return <div>
       {this.getPrefixValuesTable(getIceResultListTable(this.state.features))}
       </div>;
    }
}

IceResultTable.propTypes = {
  iceResultList: PropTypes.array.isRequired,
};

export default IceResultTable;
