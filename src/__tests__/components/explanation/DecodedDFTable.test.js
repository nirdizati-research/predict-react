import React from 'react';
import {shallow} from 'enzyme';
import DecodedDFTable from '../../../components/explanation/DecodedDFTable';
import {getDecodedDFTable} from '../../../util/dataReducers';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {decodedDFResultList} from '../../../../stories/Explanation';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';


const decodedDFResult = getDecodedDFTable(decodedDFResultList);

describe('Dedocded DF Table', () => {
    it('renders', () => {
        const element = shallow(<DecodedDFTable
                                    values={decodedDFResult.data}
                                    headers={decodedDFResult.headers}
                                    isDecodedValueLoaded={true}
                                    jobId={50} />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(decodedDFResult.data.length+1);
        expect(element.find(DataTable).at(0).find(TableHeader).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(decodedDFResult.data.length);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(decodedDFResult.headers.length);
        expect(element.find(TablePagination).length).toBe(1);
    });

    it('no element', () => {
        const element = shallow(<DecodedDFTable
                                    values={[]}
                                    headers={[]}
                                    isDecodedValueLoaded={false}
                                    jobId={50} />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(0);
        expect(element.find(TablePagination).length).toBe(0);
        expect(element.find(TableRow).length).toBe(0);
        expect(element.find(CircularProgress).length).toBe(1);
    });
});
