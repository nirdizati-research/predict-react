import React from 'react';
import {shallow} from 'enzyme';
import IncrementalTable from '../../../components/advanced/IncrementalTable';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {jobs} from '../../../../stories/JobStatusTable';


describe('IncrementalTable Result Table', () => {
    it('renders', () => {
        const element = shallow(<IncrementalTable
                                    jobs={jobs}
                                    onRequestTraces={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(4);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(3);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(9);
        expect(element.find(TablePagination).length).toBe(1);
    });
});
