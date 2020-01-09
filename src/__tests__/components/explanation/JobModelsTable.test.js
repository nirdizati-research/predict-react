import React from 'react';
import {shallow} from 'enzyme';
import FetchState from '../../../components/FetchState';
import SelectField from 'react-md/lib/SelectFields';
import JobModelsTable from '../../../components/explanation/JobModelsTable';
import {CLASSIFICATION, LABELLING, REGRESSION, LINEAR, NO_CLUSTER} from '../../../reference';
import LabelConfigTable from '../../../components/validation/LabelConfigTable';
import {label1} from '../../../../stories/Advanced';

const fetchState = {
    inFlight: false
};
const jobChange = jest.fn();

const jobs = [{
        'config': {
            'clustering': {'clustering_method': NO_CLUSTER},
            'encoding': {},
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
describe('ExplanationHeaderCard', () => {
    it('renders', () => {
        const element = shallow(<JobModelsTable jobs={jobs}
                                                        fetchState={fetchState}
                                                        predictionMethod={REGRESSION}
                                                        onClick={jest.fn()}
                                                        jobChange={jobChange}
                                                        jobId={53}/>);
        expect(element).toBeDefined();
        expect(element.find(LabelConfigTable).length).toBe(1);
        expect(element.find(FetchState).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(1);
    });

    it('empty jobs with classification method', () => {
        const element = shallow(<JobModelsTable jobs={[]}
                                                        fetchState={fetchState}
                                                        predictionMethod={CLASSIFICATION}
                                                        onClick={jest.fn()}
                                                        jobChange={jest.fn()}
                                                        jobId={0}/>);
        expect(element).toBeDefined();
        expect(element.find(LabelConfigTable).length).toBe(1);
        expect(element.find(FetchState).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(0);
    });

    it('empty jobs with labelling method', () => {
        const element = shallow(<JobModelsTable jobs={[]}
                                                        fetchState={fetchState}
                                                        predictionMethod={LABELLING}
                                                        onClick={jest.fn()}
                                                        jobChange={jest.fn()}
                                                        jobId={1}/>);
        expect(element).toBeDefined();
        expect(element.find(LabelConfigTable).length).toBe(1);
        expect(element.find(FetchState).length).toBe(1);
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(0);
    });


    it('calls jobChange', () => {
        const element = shallow(<JobModelsTable jobs={jobs}
                                                        fetchState={fetchState}
                                                        predictionMethod={REGRESSION}
                                                        onClick={jest.fn()}
                                                        jobChange={jobChange}
                                                        jobId={53}/>);
        element.find(SelectField).at(0).simulate('change', '53');
        expect(jobChange).toHaveBeenCalledWith('53');
    });
});
