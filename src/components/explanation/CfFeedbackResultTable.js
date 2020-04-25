import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {getPatternsForMatrix, getConfusionMatrixLabels} from '../../util/dataReducers';
import {SelectField} from 'react-md';

class CfFeedbackResultTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      features: getPatternsForMatrix(this.props.cfFeedbackResult, this.props.selectedMatrix).slice(0, 10),
    };
  }

  handlePagination(start, rowsPerPage) {
    this.setState({
      features: getPatternsForMatrix(this.props.cfFeedbackResult, this.props.selectedMatrix)
        .slice(start, start + rowsPerPage)
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedMatrix !== this.props.selectedMatrix
        || prevProps.cfFeedbackResult !== this.props.cfFeedbackResult ) {
      this.setState({features: getPatternsForMatrix(this.props.cfFeedbackResult,
         this.props.selectedMatrix).slice(0, 10)});
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

  getConfusionMatrixTable(values) {
    return (
      <DataTable baseId="simple-pagination" plain>
        <TableHeader>
          <TableRow selectable={false}>
            {this.getHeaderColumns(['Class', 'Pattern', 'Frequency'])}
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
          rows={getPatternsForMatrix(this.props.cfFeedbackResult, this.props.selectedMatrix).length}
          rowsPerPageLabel={'Rows per page'}
          onPagination={this.handlePagination.bind(this)}
         />
      </DataTable>
    );
  }

  getMatrixSelector() {
    return (
      <SelectField
        placeholder="Select consion matrix"
        className="md-cell"
        defaultValue='All'
        style={{
          marginLeft: -10,
          padding: 0}}
        menuItems={getConfusionMatrixLabels(this.props.cfFeedbackResult)}
        position={SelectField.Positions.BELOW}
        onChange={this.onChangeMatrix.bind(this)}
      />
    );
  }

  onChangeMatrix(value, index, event, data) {
    this.props.onSelectedMatrixChange(value);
  }

  render() {
     return <div>
    <h4 style={{
            marginTop: 30,
            marginBottom: -5,
            marginLeft: 12,
            padding: 0}}>Confusion matrix filter</h4>
            {this.getMatrixSelector()}
            {this.getConfusionMatrixTable(this.state.features)}
       </div>;
    }
}

CfFeedbackResultTable.propTypes = {
  cfFeedbackResult: PropTypes.array.isRequired,
  onSelectedMatrixChange: PropTypes.func,
  selectedMatrix: PropTypes.any,
};

export default CfFeedbackResultTable;
