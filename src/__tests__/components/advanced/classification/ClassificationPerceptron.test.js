import React from 'react';
import {shallow} from 'enzyme';
import ClassificationPerceptron
    from '../../../../components/advanced/classification/ClassificationPerceptron';
import {TextField, SelectField, Checkbox} from 'react-md';

const onChange = jest.fn();

describe('ClassificationPerceptron result', () => {
    it('Data loaded', () => {
        const element = shallow(<ClassificationPerceptron
            onChange={onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(6);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(Checkbox).length).toBe(3);
    });
});
