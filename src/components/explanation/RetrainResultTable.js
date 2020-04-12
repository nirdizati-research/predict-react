import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';

class RetrainResultTable extends PureComponent {
  constructor(props) {
    super(props);
  }
  getTable() {
    const headers = ['Matrix', 'Initial Result', 'Retrain Result'];
      return (
        <DataTable baseId="simple-pagination" selectableRows={false}>
        <TableHeader>
        <TableRow>
        {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
        </TableHeader>
         <TableBody>
         {Object.keys(this.props.initialResultValue).map(
            (value, index)=> (
            <TableRow key={index}>
                <TableColumn style={columnStyle}>{value}</TableColumn>
                <TableColumn style={columnStyle}>
                  {this.props.initialResultValue[value]}
                  </TableColumn>
                <TableColumn style={columnStyle}>
                  {this.props.retrainResultValue[value]}
                  </TableColumn>

           </TableRow>
             )
          )}
     </TableBody>
     </DataTable>
      );
  }
  render() {
      return <div>
       {this.getTable()}
       </div>;
    }
}

RetrainResultTable.propTypes = {
  initialResultValue: PropTypes.any,
  retrainResultValue: PropTypes.any,
};

export default RetrainResultTable;
