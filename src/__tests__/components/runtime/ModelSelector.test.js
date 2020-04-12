import React from 'react';
import {shallow} from 'enzyme';
import ModelSelector from '../../../components/runtime/ModelSelector';
import {SelectField, Button} from 'react-md';

let regressionList = ['reg1', 'reg2'];
let classificationList = ['clas1', 'clas2'];
let timeSeriesList = ['timeSeries1', 'timeSeries2'];

describe('Model Selector', () => {
    it('renders', () => {
        const element = shallow(<ModelSelector
                regModelsLabel={regressionList}
                classModelsLabel={classificationList}
                timeSeriesPredModelsLabel={timeSeriesList}
                modelChange={new function () {}}
                onSubmit={new function () {}}
                onReset={new function () {}}
                classJobId={new function () {}}
                regModelId={new function () {}}
                timeSeriesPredJobId={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(Button).length).toBe(2);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(2);
        expect(element.find(SelectField).at(1).props().menuItems.length).toBe(2);
        expect(element.find(SelectField).at(2).props().menuItems.length).toBe(2);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(regressionList);
        expect(element.find(SelectField).at(1).props().menuItems).toBe(classificationList);
        expect(element.find(SelectField).at(2).props().menuItems).toBe(timeSeriesList);
    });
});
