/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount, shallow} from 'enzyme';
import ClassConfigTable from '../../../components/validation/ClassConfigTable';
import {TableRow} from 'react-md/lib/DataTables/index';
import {TableColumn} from 'react-md';
import RegConfigTable from '../../../components/validation/RegConfigTable';
import ConfigTableCard from '../../../components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../../reference';
import {jobToConfigTable} from '../../../util/dataReducers';

const regJobs = [{
  'id': 53,
  'created_date': '2018-02-07T22:47:32.146583Z',
  'modified_date': '2018-02-07T22:47:32.149647Z',
  'config': {
    'prefix_length': 0,
    'encoding': 'simpleIndex',
    'clustering': 'noCluster',
    'method': 'linear'
  },
  'status': 'created',
  'result': {},
  'type': 'regression',
  'split': {
    'id': 1,
    'config': {},
    'original_log': {
      'id': 1,
      'name': 'general_example.xes'
    },
    'type': 'single',
    'test_log': null,
    'training_log': null
  },
  'error': ''
}];

const classJobs = [{
  'id': 52,
  'created_date': '2018-02-07T09:13:52.964154Z',
  'modified_date': '2018-02-07T09:13:52.964256Z',
  'config': {
    'rule': 'remaining_time',
    'prefix_length': 1,
    'threshold': 'default',
    'encoding': 'simpleIndex',
    'clustering': 'noCluster',
    'method': 'randomForest'
  },
  'status': 'created',
  'result': {},
  'type': 'classification',
  'split': {
    'id': 1,
    'config': {},
    'original_log': {
      'id': 1,
      'name': 'general_example.xes'
    },
    'type': 'single',
    'test_log': null,
    'training_log': null
  },
  'error': ''
}];

describe('ConfigTableCard', () => {
  const element = shallow(<ConfigTableCard jobs={[]} predictionMethod={CLASSIFICATION}/>);
  it('renders', () => {
    expect(element).toBeDefined();
  });

  it('renders classification table', () => {
    element.setProps({predictionMethod: CLASSIFICATION});
    expect(element.find(ClassConfigTable).length).toBe(1);
  });

  it('renders next activity table', () => {
    element.setProps({predictionMethod: NEXT_ACTIVITY});
    expect(element.find(RegConfigTable).length).toBe(1);
  });

  it('renders regression table', () => {
    element.setProps({predictionMethod: REGRESSION});
    expect(element.find(RegConfigTable).length).toBe(1);
  });
});

describe('ClassConfigTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<ClassConfigTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
    expect(element.find(TableColumn).length).toBe(10);
  });

  it('renders jobs if present', () => {
    const element = mount(<ClassConfigTable jobs={classJobs.map(jobToConfigTable)}/>);
    expect(element.find(TableRow).length).toBe(2);
    expect(element.text()).toMatch(/Encoding: simpleIndex/);
  });
});

describe('RegConfigTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<RegConfigTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
    expect(element.find(TableColumn).length).toBe(8);
  });

  it('renders jobs if present', () => {
    const element = mount(<RegConfigTable jobs={regJobs.map(jobToConfigTable)}/>);
    expect(element.find(TableRow).length).toBe(2);
    expect(element.text()).toMatch(/Encoding: simpleIndex/);
  });
});
