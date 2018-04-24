import React from 'react';
import {shallow} from 'enzyme';
import JobStatusTable from '../../components/JobStatusTable';
import {TableRow} from 'react-md/lib/DataTables/index';
import {label1} from '../../../stories/Advanced';

describe('JobStatusTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<JobStatusTable jobs={[]} showDeleteButton={false} onDelete={jest.fn()}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
  });

  it('renders jobs if present', () => {
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
      split: {type: 'single', original_log: {name: 'name'}},
      created_date: 'aa',
      type: 'classification',
      error: '',
      result: {}
    }];
    const element = shallow(<JobStatusTable jobs={jobs} showDeleteButton={false} onDelete={jest.fn()}/>);
    expect(element.find(TableRow).length).toBe(2);
  });
});
