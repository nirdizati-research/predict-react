import React from 'react';
import {shallow} from 'enzyme';
import SelectField from 'react-md/lib/SelectFields';
import ExplanationHeaderCard from '../../../components/explanation/ExplanationHeaderCard';
import {CLASSIFICATION, LABELLING, REGRESSION, LINEAR, NO_CLUSTER} from '../../../reference';
import {label1} from '../../../../stories/Advanced';

const fetchState = {
    inFlight: false
};
const splitChange = jest.fn();
const jobChange = jest.fn();
const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];

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
        const element = shallow(<ExplanationHeaderCard jobs={jobs}
                                                        splitLabels={splitLabels}
                                                        fetchState={fetchState}
                                                        splitChange={splitChange}
                                                        selectedSplitId={1}
                                                        predictionMethod={REGRESSION}
                                                        onClick={jest.fn()}
                                                        jobChange={jobChange}
                                                        jobId={53}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(splitLabels.length);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(splitLabels);
    });

    it('empty jobs with classification method', () => {
        const element = shallow(<ExplanationHeaderCard jobs={[]}
                                                        splitLabels={splitLabels}
                                                        fetchState={fetchState}
                                                        splitChange={splitChange}
                                                        selectedSplitId={1}
                                                        predictionMethod={CLASSIFICATION}
                                                        onClick={jest.fn()}
                                                        jobChange={jest.fn()}
                                                        jobId={0}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(splitLabels.length);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(splitLabels);
    });

    it('empty jobs with labelling method', () => {
        const element = shallow(<ExplanationHeaderCard jobs={[]}
                                                        splitLabels={splitLabels}
                                                        fetchState={fetchState}
                                                        splitChange={splitChange}
                                                        selectedSplitId={1}
                                                        predictionMethod={LABELLING}
                                                        onClick={jest.fn()}
                                                        jobChange={jest.fn()}
                                                        jobId={1}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(splitLabels.length);
        expect(element.find(SelectField).at(0).props().menuItems).toBe(splitLabels);
    });

    it('calls splitChange', () => {
        const element = shallow(<ExplanationHeaderCard jobs={jobs}
                                                        splitLabels={splitLabels}
                                                        fetchState={fetchState}
                                                        splitChange={splitChange}
                                                        selectedSplitId={1}
                                                        predictionMethod={REGRESSION}
                                                        onClick={jest.fn()}
                                                        jobChange={jobChange}
                                                        jobId={53}/>);
        element.find(SelectField).at(0).simulate('change', 'Split #2');
        expect(splitChange).toHaveBeenCalledWith('Split #2');
    });
});
