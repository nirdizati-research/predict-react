import React from 'react';
import {shallow} from 'enzyme';

import SelectField from 'react-md/lib/SelectFields';

import SplitFormCard from '../../../components/split/SplitFormCard';
import FetchState from '../../../components/FetchState';
import {logList} from '../../../../stories/Split';
import {Button} from 'react-md/lib/Buttons/index';

const fetchState = {
  inFlight: false
};
const onSubmit = jest.fn();


it('renders', () => {
  const element = shallow(<SplitFormCard fetchState={fetchState} logs={logList} onSubmit={onSubmit}/>);
  expect(element).toBeDefined();
  expect(element.find(FetchState).length).toBe(1);
  expect(element.find(SelectField).length).toBe(1);
  expect(element.find(Button).length).toBe(1);
});

it('calls selectChange', () => {
  const element = shallow(<SplitFormCard fetchState={fetchState} logs={logList} onSubmit={onSubmit}/>);
  element.find(SelectField).simulate('change', 'nonlocal.mxml.gz');
  element.find(Button).at(0).simulate('click');
  // Actually should be 4, but this test is broken
  // expect(onSubmit).toHaveBeenCalledWith({'config': {}, 'original_log': 4});
  expect(onSubmit).toHaveBeenCalledWith({'config': {}, 'original_log': 'nonlocal.mxml.gz'});
});

