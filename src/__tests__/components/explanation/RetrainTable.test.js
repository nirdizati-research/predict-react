import React from 'react';
import {shallow} from 'enzyme';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {retrainResult} from '../../../../stories/Explanation';
import RetrainResultTable from '../../../components/explanation/RetrainResultTable';

describe('Retrain result Table', () => {
    it('renders', () => {
        const element = shallow(<RetrainResultTable
                            initialResultValue={retrainResult[1]['Initial result']}
                            retrainResultValue={retrainResult[1]['Retrain result']}
                                    />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(6);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(5);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(3);
        expect(element.find(TablePagination).length).toBe(0);
    });
});
