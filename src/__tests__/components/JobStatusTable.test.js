import React from 'react';
import {shallow} from 'enzyme';
import JobStatusTable from '../../components/JobStatusTable';
import {TableRow} from 'react-md/lib/DataTables/index';

describe('JobStatusTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<JobStatusTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
  });

  it('renders jobs if present', () => {
    const jobs = [{
      id: 1,
      status: 'aa',
      modified_date: 'aa',
      config: {},
      split: {type: 'single', original_log: {name: 'name'}},
      created_date: 'aa',
      type: 'aa',
      error: ''
    }];
    const element = shallow(<JobStatusTable jobs={jobs}/>);
    expect(element.find(TableRow).length).toBe(2);
  });
});
