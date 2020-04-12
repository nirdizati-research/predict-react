import React from 'react';
import {shallow} from 'enzyme';
import RuntimeTable from '../../../components/runtime/RuntimeTable';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {jobs} from '../../../../stories/JobStatusTable';

describe('RuntimeTable Result Table', () => {
    it('renders', () => {
        const element = shallow(<RuntimeTable
                                    jobs={jobs}
                                    onRequestTraces={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(4);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(3);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(5);
        expect(element.find(TablePagination).length).toBe(1);
    });
});
