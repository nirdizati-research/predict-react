/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {
    CLASSIFICATION,
    DURATION,
    LABELLING,
    NO_PADDING,
    REGRESSION,
    THRESHOLD_MEAN,
    TIME_SERIES_PREDICTION
} from '../src/reference';
import ResultWrapper from '../src/components/validation/ResultWrapper';
import {label1} from './Advanced';
import LabellingHeaderCard from '../src/components/Labelling/LabellingHeaderCard';

const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
export const classJobs = [
    {
        'id': 1,
        'created_date': '2017-11-14T20:52:36.469000Z',
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'config': {
            'clustering': 'kmeans',
            'method': 'randomForest',
            'kmeans': {'keyt': 1123},
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 1,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'create_models': true,
            'label': label1,
            'hyperopt': {
                'use_hyperopt': true,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'classification.randomForest': {
                'n_estimators': 10,
                'criterion': 'gini',
                'max_depth': null,
                'min_samples_split': 2,
                'min_samples_leaf': 1
            }
        },
        'status': 'completed',
        'result': {
            'f1score': 0.6666666666666666,
            'acc': 0.5,
            'auc': 0.5,
            'false_negative': 0,
            'false_positive': 1,
            'true_positive': 1,
            'true_negative': 0,
            'precision': 3,
            'recall': 0
        },
        'type': 'classification',
        'split_id': 1,
        'error': ''
    },
    {
        'id': 3,
        'created_date': '2017-11-14T20:52:36.469000Z',
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'config': {
            'clustering': 'noCluster',
            'method': 'randomForest',
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 3,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'label': label1,
            'create_models': true,
            'hyperopt': {
                'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'classification.randomForest': {
                'n_estimators': 10,
                'criterion': 'gini',
                'max_depth': null,
                'min_samples_split': 2,
                'min_samples_leaf': 1
            }
        },
        'status': 'completed',
        'result': {
            'f1score': 0.766666666666666,
            'acc': 0.3,
            'auc': 0.2,
            'false_negative': 0,
            'false_positive': 1,
            'true_positive': 1,
            'true_negative': 0,
            'precision': 3,
            'recall': 0
        },
        'type': 'classification',
        'split_id': 1,
        'error': ''
    }];

export const timeSeriesPredJobs = [
    {
        'id': 1,
        'created_date': '2017-11-14T20:52:36.469000Z',
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'config': {
            'clustering': 'kmeans',
            'method': 'rnn',
            'kmeans': {'keyt': 1123},
            'encoding': {
                'method': 'simpleIndex',
                'prefix_length': 1,
                'padding': 'no_padding',
                'generation_type': 'only'
            },
            'create_models': true,
            'label': label1,
            'hyperopt': {
                'use_hyperopt': true,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'timeSeriesPrediction.rnn': {}
        },
        'status': 'completed',
        'result': {
            'f1score': 0.6666666666666666,
            'acc': 0.5,
            'auc': 0.5,
            'false_negative': 0,
            'false_positive': 1,
            'true_positive': 1,
            'true_negative': 0,
            'precision': 3,
            'recall': 0
        },
        'type': 'timeSeriesPrediction',
        'split_id': 1,
        'error': ''
    }];

const regJobs = [
    {
        'id': 1073,
        'created_date': '2018-02-07T22:47:32.146583Z',
        'modified_date': '2018-02-07T22:47:32.149647Z',
        'config': {
            'encoding': {'method': 'complex', 'prefix_length': 16, 'padding': 'no_padding', 'generation_type': 'only'},
            'clustering': 'noCluster',
            'method': 'lasso',
            'create_models': false,
            'label': label1,
            'hyperopt': {
                'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'rmse'
            },
            'regression.lasso': {
                'fit_intercept': true,
                'normalize': false,
                'copy_X': true
            }
        },
        'status': 'created',
        'result': {
            'rmse': 1316.1386475352517,
            'mae': 933.93803112935666,
            'rscore': -0.10448018564371164,
            'mape': 50.34
        },
        'type': 'regression',
        'split_id': 1,
        'error': ''
    },
    {
        'id': 1240,
        'created_date': '2018-02-07T22:47:32.146583Z',
        'modified_date': '2018-02-07T22:47:32.149647Z',
        'config': {
            'encoding': {'method': 'complex', 'prefix_length': 16, 'padding': 'no_padding', 'generation_type': 'only'},
            'clustering': 'noCluster',
            'method': 'lasso',
            'create_models': false,
            'label': label1,
            'hyperopt': {
                'use_hyperopt': false,
                'max_evals': 100,
                'performance_metric': 'rmse'
            },
            'regression.lasso': {
                'fit_intercept': true,
                'normalize': false,
                'copy_X': true
            }
        },
        'status': 'created',
        'result': {
            'rmse': 1309.2985098872928,
            'mae': 918.62048228654021,
            'rscore': -0.093029773636106539,
            'mape': 50.34
        },
        'type': 'regression',
        'split_id': 1,
        'error': ''
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
            'label': label1,
            'hyperopt': {
                'use_hyperopt': true,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
        },
        'status': 'completed',
        'result': {
            'true': 34,
            'false': 434
        },
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
    label: {type: DURATION, threshold_type: THRESHOLD_MEAN},
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
                                              methodChange={(_) => _} selectedPrefixes={['2']} filterOptions={filterOptions}
                                              prefixLengths={['1', '2']} prefixChange={(_) => _}
                                              filterOptionChange={console.log}
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
                                         selectedPrefixes={['2']} filterOptions={filterOptions} labelChange={console.log}
                                         prefixLengths={['1', '2']} prefixChange={(_) => _} selectedSplitId={1}
                                         filterOptionChange={console.log}/>
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
