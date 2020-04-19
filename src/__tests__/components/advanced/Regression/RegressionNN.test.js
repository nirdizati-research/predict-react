import React from 'react';
import {shallow} from 'enzyme';
import RegressionNN
    from '../../../../components/advanced/regression/RegressionNN';
import {TextField, SelectField} from 'react-md';

const onChange = jest.fn();

describe('RegressionNN result', () => {
    it('Data loaded', () => {
        const element = shallow(<RegressionNN
            onChange={onChange}
            />);

        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(4);
        expect(element.find(SelectField).length).toBe(1);
    });
});
