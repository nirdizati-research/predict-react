/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {TableRow} from 'react-md/lib/DataTables/index';
import {TableColumn} from 'react-md';
import ConfigTable from '../../../components/validation/ConfigTable';
import ConfigTableCard from '../../../components/validation/ConfigTableCard';
import {CLASSIFICATION, LABELLING} from '../../../reference';
import {jobToValidationTable} from '../../../util/dataReducers';
import {label1} from '../../../../stories/Advanced';
import LabelConfigTable from '../../../components/validation/LabelConfigTable';

export const encoding1 = {
  'method': 'simpleIndex',
  'prefix_length': 1,
  'padding': 'zero_padding',
  'generation_type': 'only'
};

const regJobs = [{
  'id': 53,
  'created_date': '2018-02-07T22:47:32.146583Z',
  'modified_date': '2018-02-07T22:47:32.149647Z',
  'config': {
    'encoding': encoding1,
    'clustering': 'noCluster',
    'method': 'linear',
    'label': label1,
    'hyperopt': {
      'use_hyperopt': true,
      'max_evals': 100,
      'performance_metric': 'acc'
    },
    'regression.linear': {}
  },
  'status': 'created',
  'result': {},
  'type': 'regression',
  'split_id': 1,
  'error': ''
}];

const classJobs = [{
  'id': 52,
  'created_date': '2018-02-07T09:13:52.964154Z',
  'modified_date': '2018-02-07T09:13:52.964256Z',
  'config': {
    'encoding': encoding1,
    'clustering': 'noCluster',
    'method': 'randomForest',
    'label': label1,
    'hyperopt': {
      'use_hyperopt': true,
      'max_evals': 100,
      'performance_metric': 'acc'
    },
    'classification.randomForest': {}
  },
  'status': 'created',
  'result': {},
  'type': 'classification',
  'split_id': 1,
  'error': ''
}];

const labelJobs = [{
  'id': 52,
  'created_date': '2018-02-07T09:13:52.964154Z',
  'modified_date': '2018-02-07T09:13:52.964256Z',
  'config': {
    'encoding': encoding1,
    'label': label1,
  },
  'status': 'created',
  'result': {},
  'type': 'labelling',
  'split_id': 1,
  'error': ''
}];

describe('ConfigTableCard', () => {
  const element = shallow(<ConfigTableCard jobs={[]} predictionMethod={CLASSIFICATION} onClick={jest.fn()}/>);
  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(ConfigTable).length).toBe(0);
  });

  it('renders table', () => {
    element.setProps({jobs: classJobs});
    expect(element.find(ConfigTable).length).toBe(1);
    expect(element.find(LabelConfigTable).length).toBe(0);
  });

  it('renders labelling table', () => {
    element.setProps({predictionMethod: LABELLING, jobs: labelJobs});
    expect(element.find(ConfigTable).length).toBe(0);
    expect(element.find(LabelConfigTable).length).toBe(1);
  });
});

describe('ConfigTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<ConfigTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
    expect(element.find(TableColumn).length).toBe(12);
  });

  it('renders regression jobs if present', () => {
    const element = mount(<ConfigTable jobs={regJobs.map(jobToValidationTable)}/>);
    expect(element.find(TableRow).length).toBe(2);
    expect(element.text()).toMatch(/regression/);
  });

  it('renders classification jobs if present', () => {
    const element = mount(<ConfigTable jobs={classJobs.map(jobToValidationTable)}/>);
    expect(element.find(TableRow).length).toBe(2);
    expect(element.text()).toMatch(/classification/);
  });
});
