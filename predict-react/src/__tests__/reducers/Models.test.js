/**
 * Created by tonis.kasekamp on 02/07/18.
 */

import models from '../../reducers/Models';
import {
  modelsRequested,
  modelsRetrieved,
  modelsFailed,
} from '../../actions/ModelActions';

const modelList = [{
    id: 1,
    created_date: '2018-04-13T13:42:31.652000Z',
    modified_date: '2018-05-07T09:32:08.777685Z',
    split_id: 1,
    config: {
      'create_models': false,
      'hyperopt': {
        use_hyperopt: false,
        max_evals: 10,
        performance_metric: 'acc'
      },
      'label': {
        type: 'remaining_time',
        attribute_name: '',
        threshold_type: 'threshold_mean',
        threshold: 0,
        add_remaining_time: false,
        add_elapsed_time: false
      },
      'prefix_length': 1,
      'classification.knn': {
        n_neighbors: 2,
        weights: 'distance'
      },
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'knn'
    },
    status: 'completed',
    result: {
      f1score: 0,
      acc: 0.5,
      true_positive: 0,
      true_negative: 1,
      false_negative: 1,
      false_positive: 0,
      precision: 0,
      recall: 0,
      auc: 0.5
    },
    type: 'classification',
    error: ''
  }];

const initState = {fetchState: {inFlight: false}, logId: 0, regselected: 0,
              classelected: 0, models: [], regressionModels: [], classificationModels: [], pLength: 0};

describe('ModelList', () => {
  it('has nothing initially', () => {
    expect(models(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = models(undefined, modelsRequested());
    expect(state).toEqual({classelected: 0, classificationModels: [],
    fetchState: {inFlight: true}, logId: 0, models: [],
    regressionModels: [], regselected: 0, pLength: 0});
  });

  it('adds splits when request completed', () => {
    const state = models(undefined, modelsRequested());
    const state2 = models(state, modelsRetrieved(modelList));
    expect(state2.fetchState).toEqual({inFlight: false});
    expect(Object.keys(state2.models).length).toEqual(1);
    expect(state2.models[0].type).toBe('classification');
  });

  it('stores error message', () => {
    const state = models(undefined, modelsRequested());
    const state2 = models(state, modelsFailed('error'));
    expect(state2).toEqual({classelected: 0, classificationModels: [],
     fetchState: {error: 'error', inFlight: false}, logId: 0, models: [],
     regressionModels: [], regselected: 0, pLength: 0});
   });
});
