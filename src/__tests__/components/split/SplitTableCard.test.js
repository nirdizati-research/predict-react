import React from 'react';
import {shallow} from 'enzyme';
import {TableRow} from 'react-md/lib/DataTables/index';
import SplitTableCard from '../../../components/split/SplitTableCard';
import {splits} from '../../../../stories/Split';

it('renders nothing without splits', () => {
  const element = shallow(<SplitTableCard splits={[]}/>);
  expect(element).toBeDefined();
  // Header row
  expect(element.find(TableRow).length).toBe(1);
});

it('renders splits if present', () => {
  const element = shallow(<SplitTableCard splits={splits}/>);
  expect(element.find(TableRow).length).toBe(3);
});
