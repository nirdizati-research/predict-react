import React from 'react';
import {shallow} from 'enzyme';
import RunningTasksLabel from '../../components/RunningTasksLabel';

it('renders nothing when no tasks running', () => {
  const props = {
    haveRunning: false,
    runningCount: 0,
    totalCount: 0
  };
  const element = shallow(<RunningTasksLabel {...props}/>);
  expect(element).toBeDefined();
  expect(element.get(0)).toBeNull();
});

it('renders numbers when running', () => {
  const props = {
    haveRunning: true,
    runningCount: 2,
    totalCount: 3
  };
  const element = shallow(<RunningTasksLabel {...props}/>);
  expect(element.text()).toMatch('2 / 3');
});
