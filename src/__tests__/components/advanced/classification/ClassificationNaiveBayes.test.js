import React from 'react';
import {shallow} from 'enzyme';
import ClassificationNaiveBayes
    from '../../../../components/advanced/classification/ClassificationNaiveBayes';
import {TextField, Checkbox} from 'react-md';

const onChange = jest.fn();

describe('ClassificationNaiveBayes result', () => {
    it('Data loaded', () => {
        const element = shallow(<ClassificationNaiveBayes
            onChange={onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(1);
        expect(element.find(Checkbox).length).toBe(1);
    });
});
