/**
 * Created by tonis.kasekamp on 02/07/18.
 */

import models from '../../reducers/Models';
import {modelsFailed, modelsRequested, modelsRetrieved} from '../../actions/ModelActions';
import {
    CLASSIFICATION,
    KNN,
    NO_CLUSTER,
    ONLY_THIS,
    REMAINING_TIME,
    SIMPLE_INDEX,
    THRESHOLD_MEAN
} from '../../reference';

const modelList = [
     {
    config: {
      clustering: {clustering_method: NO_CLUSTER},
      encoding: {
        add_elapsed_time: false,
        add_executed_events: false,
        add_new_traces: false,
        add_remaining_time: false,
        add_resources_used: false,
        data_encoding: 'label_encoder',
        features: ['prefix_1', 'prefix_2', 'label'],
        padding: false,
        prefix_length: 2,
        task_generation_type: ONLY_THIS,
        value_encoding: SIMPLE_INDEX
      },
      evaluation: {
        accuracy: 0.5435,
        auc: 0.6667,
        elapsed_time: '0.045728',
        f1_score: 0.5158,
        false_negative: 18,
        false_positive: 3,
        precision: 0.6,
        recall: 0.5686,
        true_negative: 18,
        true_positive: 7
      },
      hyperparameter_optimizer: {
          use_hyperopt: false,
          max_evals: 10,
          performance_metric: 'acc'
      },
      incremental_train: null,
      labelling: {
        results: {},
        threshold: 0,
        threshold_type: THRESHOLD_MEAN,
        type: REMAINING_TIME
      },
      predictive_model: {
        model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        prediction_method: KNN,
        predictive_model: CLASSIFICATION
      },
      split: {
        id: 1,
        splitting_method: 'strict_temporal',
        test_log_path: 'cache/log_cache/80-100_1559742742743335.xes',
        test_size: 0.2,
        train_log_path: 'cache/log_cache/0-80_1559742738260318.xes',
        type: 'double'
      },
    },
    created_date: '2018-04-13T13:42:31.652000Z',
    error: '',
    id: 2,
    modified_date: '2018-05-07T09:32:08.777685Z',
    status: 'completed',
    type: 'prediction'
  }];

const initState = {fetchState: {inFlight: false}, logId: 0, jobSelected: [],
    models: [], regressionModels: [], classificationModels: [],
    timeSeriesPredictionModels: [], pLength: 0
};

describe('ModelList', () => {
  it('has nothing initially', () => {
    expect(models(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = models(undefined, modelsRequested());
    expect(state).toEqual({jobSelected: [], classificationModels: [],
    fetchState: {inFlight: true}, logId: 0, models: [],
        regressionModels: [], pLength: 0, timeSeriesPredictionModels: []
    });
  });

  it('adds splits when request completed', () => {
    const state = models(undefined, modelsRequested());
    const state2 = models(state, modelsRetrieved(modelList));
    expect(state2.fetchState).toEqual({inFlight: false});
    expect(Object.keys(state2.models).length).toEqual(1);
    expect(state2.models[0].type).toBe('prediction');
    expect(state2.models[0].config.predictive_model.predictive_model).toBe('classification');
  });

  it('stores error message', () => {
    const state = models(undefined, modelsRequested());
    const state2 = models(state, modelsFailed('error'));
    expect(state2).toEqual({classificationModels: [],
     fetchState: {error: 'error', inFlight: false}, logId: 0, models: [],
        regressionModels: [], jobSelected: [], pLength: 0,
        timeSeriesPredictionModels: []
    });
   });
});
