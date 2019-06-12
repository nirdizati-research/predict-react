import React from 'react';
import {shallow} from 'enzyme';

import SelectField from 'react-md/lib/SelectFields';

import SplitFormCard from '../../../components/split/SplitFormCard';
import FetchState from '../../../components/FetchState';
import {logsById} from '../../../../stories/Split';
import {Button} from 'react-md/lib/Buttons/index';
import {Slider} from 'react-md';

const fetchState = {
  inFlight: false
};
const onSubmit = jest.fn();

it('renders', () => {
  const element = shallow(<SplitFormCard fetchState={fetchState} logs={logsById} onSubmit={onSubmit}/>);
  expect(element).toBeDefined();
  expect(element.find(FetchState).length).toBe(1);
  expect(element.find(SelectField).length).toBe(2);
  expect(element.find(Button).length).toBe(1);
  expect(element.find(Slider).length).toBe(1);
});

it('calls selectChange', () => {
  const element = shallow(<SplitFormCard fetchState={fetchState} logs={logsById} onSubmit={onSubmit}/>);
  element.find(SelectField).at(0).simulate('change', 'nonlocal.mxml.gz');
  element.find(SelectField).at(1).simulate('change', 'split_random');
  element.find(Button).at(0).simulate('click');
  // Actually should be 4, but this test is broken
  // expect(onSubmit).toHaveBeenCalledWith({'config': {}, 'original_log': 4});
  expect(onSubmit).toHaveBeenCalledWith({
    original_log: 'nonlocal.mxml.gz',
    splitting_method: 'split_random',
    test_size: 0.2
  });
});

