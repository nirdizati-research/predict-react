/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {TableRow} from 'react-md/lib/DataTables/index';
import {TableColumn} from 'react-md';
import ConfigTable from '../../../components/validation/ConfigTable';
import ConfigTableCard from '../../../components/validation/ConfigTableCard';
import {CLASSIFICATION, LABELLING, LINEAR, NO_CLUSTER, RANDOM_FOREST, REGRESSION,} from '../../../reference';
import {jobToValidationTable} from '../../../util/dataReducers';
import {label1} from '../../../../stories/Advanced';
import LabelConfigTable from '../../../components/validation/LabelConfigTable';

export const encoding1 = {
    'value_encoding': 'simpleIndex',
    'prefix_length': 1,
    'padding': 'zero_padding',
    'generation_type': 'only',
    'add_remaining_time': false,
    'add_elapsed_time': false,
    'add_executed_events': false,
    'add_resources_used': false,
    'add_new_traces': false,
};

const regJobs = [
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': encoding1,
            'evaluation': {},
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
        'created_date': '2018-02-07T22:47:32.146583Z',
        'error': '',
        'id': 53,
        'modified_date': '2018-02-07T22:47:32.146583Z',
        'status': 'created',
        'type': 'prediction'
    }];

const classJobs = [
    {
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': encoding1,
            'evaluation': {},
            'hyperparameter_optimizer': {
                'use_hyperopt': true,
                'max_evals': 100,
                'performance_metric': 'acc'
            },
            'incremental_train': null,
            'labelling': label1,
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
        'created_date': '2018-02-07T09:13:52.964154Z',
        'error': '',
        'id': 52,
        'modified_date': '2018-02-07T09:13:52.964256Z',
        'status': 'created',
        'type': 'prediction'
    }];

const labelJobs = [
    {
        'config': {
            'clustering': null,
            'encoding': encoding1,
            'evaluation': null,
            'hyperparameter_optimizer': null,
            'incremental_train': null,
            'labelling': label1,
            'predictive_model': null,
            'split': {
                'id': 1,
                'original_log_path': 'cache/log_cache/80-100_15597426103830981.xes',
                'splitting_method': 'strict_temporal',
                'test_size': 0.2,
                'type': 'single'
            },
        },
        'created_date': '2019-06-10T13:53:53.890607Z',
        'error': '',
        'id': 52,
        'modified_date': '2019-06-10T13:53:53.891280Z',
        'status': 'created',
        'type': LABELLING,
    }];

describe('ConfigTableCard', () => {
    const element = shallow(<ConfigTableCard jobs={[]} predictionMethod={CLASSIFICATION} onClick={jest.fn()}/>);
    it('renders', () => {
        expect(element).toBeDefined();
        expect(element.find(ConfigTable).length).toBe(0);
    });

    it('renders table', () => {
        element.setProps({jobs: classJobs});
        expect(element.find(ConfigTable).length).toBe(1);
        expect(element.find(LabelConfigTable).length).toBe(0);
    });

    it('renders labelling table', () => {
        element.setProps({predictionMethod: LABELLING, jobs: labelJobs});
        expect(element.find(ConfigTable).length).toBe(0);
        expect(element.find(LabelConfigTable).length).toBe(1);
    });
});

describe('ConfigTable', () => {
    it('renders nothing without jobs', () => {
        const element = shallow(<ConfigTable jobs={[]}/>);
        expect(element).toBeDefined();
        // Header row
        expect(element.find(TableRow).length).toBe(1);
        expect(element.find(TableColumn).length).toBe(14);
    });

    it('renders regression jobs if present', () => {
        const element = mount(<ConfigTable jobs={regJobs.map(jobToValidationTable)}/>);
        expect(element.find(TableRow).length).toBe(2);
        // expect(element.text()).toMatch(/regression/); //dunno what this means
    });

    it('renders classification jobs if present', () => {
        const element = mount(<ConfigTable jobs={classJobs.map(jobToValidationTable)}/>);
        expect(element.find(TableRow).length).toBe(2);
        // expect(element.text()).toMatch(/classification/); //dunno what this means
    });
});
