import React from 'react';
import {shallow} from 'enzyme';
import Checkbox
    from '../../../components/advanced/Checkbox';
const onChange = jest.fn();

describe('IncrementalTable Result Table', () => {
    it('renders', () => {
        const element = shallow(<Checkbox
            label={'Laabel'}
            handleCheckboxChange = {onChange}/>);
        expect(element).toBeDefined();
    });
});

