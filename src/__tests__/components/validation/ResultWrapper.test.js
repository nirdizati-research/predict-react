/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount} from 'enzyme';
import {
  CLASSIFICATION,
  KMEANS, KNN, LINEAR,
  NO_CLUSTER,
  REGRESSION
} from '../../../reference';
import ResultTableCard from '../../../components/validation/ResultTableCard';
import ResultWrapper from '../../../components/validation/ResultWrapper';
import BubbleChartCard from '../../../components/chart/BubbleChartCard';
import {label1} from '../../../../stories/Advanced';
import {encoding1} from './ConfigTable.test';

const classJobs = [
  {
    'config': {
      'clustering': {'clustering_method': KMEANS},
      'encoding': encoding1,
      'evaluation': {
        'accuracy': 0.5435,
        'auc': 0.6667,
        'elapsed_time': '0.045728',
        'f1_score': 0.5158,
        'false_negative': 18,
        'false_positive': 3,
        'precision': 0.6,
        'recall': 0.5686,
        'true_negative': 18,
        'true_positive': 7
      },
      'hyperparameter_optimizer': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
      'incremental_train': null,
      'labelling': label1,
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': KNN,
        'predictive_model': CLASSIFICATION
      },
      'split': {
        'id': 1,
        'splitting_method': 'strict_temporal',
        'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
        'test_size': 0.2,
        'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
        'type': 'double'
      },
    },
    'created_date': '2019-06-05T13:51:55.034402Z',
    'error': '',
    'id': 1,
    'modified_date': '2019-06-05T13:52:24.902133Z',
    'status': 'completed',
    'type': 'prediction'
  },
  {
    'config': {
      'clustering': {'clustering_method': KMEANS},
      'encoding': encoding1,
      'evaluation': {
        'accuracy': 0.5435,
        'auc': 0.6667,
        'elapsed_time': '0.045728',
        'f1_score': 0.5158,
        'false_negative': 18,
        'false_positive': 3,
        'precision': 0.6,
        'recall': 0.5686,
        'true_negative': 18,
        'true_positive': 7
      },
      'hyperparameter_optimizer': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
      'incremental_train': null,
      'labelling': label1,
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': KNN,
        'predictive_model': CLASSIFICATION
      },
      'split': {
        'id': 1,
        'splitting_method': 'strict_temporal',
        'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
        'test_size': 0.2,
        'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
        'type': 'double'
      },
    },
    'created_date': '2019-06-05T13:51:55.034402Z',
    'error': '',
    'id': 3,
    'modified_date': '2019-06-05T13:52:24.902133Z',
    'status': 'completed',
    'type': 'prediction'
  }];

const regJobs = [
  {
    'config': {
      'clustering': {'clustering_method': NO_CLUSTER},
      'encoding': encoding1,
      'evaluation': {
        'mae': 11,
        'rmse': 12,
        'rscore': 13,
        'mape': 14
      },
      'hyperparameter_optimizer': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
      'incremental_train': null,
      'labelling': label1,
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': LINEAR,
        'predictive_model': REGRESSION
      },
      'split': {
        'id': 1,
        'splitting_method': 'strict_temporal',
        'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
        'test_size': 0.2,
        'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
        'type': 'double'
      },
    },
    'created_date': '2019-06-05T13:51:55.034402Z',
    'error': '',
    'id': 53,
    'modified_date': '2019-06-05T13:52:24.902133Z',
    'status': 'completed',
    'type': 'prediction'
  }];

const classData = [
  ['1', 'knn_simpleIndex_kmeans', 0.5158, 0.6667, 0.5435, '1', 0.6, 0.5686, 7, 18, 3, 18, '0.045728'],
  ['3', 'knn_simpleIndex_kmeans', 0.5158, 0.6667, 0.5435, '1', 0.6, 0.5686, 7, 18, 3, 18, '0.045728'],
];

let element = null;
describe('ResultWrapper', () => {
  beforeEach(() => {
    element = mount(<ResultWrapper jobs={classJobs} predictionMethod={CLASSIFICATION}/>);
  });

  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(ResultTableCard).length).toBe(1);
    expect(element.find(BubbleChartCard).length).toBe(4);
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
    const regData = [['53', 'linear_simpleIndex_noCluster', 11, 12, 14, '1', 13]];
    expect(element.find(ResultTableCard).props().data).toEqual(regData);
    expect(element.find(ResultTableCard).props().predictionMethod).toMatch(REGRESSION);
  });

  it('flips data for regression', () => {
    element.setProps({predictionMethod: REGRESSION, jobs: regJobs});
    const chart1 = [['53', 11, 12, 'linear', 14]];
    const chart2 = [['53', 11, 12, 'simpleIndex', 14]];
    const chart3 = [['53', 11, 12, 'noCluster', 14]];

    expect(element.find(BubbleChartCard).at(0).props().data).toEqual(chart1);
    expect(element.find(BubbleChartCard).at(0).props().hTitle).toBe('MAE');
    expect(element.find(BubbleChartCard).at(0).props().vTitle).toBe('RMSE');
    expect(element.find(BubbleChartCard).at(0).props().cardTitle).toBe('Bubble chart by regression method');

    expect(element.find(BubbleChartCard).at(1).props().data).toEqual(chart2);

    expect(element.find(BubbleChartCard).at(2).props().data).toEqual(chart3);
  });
});
