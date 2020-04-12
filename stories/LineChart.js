/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {COMPLEX, LINEAR, NO_CLUSTER, ONLY_THIS, RANDOM_FOREST, REGRESSION, SIMPLE_INDEX} from '../src/reference';
import ControlledLineChartCard from '../src/components/chart/ControlledLineChartCard';
import {label1} from './Advanced';

export const regJobs = [
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': {
                'value_encoding': COMPLEX, 'prefix_length': 1, 'padding': false, 'generation_type': ONLY_THIS
            },
            'evaluation': {
                'rmse': 221.72427510287082,
                'mae': 193.11309325742712,
                'rscore': -0.060008504856852385,
                'mape': 50.34
            },
            'hyperparameter_optimizer': {
                'use_hyperopt': false,
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
                'id': 4,
                'splitting_method': 'strict_temporal',
                'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
                'test_size': 0.2,
                'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
                'type': 'double'
            },
        },
        'created_date': '2018-04-14T06:19:46.660000Z',
        'error': '',
        'id': 4,
        'modified_date': '2018-04-14T06:22:03.597000Z',
        'status': 'completed',
        'type': 'prediction'
    },
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': {
                'value_encoding': SIMPLE_INDEX, 'prefix_length': 3, 'padding': false, 'generation_type': ONLY_THIS
            },
            'evaluation': {
                'rmse': 201.76464727647456, 'mae': 165.3624707580213, 'rscore': 0.12224386445773794, 'mape': 50.34
            },
            'hyperparameter_optimizer': {
                'use_hyperopt': false,
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
                'id': 4,
                'splitting_method': 'strict_temporal',
                'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
                'test_size': 0.2,
                'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
                'type': 'double'
            },
        },
        'created_date': '2018-04-14T06:29:21.355000Z',
        'error': '',
        'id': 5,
        'modified_date': '2018-04-14T06:30:24.760000Z',
        'status': 'completed',
        'type': 'prediction'
    },
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': {
                'value_encoding': SIMPLE_INDEX, 'prefix_length': 3, 'padding': false, 'generation_type': ONLY_THIS
            },
            'evaluation': {
                'rmse': 191.19102930552305, 'mae': 138.26345747696183, 'rscore': 0.21183208508900764, 'mape': 50.34
            },
            'hyperparameter_optimizer': {
                'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'incremental_train': null,
            'labelling': label1,
            'predictive_model': {
                'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                'prediction_method': RANDOM_FOREST,
                'predictive_model': REGRESSION
            },
            'split': {
                'id': 4,
                'splitting_method': 'strict_temporal',
                'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
                'test_size': 0.2,
                'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
                'type': 'double'
            },
        },
        'created_date': '2018-04-14T06:29:21.360000Z',
        'error': '',
        'id': 6,
        'modified_date': '2018-04-14T06:30:24.406000Z',
        'status': 'completed',
        'type': 'prediction'
    },
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': {
                'value_encoding': SIMPLE_INDEX, 'prefix_length': 5, 'padding': false, 'generation_type': ONLY_THIS
            },
            'evaluation': {
                'rmse': 171.19102930552305, 'mae': 128.26345747696183, 'rscore': 0.24183208508900764, 'mape': 50.34
            },
            'hyperparameter_optimizer': {
                'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'incremental_train': null,
            'labelling': label1,
            'predictive_model': {
                'model_path': 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                'prediction_method': RANDOM_FOREST,
                'predictive_model': REGRESSION
            },
            'split': {
                'id': 4,
                'splitting_method': 'strict_temporal',
                'test_log_path': 'cache/log_cache/80-100_1559742742743335.xes',
                'test_size': 0.2,
                'train_log_path': 'cache/log_cache/0-80_1559742738260318.xes',
                'type': 'double'
            },
        },
        'created_date': '2018-04-14T06:29:21.360000Z',
        'error': '',
        'id': 7,
        'modified_date': '2018-04-14T06:30:24.406000Z',
        'status': 'completed',
        'type': 'prediction'
    }
];

storiesOf('Controlled Charts', module)
    .add('ControlledLineCharts', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <ControlledLineChartCard jobs={regJobs} predictionMethod={REGRESSION}/>
                    </div>
                </div>
            );
        }
    );
