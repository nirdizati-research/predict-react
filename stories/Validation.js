/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {
    CLASSIFICATION,
    DURATION, KMEANS,
    LABELLING, LASSO, NO_CLUSTER,
    NO_PADDING, ONLY_THIS, RANDOM_FOREST,
    REGRESSION, REMAINING_TIME, RNN, SIMPLE_INDEX,
    THRESHOLD_MEAN,
    TIME_SERIES_PREDICTION
} from '../src/reference';
import ResultWrapper from '../src/components/validation/ResultWrapper';
import LabellingHeaderCard from '../src/components/Labelling/LabellingHeaderCard';

const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
export const classJobs = [
    {
    'config': {
      'clustering': {'clustering_method': KMEANS},
      'encoding': {
        'add_elapsed_time': false,
        'add_executed_events': false,
        'add_new_traces': false,
        'add_remaining_time': false,
        'add_resources_used': false,
        'data_encoding': 'label_encoder',
        'features': ['prefix_1', 'label'],
        'padding': false,
        'prefix_length': 1,
        'task_generation_type': ONLY_THIS,
        'value_encoding': SIMPLE_INDEX
      },
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
      'labelling': {
        'results': {},
        'type': REMAINING_TIME,
        'attribute_name': null,
        'threshold_type': THRESHOLD_MEAN,
        'threshold': 0
      },
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': RANDOM_FOREST,
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
    'created_date': '2017-11-14T20:52:36.469000Z',
    'error': '',
    'id': 1,
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'status': 'completed',
    'type': 'prediction'
  },
    {
    'config': {
      'clustering': {'clustering_method': NO_CLUSTER},
      'encoding': {
        'add_elapsed_time': false,
        'add_executed_events': false,
        'add_new_traces': false,
        'add_remaining_time': false,
        'add_resources_used': false,
        'data_encoding': 'label_encoder',
        'features': ['prefix_1', 'prefix_2', 'prefix_3', 'label'],
        'padding': false,
        'prefix_length': 3,
        'task_generation_type': ONLY_THIS,
        'value_encoding': SIMPLE_INDEX
      },
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
          'use_hyperopt': false,
          'max_evals': 100,
          'performance_metric': 'acc'
      },
      'incremental_train': null,
      'labelling': {
        'results': {},
        'type': REMAINING_TIME,
        'attribute_name': null,
        'threshold_type': THRESHOLD_MEAN,
        'threshold': 0
      },
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': RANDOM_FOREST,
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
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'error': '',
    'id': 3,
    'status': 'completed',
    'type': 'prediction'
  }];

export const timeSeriesPredJobs = [

    {
    'config': {
      'clustering': {'clustering_method': KMEANS},
      'encoding': {
        'add_elapsed_time': false,
        'add_executed_events': false,
        'add_new_traces': false,
        'add_remaining_time': false,
        'add_resources_used': false,
        'data_encoding': 'label_encoder',
        'features': ['prefix_1', 'prefix_2', 'prefix_3', 'label'],
        'padding': false,
        'prefix_length': 3,
        'task_generation_type': ONLY_THIS,
        'value_encoding': SIMPLE_INDEX
      },
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
      'labelling': {
        'results': {},
        'type': REMAINING_TIME,
        'attribute_name': null,
        'threshold_type': THRESHOLD_MEAN,
        'threshold': 0
      },
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': RNN,
        'predictive_model': TIME_SERIES_PREDICTION
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
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'error': '',
    'id': 3,
    'status': 'completed',
    'type': 'prediction'
  }];

const regJobs = [
      {
    'config': {
      'clustering': {'clustering_method': NO_CLUSTER},
      'encoding': {
        'add_elapsed_time': false,
        'add_executed_events': false,
        'add_new_traces': false,
        'add_remaining_time': false,
        'add_resources_used': false,
        'data_encoding': 'label_encoder',
        'features': ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'prefix_5', 'prefix_6', 'prefix_7', 'prefix_8',
            'prefix_8', 'prefix_9', 'prefix_10', 'prefix_11', 'prefix_12', 'prefix_13', 'prefix_14', 'prefix_15',
            'prefix_16', 'label'],
        'padding': false,
        'prefix_length': 16,
        'task_generation_type': ONLY_THIS,
        'value_encoding': SIMPLE_INDEX
      },
      'evaluation': {
        'rmse': 1316.1386475352517,
            'mae': 933.93803112935666,
            'rscore': -0.10448018564371164,
            'mape': 50.34
      },
      'hyperparameter_optimizer': {
          'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'rmse'
      },
      'incremental_train': null,
      'labelling': {
        'results': {},
        'threshold': 0,
        'type': REMAINING_TIME
      },
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': LASSO,
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
    'created_date': '2018-02-07T22:47:32.146583Z',
    'error': '',
    'id': 1073,
    'modified_date': '2018-02-07T22:47:32.149647Z',
    'status': 'completed',
    'type': 'prediction'
  },
    {
    'config': {
      'clustering': {'clustering_method': NO_CLUSTER},
      'encoding': {
        'add_elapsed_time': false,
        'add_executed_events': false,
        'add_new_traces': false,
        'add_remaining_time': false,
        'add_resources_used': false,
        'data_encoding': 'label_encoder',
        'features': ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'prefix_5', 'prefix_6', 'prefix_7', 'prefix_8',
            'prefix_8', 'prefix_9', 'prefix_10', 'prefix_11', 'prefix_12', 'prefix_13', 'prefix_14', 'prefix_15',
            'prefix_16', 'label'],
        'padding': false,
        'prefix_length': 16,
        'task_generation_type': ONLY_THIS,
        'value_encoding': SIMPLE_INDEX
      },
      'evaluation': {
            'rmse': 1309.2985098872928,
            'mae': 918.62048228654021,
            'rscore': -0.093029773636106539,
            'mape': 50.34
      },
      'hyperparameter_optimizer': {
          'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'rmse'
      },
      'incremental_train': null,
      'labelling': {
        'results': {},
        'threshold': 0,
        'type': REMAINING_TIME
      },
      'predictive_model': {
        'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
        'prediction_method': LASSO,
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
    'created_date': '2018-02-07T22:47:32.146583Z',
    'error': '',
    'id': 1240,
    'modified_date': '2018-02-07T22:47:32.149647Z',
    'status': 'completed',
    'type': 'prediction'
  }
];

const labelJobs = [
    {
        'id': 52,
        'created_date': '2017-12-05T16:13:40.278339Z',
        'modified_date': '2017-12-05T16:13:40.457762Z',
        'config': {
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 1,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'labelling': {
                'type': REMAINING_TIME,
                'attribute_name': null,
                'threshold_type': THRESHOLD_MEAN,
                'threshold': 0,
                'result': {
                    'true': 34,
                    'false': 434
                }
            },
            'hyperopt': {
                'use_hyperopt': true,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
        },
        'status': 'completed',
        'type': 'labelling',
        'split_id': 1,
        'error': ''
    }
];

const filterOptions = {
    encodings: [],
    clusterings: [],
    classification: [],
    regression: [],
    timeSeriesPrediction: [],
    labelling: {type: DURATION, threshold_type: THRESHOLD_MEAN},
    thresholds: [1, 3, 4],
    attributeNames: ['name', 'name2'],
    padding: NO_PADDING
};

storiesOf('Validation', module)
    .add('ValidationHeaderCard', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <ValidationHeaderCard splitLabels={splitLabels} fetchState={{inFlight: false}}
                                              splitChange={(_) => _} selectedSplitId={0}
                                              methodChange={(_) => _} selectedPrefixes={['2']}
                                              filterOptions={filterOptions} prefixLengths={['1', '2']}
                                              prefixChange={(_) => _} filterOptionChange={console.log}
                                              predictionMethod={REGRESSION} labelChange={console.log}/>
                    </div>
                </div>
            );
        }
    ).add('Labelling header card', () => {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <LabellingHeaderCard splitLabels={splitLabels} fetchState={{inFlight: false}} splitChange={(_) => _}
                                         selectedPrefixes={['2']} filterOptions={filterOptions}
                                         labelChange={console.log} prefixLengths={['1', '2']} prefixChange={(_) => _}
                                         selectedSplitId={1} filterOptionChange={console.log}/>
                </div>
            </div>
        );
    }
).add('ConfigTableCard', () => {
    return (
        <div className="md-grid">
            <div className="md-cell md-cell--12">
                <ConfigTableCard jobs={classJobs} predictionMethod={CLASSIFICATION}/>
            </div>
            <div className="md-cell md-cell--12">
                <ConfigTableCard jobs={regJobs} predictionMethod={REGRESSION}/>
            </div>
            <div className="md-cell md-cell--12">
                <ConfigTableCard jobs={timeSeriesPredJobs} predictionMethod={TIME_SERIES_PREDICTION}/>
            </div>
            <div className="md-cell md-cell--12">
                <ConfigTableCard jobs={labelJobs} predictionMethod={LABELLING} onClick={(_) => _}/>
            </div>
        </div>
    );
}).add('ResultWrapper classification', () => {
    return (
        <div className="md-grid">
            <ResultWrapper jobs={classJobs} predictionMethod={CLASSIFICATION}/>
        </div>
    );
}).add('ResultWrapper regression', () => {
    return (
        <div className="md-grid">
            <ResultWrapper jobs={regJobs} predictionMethod={REGRESSION}/>
        </div>
    );
}).add('ResultWrapper time series prediction', () => {
        return (
            <div className="md-grid">
                <ResultWrapper jobs={timeSeriesPredJobs} predictionMethod={TIME_SERIES_PREDICTION}/>
            </div>
        );
    }
);
