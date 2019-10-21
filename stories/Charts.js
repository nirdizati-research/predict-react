/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import PrefixLineChart from '../src/components/chart/PrefixLineChart';
import LineChartCard from '../src/components/chart/LineChartCard';
import BarChartCard from '../src/components/chart/BarChartCard';
import BubbleChartCard from '../src/components/chart/BubbleChartCard';
import {getChartHeader} from '../src/components/validation/ColumnHelper';
import {
    CLASSIFICATION,
    LABELLING,
    REGRESSION,
    REMAINING_TIME,
    THRESHOLD_MEAN
} from '../src/reference';

const traces = {
    '2011-10-01': 23,
    '2011-10-03': 119,
    '2011-10-04': 85,
    '2011-10-05': 106,
    '2011-10-06': 80,
    '2011-10-07': 83
};

const notOrderedTraces = {
    '2011-10-06': 80,
    '2011-10-03': 119,
    '2011-10-01': 23,
    '2011-10-05': 106,
    '2011-10-07': 83,
    '2011-10-04': 85
};

const resources = {
    '2011-10-01': 7,
    '2011-10-03': 13,
    '2011-10-04': 12,
    '2011-10-05': 14,
    '2011-10-06': 11,
    '2011-10-07': 13,
    '2011-10-08': 7,
};

const eventsInTrace = {
    'Archive Repair': 574,
    'Restart Repair': 139,
    'END': 74,
    'Repair (Simple)': 68,
    'Repair (Complex)': 26
};

const events = {
    'W_Assessing_application': 4098,
    'W_Calling _missing_information': 1647,
    'W_Calling_after_offers': 4464,
    'W_Check_for_fraud': 130,
    'W_Filling_in application': 6117,
    'W_Fixing_incoming_lead': 3588
};
const regressor = [
    ['uuid121', 321.16984512656944, 470.1483088530332, 'linear', -0.75205320910182749],
    ['uuid122', 218.33484913201886, 218.33484913201886, 'xboost', 0.10676014147290103]
];

const classData = [
    ['uuid121', 0.7152600170502984, 0.6232374506486181, 'knn_simpleIndex_noCluster_clustering', 0.63384260739574716],
    ['uuid122', 0.933152664859982, 0.9165256627185561,
        'decisionTree_simpleIndex_kmeans_clustering', 0.9605116926217754],
    ['uuid123', 0.7300537412153782, 0.6408140814081408, 'knn_boolean_noCluster_clustering', 0.62917375812309062]
];


const someData = [
    ['uuid121', 321.16984512656944, 470.1483088530332, '1', -0.75205320910182749],
    ['uuid122', 218.33484913201886, 218.33484913201886, '2', 0.10676014147290103]
];

const someColumns = [
    {
        type: 'string',
        label: 'id',
    },
    {
        type: 'number',
        label: 'fmeasure',
    },
    {
        type: 'number',
        label: 'acc',
    },
    {
        type: 'string',
        label: 'Prefix length',
    },
    {
        type: 'number',
        label: 'auc',
    }
];


