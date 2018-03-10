/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount} from 'enzyme';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../../reference';
import ResultTableCard from '../../../components/validation/ResultTableCard';
import ResultWrapper from '../../../components/validation/ResultWrapper';
import BubbleChartCard from '../../../components/chart/BubbleChartCard';

const classJobs = [
  {
    'id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'kmeans',
      'method': 'knn',
      'encoding': 'simpleIndex',
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default'
    },
    'status': 'completed',
    'result': {
      'f1score': 123,
      'acc': 111,
      'auc': 3
    },
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
  },
  {
    'id': 3,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'kmeans',
      'method': 'knn',
      'encoding': 'simpleIndex',
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default'
    },
    'status': 'completed',
    'result': {
      'f1score': 1230,
      'acc': 1110,
      'auc': 30
    },
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
  'result': {
    'mae': 11,
    'rmse': 12,
    'rscore': 13
  },
  'type': 'regression',
  'split': {
    'id': 1,
    'config': {
      'prefix_length': 2
    },
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
const classData = [
  ['1', 'knn_simpleIndex_kmeans_prefix_1', 123, 111, 3],
  ['3', 'knn_simpleIndex_kmeans_prefix_1', 1230, 1110, 30],
];

let element = null;
describe('ResultWrapper', () => {
  beforeEach(() => {
    element = mount(<ResultWrapper jobs={classJobs} predictionMethod={CLASSIFICATION}/>);
  });

  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(ResultTableCard).length).toBe(1);
    expect(element.find(BubbleChartCard).length).toBe(3);
  });

  it('shows only table if no data', () => {
    element.setProps({jobs: []});
    expect(element.find(ResultTableCard).length).toBe(1);
    expect(element.find(BubbleChartCard).length).toBe(0);
  });

  it('supplies data for classification', () => {
    expect(element.find(ResultTableCard).props().data).toEqual(classData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(CLASSIFICATION);
  });

  it('supplies data for regression', () => {
    element.setProps({predictionMethod: REGRESSION, jobs: regJobs});
    const regData = [['53', 'linear_simpleIndex_noCluster_prefix_0', 11, 12, 13]];
    expect(element.find(ResultTableCard).props().data).toEqual(regData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(REGRESSION);
  });

  it('renders next activity table', () => {
    element.setProps({predictionMethod: NEXT_ACTIVITY, jobs: classJobs});
    expect(element.find(ResultTableCard).props().data).toEqual(classData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(NEXT_ACTIVITY);
  });

  it('flips data for regression', () => {
    element.setProps({predictionMethod: REGRESSION, jobs: regJobs});
    const chart1 = [['53', 11, 12, 'linear', 13]];
    const chart2 = [['53', 11, 12, 'simpleIndex', 13]];
    const chart3 = [['53', 11, 12, 'noCluster', 13]];

    expect(element.find(BubbleChartCard).at(0).props().data).toEqual(chart1);
    expect(element.find(BubbleChartCard).at(0).props().hTitle).toBe('mae');
    expect(element.find(BubbleChartCard).at(0).props().vTitle).toBe('rmse');
    expect(element.find(BubbleChartCard).at(0).props().cardTitle).toBe('Bubble chart by regressor');

    expect(element.find(BubbleChartCard).at(1).props().data).toEqual(chart2);

    expect(element.find(BubbleChartCard).at(2).props().data).toEqual(chart3);
  });
});
