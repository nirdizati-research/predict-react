import React from 'react';
import {shallow} from 'enzyme';
import ClassificationSGDClassifier
    from '../../../../components/advanced/classification/ClassificationSGDClassifier';
import {TextField, SelectField, Checkbox} from 'react-md';

const onChange = jest.fn();

describe('ClassificationSGDClassifier result', () => {
    it('Data loaded', () => {
        const element = shallow(<ClassificationSGDClassifier
            onChange={onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(9);
        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(Checkbox).length).toBe(3);
    });
});
