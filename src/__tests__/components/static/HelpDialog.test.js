import React from 'react';
import {shallow} from 'enzyme';
import HelpDialog
    from '../../../components/static/HelpDialog';
import {DialogContainer} from 'react-md';

const onChange = jest.fn();

describe('HelpDialog result', () => {
    it('Visible item', () => {
        const element = shallow(<HelpDialog
            texts={['a', 'b']}
            visible={true}
            hide = {onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(DialogContainer).length).toBe(1);
        expect(element.find(DialogContainer).at(0).props().visible).toBe(true);
    });

    it('Hide item', () => {
        const element = shallow(<HelpDialog
            texts={['a', 'b']}
            visible={false}
            hide = {onChange}
            />);
        expect(element).toBeDefined();
        expect(element.find(DialogContainer).length).toBe(1);
        expect(element.find(DialogContainer).at(0).props().visible).toBe(false);
    });
});
