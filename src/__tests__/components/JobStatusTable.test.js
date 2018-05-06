import React from 'react';
import {shallow} from 'enzyme';
import JobStatusTable from '../../components/JobStatusTable';
import {TableColumn, TableRow} from 'react-md/lib/DataTables/index';
import {label1} from '../../../stories/Advanced';
import {Button} from 'react-md/lib/Buttons/index';

const jobs = [{
  id: 1,
  status: 'aa',
  modified_date: 'aa',
  config: {
    'prefix_length': 1,
    'method': 'method',
    'encoding': 'simple_index',
    'padding': 'no_padding',
    'label': label1,
    'hyperopt': {
      'use_hyperopt': true,
      'max_evals': 100,
      'performance_metric': 'acc'
    },
  },
  splitName: 'name',
  split_id: 1,
  created_date: 'aa',
  type: 'classification',
  error: '',
  result: {}
}];

it('renders nothing without jobs', () => {
  const element = shallow(<JobStatusTable jobs={[]} showDeleteButton={false} onDelete={jest.fn()}/>);
  expect(element).toBeDefined();
  // Header row
  expect(element.find(TableRow).length).toBe(1);
  expect(element.find(TableColumn).length).toBe(8);
});

it('has delete button column', () => {
  const element = shallow(<JobStatusTable jobs={[]} showDeleteButton={true} onDelete={jest.fn()}/>);
  expect(element.find(TableColumn).length).toBe(9);
});

it('renders jobs if present', () => {
  const element = shallow(<JobStatusTable jobs={jobs} showDeleteButton={false} onDelete={jest.fn()}/>);
  expect(element.find(TableRow).length).toBe(2);
});

it('calls on delete when button pressed', () => {
  const onDelete = jest.fn();
  const element = shallow(<JobStatusTable jobs={jobs} showDeleteButton={true} onDelete={onDelete}/>);
  element.find(Button).at(0).simulate('click');

  expect(onDelete.mock.calls[0][0]).toEqual(1);
});

