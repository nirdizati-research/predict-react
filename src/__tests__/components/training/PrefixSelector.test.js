import React from 'react';
import {shallow} from 'enzyme';
import PrefixSelector from '../../../components/training/PrefixSelector';
import {SelectionControlGroup, TextField} from 'react-md';

let element;
let onChange;
beforeEach(() => {
  onChange = jest.fn();
  element = shallow(<PrefixSelector onChange={onChange} maxEventsInLog={123}
                                    prefix={{prefix_length: 1, padding: 'no_padding', type: 'up_to'}}/>);
});

it('renders', () => {
  expect(element).toBeDefined();
  expect(element.find(SelectionControlGroup).length).toBe(2);
  expect(element.find(TextField).length).toBe(1);
  expect(element.find('.md-cell--4').length).toBe(1);
});


it('is label form', () => {
  element.setProps({isLabelForm: true});
  expect(element).toBeDefined();
  expect(element.find('.md-cell--3').length).toBe(4);
});

it('calls on change', () => {
  element.find(TextField).simulate('change', '23');
  expect(onChange.mock.calls[0][0]).toEqual({'isNumber': true, 'key': 'prefix_length', 'methodConfig': 'prefix'});
  expect(onChange.mock.calls[0][1]).toEqual('23');
});

it('shows error for high prefix', () => {
  element.find(TextField).simulate('change', '222');
  expect(element.state().error).toBe(true);
});
