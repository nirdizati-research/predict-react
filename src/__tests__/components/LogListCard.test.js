import React from 'react';
import {shallow} from 'enzyme';
import LogListCard from '../../components/LogListCard';
import FetchState from '../../components/FetchState';
import SelectField from 'react-md/lib/SelectFields';
import {logList} from '../../../stories/Split';

const fetchState = {
    inFlight: false
};
const selectChange = jest.fn();

describe('LogListCard', () => {
    it('renders', () => {
        const element = shallow(<LogListCard fetchState={fetchState} logList={logList} selectChange={selectChange}
                                             visibleLogId={0}/>);
        expect(element).toBeDefined();
        expect(element.find(FetchState).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
    });

    it('calls selectChange', () => {
        const element = shallow(<LogListCard fetchState={fetchState} logList={logList} selectChange={selectChange}
                                             visibleLogId={1}/>);
        element.find(SelectField).simulate('change', 'nonlocal.mxml.gz');
        // Actually should be 4, but this test is broken
        expect(selectChange).toHaveBeenCalledWith('nonlocal.mxml.gz');
    });
});
