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
      uuid: 'aa',
      status: 'aa',
      run: 'aa',
      log: 'aa',
      timestamp: 'aa',
      prefix: 0,
      rule: 'aa',
      threshold: 0,
      type: 'aa'
    }];
    const element = shallow(<JobStatusTable jobs={jobs}/>);
    expect(element.find(TableRow).length).toBe(2);
  });
});
