import React from 'react';
import {shallow} from 'enzyme';
import ClassificationHoeffdingTree
    from '../../../../components/advanced/classification/ClassificationHoeffdingTree';
import {TextField, SelectField, Checkbox} from 'react-md';

const onChange = jest.fn();

describe('Classification Hoeffding tree result', () => {
    it('Data loaded', () => {
        const element = shallow(<ClassificationHoeffdingTree
            onChange={onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(4);
        expect(element.find(SelectField).length).toBe(2);
        expect(element.find(Checkbox).length).toBe(4);
    });
});
