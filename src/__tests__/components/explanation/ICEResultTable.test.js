import React from 'react';
import {shallow} from 'enzyme';
import IceResultTable from '../../../components/explanation/IceResultTable';
import {getIceResultListTable} from '../../../util/dataReducers';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import {iceResultList} from '../../../../stories/Explanation';


const iceResult = getIceResultListTable(iceResultList);

describe('Ice result Table', () => {
    it('renders', () => {
        const element = shallow(<IceResultTable
                                    iceResultList={iceResult}/>);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(iceResult.length+1);
        expect(element.find(DataTable).at(0).find(TableHeader).find(TableRow).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(iceResult.length);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(3);
        expect(element.find(TablePagination).length).toBe(1);
    });
});
