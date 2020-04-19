import React from 'react';
import {shallow} from 'enzyme';
import LogSelector from '../../../components/prediction/LogSelector';
import {SelectField} from 'react-md';
import FetchState from '../../../components/FetchState';

let labels = ['label1', 'label2'];
describe('Log Selector', () => {
    it('renders', () => {
        const element = shallow(<LogSelector
                splitLabels={labels}
                maxPLength={1}
                fetchState={[]}
                splitChange={new function () {}}
                selectedSplitId={1}
                />);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(FetchState).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(labels);
    });
});
