import React from 'react';
import {shallow} from 'enzyme';
import ClassificationNN
    from '../../../../components/advanced/classification/ClassificationNN';
import {TextField, SelectField} from 'react-md';

const onChange = jest.fn();

describe('Classification Hoeffding tree result', () => {
    it('Data loaded', () => {
        const element = shallow(<ClassificationNN
            onChange={onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(4);
        expect(element.find(SelectField).length).toBe(1);
    });
});
