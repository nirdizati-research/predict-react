import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

class DecodedDFTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.values.slice(0, 10),
    };
  }

  handlePagination(start, rowsPerPage) {
    this.setState({
      values: this.props.values.slice(start, start + rowsPerPage)
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.values.length !== this.props.values.length) {
      this.setState({values: this.props.values.slice(0, 10)});
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

  getDecodedDFValuesTable(values) {
    return (
      <Card className="md-block-centered">
      <CardTitle title="Decoded dataframe result"></CardTitle>
      <CardText>
      {this.props.jobId != '' ?
                  'Decoded dataframe result with job id: '+ this.props.jobId: ''}
      </CardText>
      {!this.props.isDecodedValueLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
      <CardText>
      {this.props.values.length>0 ?
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumns(this.props.headers)}
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
          rows={this.props.values.length}
          rowsPerPageLabel={'Rows per page'}
          onPagination={this.handlePagination.bind(this)}/>
      </DataTable> : null
      }
      </CardText>
      </Card>
    );
  }
  render() {
      return <div>
       {this.getDecodedDFValuesTable(this.state.values)}
       </div>;
    }
}

DecodedDFTable.propTypes = {
  values: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  isDecodedValueLoaded: PropTypes.bool.isRequired,
  jobId: PropTypes.any.isRequired,
};

export default DecodedDFTable;
