import React from 'react';
import {shallow} from 'enzyme';
import ResultTable from '../../../components/prediction/ResultTable';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';

describe('Result Table', () => {
    it('renders', () => {
        const element = shallow(<ResultTable
                                    jobs={[]}
                                    onRequestJobs={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(0);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(9);
        expect(element.find(TablePagination).length).toBe(1);
    });
});
