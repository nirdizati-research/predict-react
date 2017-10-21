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
    'status': 'completed',
    'run': 'KNN_simpleIndex_Kmeans',
    'log': 'test_bpi12_sorted.xes',
    'timestamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': 0,
    'uuid': 'uuuuuuuuuuuuu',
    'threshold': '2592000',
    'type': 'Classification',
    'result': {
      'uuid': 'uuuuuuuuuuuuu',
      'fmeasure': 123,
      'acc': 111,
      'auc': 3
    }
  },
  {
    'status': 'completed',
    'run': 'KNN_simpleIndex_Kmeans',
    'log': 'test_bpi12_sorted2.xes',
    'timestamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': 0,
    'uuid': 'uuuuuuuuuuuuu2',
    'threshold': '2592000',
    'type': 'Classification',
    'result': {
      'uuid': 'uuuuuuuuuuuuu2',
      'fmeasure': 1230,
      'acc': 1110,
      'auc': 30
    }
  }];
const regJobs = [
  {
    'clustering': 'None',
    'status': 'completed',
    'run': 'linear_simpleIndex_None',
    'log': 'Production.xes',
    'encoding': 'simpleIndex',
    'timestamp': 'Oct 09 2017 12:44:42',
    'prefix': 0,
    'type': 'Regression',
    'regression': 'linear',
    'uuid': '82f9bf59-a15c-4b83-91af-9e1f714b9976',
    'result': {
      'uuid': '82f9bf59-a15c-4b83-91af-9e1f714b9976',
      'mae': 11,
      'rmse': 12,
      'rscore': 13
    }
  }];


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
    const classData = [
      ['uuuuuuu', 'KNN_simpleIndex_Kmeans', 123, 111, 3],
      ['uuuuuuu', 'KNN_simpleIndex_Kmeans', 1230, 1110, 30],
    ];
    expect(element.find(ResultTableCard).props().data).toEqual(classData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(CLASSIFICATION);
  });

  it('supplies data for regression', () => {
    element.setProps({predictionMethod: REGRESSION, jobs: regJobs});
    const regData = [['82f9bf5', 'linear_simpleIndex_None', 11, 12, 13]];
    expect(element.find(ResultTableCard).props().data).toEqual(regData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(REGRESSION);
  });

  it('renders next activity table', () => {
    element.setProps({predictionMethod: NEXT_ACTIVITY, jobs: regJobs});
    const regData = [['82f9bf5', 'linear_simpleIndex_None', 11, 12, 13]];
    expect(element.find(ResultTableCard).props().data).toEqual(regData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(NEXT_ACTIVITY);
  });

  it('flips data for regression', () => {
    element.setProps({predictionMethod: REGRESSION, jobs: regJobs});
    const chart1 = [['82f9bf5', 11, 12, 'linear', 13]];
    const chart2 = [['82f9bf5', 11, 12, 'simpleIndex', 13]];
    const chart3 = [['82f9bf5', 11, 12, 'None', 13]];

    expect(element.find(BubbleChartCard).at(0).props().data).toEqual(chart1);
    expect(element.find(BubbleChartCard).at(0).props().hTitle).toBe('mae');
    expect(element.find(BubbleChartCard).at(0).props().vTitle).toBe('rmse');
    expect(element.find(BubbleChartCard).at(0).props().cardTitle).toBe('Bubble chart by regressor');

    expect(element.find(BubbleChartCard).at(1).props().data).toEqual(chart2);

    expect(element.find(BubbleChartCard).at(2).props().data).toEqual(chart3);
  });
});
