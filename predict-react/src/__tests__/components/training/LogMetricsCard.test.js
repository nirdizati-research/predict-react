import React from 'react';
import {shallow} from 'enzyme';
import LogMetricsCard from '../../../components/training/LogMetricsCard';
import {log} from '../../../../stories/Logs';

let element;
beforeEach(() => {
  element = shallow(<LogMetricsCard log={log}/>);
});

it('renders', () => {
  expect(element).toBeDefined();
});
