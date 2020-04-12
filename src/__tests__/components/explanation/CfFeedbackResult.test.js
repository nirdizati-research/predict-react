import React from 'react';
import {shallow} from 'enzyme';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import CfFeedbackResultTable from '../../../components/explanation/CfFeedbackResultTable';
import {cfFeedbackResult} from '../../../../stories/Explanation';
import {parseCfFeedbackResult} from '../../../util/dataReducers';

describe('Cf feedback result Table', () => {
    it('renders', () => {
        const element = shallow(<CfFeedbackResultTable
                                    cfFeedbackResult={parseCfFeedbackResult(cfFeedbackResult[1])}
                                    />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(5);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(4);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(2);
        expect(element.find(TablePagination).length).toBe(0);
    });
});
