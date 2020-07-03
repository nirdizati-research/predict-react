import React from 'react';
import {shallow} from 'enzyme';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import CfFeedbackResultTable from '../../../components/explanation/CfFeedbackResultTable';
import {cmFeedbackResult} from '../../../../stories/Explanation';
import {SelectField} from 'react-md';

const onSelectedMatrixChange = jest.fn();

describe('Cf feedback result Table', () => {
    it('renders', () => {
        const element = shallow(<CfFeedbackResultTable
                                    cfFeedbackResult={cmFeedbackResult[1]}
                                    onSelectedMatrixChange={onSelectedMatrixChange}
                                    selectedMatrix={'All'}
                                    />);
        expect(element).toBeDefined();
        expect(element.find(DataTable).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().defaultValue).toBe('All');

        expect(element.find(DataTable).at(0).find(TableRow).length).toBe(5);
        expect(element.find(DataTable).at(0).find(TableBody).find(TableRow).length).toBe(4);
        expect(element.find(DataTable).at(0).find(TableHeader)
            .find(TableColumn).length).toBe(3);
        expect(element.find(TablePagination).length).toBe(1);
    });
});
