import React from 'react';
import {shallow} from 'enzyme';
import {SelectField} from 'react-md';
import {label1} from '../../../../stories/Advanced';
import {
    ATTRIBUTE_NUMBER,
    ATTRIBUTE_STRING,
    CLASSIFICATION,
    DURATION,
    NEXT_ACTIVITY,
    REGRESSION,
    THRESHOLD_MEAN
} from '../../../reference';
import LabelControls from '../../../components/Labelling/LabelControls';

const onChange = jest.fn();

const filterOptions = {
    labelling: {type: DURATION, threshold_type: THRESHOLD_MEAN},
    thresholds: [1, 3, 4],
    attributeNames: ['name', 'name2']
};


describe('Regression', () => {
    const method = REGRESSION;
    it('remaining time', () => {
        const element = shallow(<LabelControls {...filterOptions} label={{...label1, type: DURATION}}
                                               labelChange={onChange}
                                               predictionMethod={method}/>).first();

        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(2);
    });

    it('number atr', () => {
        const element = shallow(<LabelControls predictionMethod={method} {...filterOptions}
                                               label={{...label1, type: ATTRIBUTE_NUMBER}}
                                               labelChange={onChange}/>).first();

        expect(element.find(SelectField).length).toBe(1);
    });
});

describe('class or label', () => {
    const method = CLASSIFICATION;
    it('duration', () => {
        const element = shallow(<LabelControls predictionMethod={method} {...filterOptions}
                                               labelChange={onChange}/>).first();

        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(4);
    });

    it('number atr', () => {
        const element = shallow(<LabelControls {...filterOptions} label={{...label1, type: ATTRIBUTE_NUMBER}}
                                               predictionMethod={method} labelChange={onChange}/>).first();

        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(4);
        expect(element.find(SelectField).at(1).props().menuItems.length).toBe(2);
        expect(element.find(SelectField).at(2).props().menuItems.length).toBe(3);
    });

    it('string atr', () => {
        const element = shallow(<LabelControls {...filterOptions} label={{...label1, type: ATTRIBUTE_STRING}}
                                               predictionMethod={method} labelChange={onChange}/>).first();

        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(SelectField).at(1).props().menuItems.length).toBe(2);
    });

    it('next activity', () => {
        const element = shallow(<LabelControls {...filterOptions} predictionMethod={method}
                                               label={{...label1, type: NEXT_ACTIVITY}}
                                               labelChange={onChange}/>).first();

        expect(element.find(SelectField).length).toBe(3);
    });
});
