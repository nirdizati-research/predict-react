/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {REGRESSION} from '../src/reference';
import ControlledLineChartCard from '../src/components/chart/ControlledLineChartCard';
import {label1} from './Advanced';

export const regJobs = [
    {
        'id': 4,
        'created_date': '2018-04-14T06:19:46.660000Z',
        'modified_date': '2018-04-14T06:22:03.597000Z',
        'config': {
            'regression.linear': {'fit_intercept': false, 'normalize': false, 'copy_X': true},
            'encoding': {'method': 'complex', 'prefix_length': 1, 'padding': 'no_padding', 'generation_type': 'only'},
            'clustering': 'noCluster',
            'method': 'linear',
            'labelling': label1
        },
        'status': 'completed',
        'result': {
            'rmse': 221.72427510287082,
            'mae': 193.11309325742712,
            'rscore': -0.060008504856852385,
            'mape': 50.34
        },
        'type': 'regression',
        'split_id': 4,
        'error': ''
    },
    {
        'id': 5,
        'created_date': '2018-04-14T06:29:21.355000Z',
        'modified_date': '2018-04-14T06:30:24.760000Z',
        'config': {
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 3,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'regression.linear': {'fit_intercept': true, 'normalize': false, 'copy_X': true},
            'clustering': 'noCluster',
            'method': 'linear',
            'labelling': label1
        },
        'status': 'completed',
        'result': {'rmse': 201.76464727647456, 'mae': 165.3624707580213, 'rscore': 0.12224386445773794, 'mape': 50.34},
        'type': 'regression',
        'split_id': 4,
        'error': ''
    },
    {
        'id': 6,
        'created_date': '2018-04-14T06:29:21.360000Z',
        'modified_date': '2018-04-14T06:30:24.406000Z',
        'config': {
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 3,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'regression.randomForest': {
                'n_estimators': 10,
                'criterion': 'mse',
                'max_depth': null,
                'min_samples_split': 2
            },
            'clustering': 'noCluster',
            'method': 'randomForest',
            'labelling': label1
        },
        'status': 'completed',
        'result': {'rmse': 191.19102930552305, 'mae': 138.26345747696183, 'rscore': 0.21183208508900764, 'mape': 50.34},
        'type': 'regression',
        'split_id': 4,
        'error': ''
    },
    {
        'id': 7,
        'created_date': '2018-04-14T06:29:21.360000Z',
        'modified_date': '2018-04-14T06:30:24.406000Z',
        'config': {
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 5,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'regression.randomForest': {
                'n_estimators': 10,
                'criterion': 'mse',
                'max_depth': null,
                'min_samples_split': 2
            },
            'clustering': 'noCluster',
            'method': 'randomForest',
            'labelling': label1
        },
        'status': 'completed',
        'result': {'rmse': 171.19102930552305, 'mae': 128.26345747696183, 'rscore': 0.24183208508900764, 'mape': 50.34},
        'type': 'regression',
        'split_id': 4,
        'error': ''
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
