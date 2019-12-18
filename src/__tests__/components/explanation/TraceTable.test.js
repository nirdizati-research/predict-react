import React from 'react';
import {shallow} from 'enzyme';
import TraceTable from '../../../components/explanation/TraceTable';
import {getTraceAttributes} from '../../../util/dataReducers';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {traceList} from '../../../../stories/Explanation';


const traceAttributes = getTraceAttributes(traceList, '00000912');
const traceAttributesHeader = traceAttributes.traceAttributesHeader;
const traceEventsHeaders = traceAttributes.traceEventsHeaders;
const traceArr = traceAttributes.traceArr;

describe('TraceTable', () => {
    it('renders', () => {
        const element = shallow(<TraceTable
                                    traceAttributesHeader={traceAttributesHeader}
                                    traceEventsHeaders={traceEventsHeaders}
                                    traceArr={traceArr} />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(2);

        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(2);
        expect(element.find(DataTable).at(0).find(TableHeader).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow)
            .find(TableColumn).length).toBe(traceAttributesHeader.length);

        expect(element.find(DataTable).at(1).find(TableRow).length).toBe(3);
        expect(element.find(DataTable).at(1).find(TableHeader).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(1).find(TableBody).find(TableRow).length).toBe(2);
        expect(element.find(DataTable).at(1).find(TableBody).find(TableRow)
            .find(TableColumn).length).toBe(traceEventsHeaders.length * 2);

        expect(element.find(TableRow).length).toBe(5);
        expect(element.find(TablePagination).length).toBe(1);
    });

    it('no element', () => {
        const element = shallow(<TraceTable
                                    traceAttributesHeader={traceAttributesHeader}
                                    traceEventsHeaders={traceEventsHeaders}
                                    traceArr={{'attributes': [], 'events': []}} />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(0);
        expect(element.find(TablePagination).length).toBe(0);
        expect(element.find(TableRow).length).toBe(0);
    });
});