export const labelJobs = [
    {
        'config': {
            'clustering': null,
            'encoding': {
                'value_encoding': 'simpleIndex',
                'prefix_length': 1,
                'padding': true,
                'generation_type': 'only'
            },
            'evaluation': null,
            'hyperparameter_optimizer': null,
            'incremental_train': null,
            'labelling': {
                'type': REMAINING_TIME,
                'attribute_name': null,
                'threshold_type': THRESHOLD_MEAN,
                'threshold': 0,
                'results': {
                    'rmse': 221, 'mae': 193
                }
            },
            'predictive_model': null,
            'split': {
                'id': 1,
                'original_log_path': 'cache/log_cache/80-100_15597426103830981.xes',
                'splitting_method': 'strict_temporal',
                'test_size': 0.2,
                'type': 'single'
            }
        },
        'created_date': '2017-11-14T20:52:36.469000Z',
        'error': '',
        'id': 4,
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'status': 'completed',
        'type': LABELLING
    },
    {
        'config': {
            'clustering': null,
            'encoding': {
                'value_encoding': 'simpleIndex',
                'prefix_length': 3,
                'padding': true,
                'generation_type': 'only'
            },
            'evaluation': null,
            'hyperparameter_optimizer': null,
            'incremental_train': null,
            'labelling': {
                'type': REMAINING_TIME,
                'attribute_name': null,
                'threshold_type': THRESHOLD_MEAN,
                'threshold': 0,
                'results': {
                    'rmse': 191, 'mae': 138, '0': 23
                }
            },
            'predictive_model': null,
            'split': {
                'id': 1,
                'original_log_path': 'cache/log_cache/80-100_15597426103830981.xes',
                'splitting_method': 'strict_temporal',
                'test_size': 0.2,
                'type': 'single'
            }
        },
        'created_date': '2017-11-14T20:52:36.469000Z',
        'error': '',
        'id': 5,
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'status': 'completed',
        'type': LABELLING
    },
    {
        'config': {
            'clustering': null,
            'encoding': {
                'value_encoding': 'simpleIndex',
                'prefix_length': 4,
                'padding': true,
                'generation_type': 'only'
            },
            'evaluation': null,
            'hyperparameter_optimizer': null,
            'incremental_train': null,
            'labelling': {
                'type': REMAINING_TIME,
                'attribute_name': null,
                'threshold_type': THRESHOLD_MEAN,
                'threshold': 0,
                'results': {
                    'rmse': 201, 'mae': 165, 'third': 34
                }
            },
            'predictive_model': null,
            'split': {
                'id': 1,
                'original_log_path': 'cache/log_cache/80-100_15597426103830981.xes',
                'splitting_method': 'strict_temporal',
                'test_size': 0.2,
                'type': 'single'
            }
        },
        'created_date': '2017-11-14T20:52:36.469000Z',
        'error': '',
        'id': 6,
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'status': 'completed',
        'type': LABELLING
    },
    {
        'config': {
            'clustering': null,
            'encoding': {
                'value_encoding': 'simpleIndex',
                'prefix_length': 5,
                'padding': true,
                'generation_type': 'only'
            },
            'evaluation': null,
            'hyperparameter_optimizer': null,
            'incremental_train': null,
            'labelling': {
                'type': REMAINING_TIME,
                'attribute_name': null,
                'threshold_type': THRESHOLD_MEAN,
                'threshold': 0,
                'results': {
                    'rmse': 171, 'mae': 128
                }
            },
            'predictive_model': null,
            'split': {
                'id': 1,
                'original_log_path': 'cache/log_cache/80-100_15597426103830981.xes',
                'splitting_method': 'strict_temporal',
                'test_size': 0.2,
                'type': 'single'
            }
        },
        'created_date': '2017-11-14T20:52:36.469000Z',
        'error': '',
        'id': 7,
        'modified_date': '2017-12-05T14:57:28.344216Z',
        'status': 'completed',
        'type': LABELLING
    }
];

storiesOf('Charts', module)
    .add('PrefixLineChart', () => {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <PrefixLineChart
                        jobs={labelJobs}/>
                </div>
                <div className="md-cell md-cell--12">
                    <PrefixLineChart
                        jobs={labelJobs}/>
                </div>
            </div>
        );
    })
    .add('LineChartCard', () => {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <LineChartCard data={traces}
                                   cardTitle="Number of traces"
                                   chartTitle="Active traces"/>
                </div>
                <div className="md-cell md-cell--12">
                    <LineChartCard data={notOrderedTraces}
                                   cardTitle="Modern art"
                                   chartTitle="Messed up order of object"/>
                </div>
                <div className="md-cell md-cell--12">
                    <LineChartCard data={resources}
                                   cardTitle="Number of resources"
                                   chartTitle="Active traces"/>
                </div>

                <div className="md-cell md-cell--12">
                    <LineChartCard data={{}}
                                   cardTitle="Number of resources empty"
                                   chartTitle="Empty chart"/>
                </div>
                <div className="md-cell md-cell--12">
                    <BarChartCard data={events}
                                  cardTitle="Event Occurrences"
                                  hTitle="Number of Executions"
                                  chartTitle="Events"/>
                </div>
                <div className="md-cell md-cell--12">
                    <BarChartCard data={{'true': 343, 'false': 3434}}
                                  cardTitle="Lablels"
                                  hTitle="Number of Executionsasdad"
                                  chartTitle="asdasfd"/>
                </div>
                <div className="md-cell md-cell--12">
                    <BarChartCard data={eventsInTrace}
                                  cardTitle="Labels for task 8, prefix length 8"
                                  hTitle="Label"
                                  chartTitle="Label count"/>
                </div>
            </div>
        );
    })
    .add('BubbleChartCard', () => {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <BubbleChartCard
                        data={regressor}
                        columns={getChartHeader(REGRESSION)}
                        hTitle="Mae"
                        vTitle="Rmse"
                        cardTitle="Bubble chart by regressor"/>
                </div>
                <div className="md-cell md-cell--12">
                    <BubbleChartCard
                        data={classData}
                        columns={getChartHeader(CLASSIFICATION)}
                        hTitle="fmeasure"
                        vTitle="accuracy"
                        cardTitle="Bubble chart by classificator"/>
                </div>
                <div className="md-cell md-cell--12">
                    <BubbleChartCard
                        data={someData}
                        columns={someColumns}
                        hTitle="fmeasure"
                        vTitle="accuracy"
                        cardTitle="Bubble chart by prefix length"/>
                </div>
            </div>
        );
    });
