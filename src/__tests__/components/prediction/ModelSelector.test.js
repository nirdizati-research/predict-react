import React from 'react';
import {shallow} from 'enzyme';
import ModelSelector from '../../../components/prediction/ModelSelector';
import {Button} from 'react-md';
import {jobs} from '../../../../stories/JobStatusTable';
import IncrementalTable from '../../../components/advanced/IncrementalTable';


describe('Model Selector', () => {
    it('renders', () => {
        const element = shallow(<ModelSelector
                jobs={jobs}
                onClickCheckbox={new function () {}}
                onSubmit={new function () {}}
                onReset={new function () {}}
                />);
        expect(element).toBeDefined();
        expect(element.find(IncrementalTable).length).toBe(1);
        expect(element.find(Button).length).toBe(2);
    });
});
