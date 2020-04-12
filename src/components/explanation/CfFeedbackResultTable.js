import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';

class CfFeedbackResultTable extends PureComponent {
  constructor(props) {
    super(props);
  }
  getHeaderColumns() {
    const headers = ['Matrix', 'Result'];
      return (
        <DataTable baseId="simple-pagination" selectableRows={false}>
        <TableHeader>
        <TableRow>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
        </TableHeader>
         <TableBody>
          <TableRow key={1}>
              <TableColumn style={columnStyle}>{'tp'}</TableColumn>
              <TableColumn style={columnStyle}>{this.props.cfFeedbackResult['tp'].toString()}</TableColumn>
        </TableRow>
        <TableRow key={2}>
              <TableColumn style={columnStyle}>{'tn'}</TableColumn>
              <TableColumn style={columnStyle}>{this.props.cfFeedbackResult['tn'].toString()}</TableColumn>
        </TableRow>
        <TableRow key={3}>
              <TableColumn style={columnStyle}>{'fp'}</TableColumn>
              <TableColumn style={columnStyle}>{this.props.cfFeedbackResult['fp'].toString()}</TableColumn>
        </TableRow>
        <TableRow key={4}>
              <TableColumn style={columnStyle}>{'fn'}</TableColumn>
              <TableColumn style={columnStyle}>{this.props.cfFeedbackResult['fn'].toString()}</TableColumn>
        </TableRow>
     </TableBody>
     </DataTable>
      );
  }
  render() {
      return <div>
       {this.getHeaderColumns()}
       </div>;
    }
}

CfFeedbackResultTable.propTypes = {
  cfFeedbackResult: PropTypes.any,
};

export default CfFeedbackResultTable;
