import React from 'react';
import {shallow} from 'enzyme';
import SelectField from 'react-md/lib/SelectFields';
import TraceExplanation from '../../../components/explanation/TraceExplanation';
import TraceTable from '../../../components/explanation/TraceTable';
import {traceList} from '../../../../stories/Explanation';

const traceIdList = ['1', '2'];
const jobs = [];
const traceChange = jest.fn();
describe('TraceExplanation', () => {
    it('renders', () => {
        const element = shallow(<TraceExplanation jobs={jobs}
                                                        traceChange={traceChange}
                                                        traceIdList={traceIdList}
                                                        selectedTrace={'1'}
                                                        traceList={traceList}/>);
        expect(element).toBeDefined();
        expect(element.find(TraceTable).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(traceIdList.length);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(traceIdList);
    });

    it('call select trace change', () => {
        const element = shallow(<TraceExplanation jobs={jobs}
                                                        traceChange={traceChange}
                                                        traceIdList={traceIdList}
                                                        selectedTrace={'1'}
                                                        traceList={traceList}/>);
        element.find(SelectField).at(0).simulate('change', '2');
        expect(traceChange).toHaveBeenCalledWith('2');
    });
});
