import React from 'react';
import {shallow} from 'enzyme';
import {TableColumn, TableRow} from 'react-md/lib/DataTables/index';
import LabelConfigTable from '../../../components/validation/LabelConfigTable';
import {label1} from '../../../../stories/Advanced';

const jobs = [{
  id: 1,
  label: label1,
  encoding: 'asd',
  padding: 'adasd',
  prefix_length: 2,
  splitName: 'name',
  split_id: 1,
  type: 'labelling',
  result: {}
}];

it('renders nothing without jobs', () => {
  const element = shallow(<LabelConfigTable jobs={[]} onClick={jest.fn()}/>);
  expect(element).toBeDefined();
  // Header row
  expect(element.find(TableRow).length).toBe(1);
  expect(element.find(TableColumn).length).toBe(8);
});

it('renders jobs if present', () => {
  const element = shallow(<LabelConfigTable jobs={jobs} onClick={jest.fn()}/>);
  expect(element.find(TableRow).length).toBe(2);
});

it('calls on delete when button pressed', () => {
  const onClick = jest.fn();
  const element = shallow(<LabelConfigTable jobs={jobs} showDeleteButton={true} onClick={onClick}/>);
  element.find(TableRow).at(1).simulate('click');

  expect(onClick.mock.calls[0][0]).toEqual(1);
});

