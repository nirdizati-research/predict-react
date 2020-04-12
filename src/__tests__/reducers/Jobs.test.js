/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import jobs from '../../reducers/Jobs';
import {
    FILTER_LABEL_CHANGED,
    FILTER_OPTION_CHANGED,
    FILTER_PREDICTION_METHOD_CHANGED,
    FILTER_PREFIX_LENGTH_CHANGED,
    FILTER_SPLIT_CHANGED,
    JOB_DELETED,
    jobsFailed,
    jobsRequested,
    jobsRetrieved,
    decodingRequested,
    decodingtRetrieved,
    decodingFailed,
    encodedUniqueValuesRetrieved,
    encodedUniqueValuesRequested,
    encodedUniqueValuesFailed

} from '../../actions/JobActions';
import {
    ATTRIBUTE_NUMBER,
    CLASSIFICATION,
    DURATION,
    LABELLING,
    NO_CLUSTER,
    ONLY_THIS,
    RANDOM_FOREST,
    REGRESSION,
    REMAINING_TIME,
    SIMPLE_INDEX,
    THRESHOLD_CUSTOM,
    THRESHOLD_MEAN,
    ZERO_PADDING
} from '../../reference';

const jobList = [
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
            evaluation: {},
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                threshold_type: THRESHOLD_MEAN,
                type: DURATION
            },
            predictive_model: {
                model_path: '',
                prediction_method: RANDOM_FOREST,
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 1,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'created',
        type: 'prediction'
    },
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                threshold_type: THRESHOLD_MEAN,
                type: DURATION
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 2,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    },
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
                features: ['prefix_1', 'label'],
                padding: false,
                prefix_length: 1,
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                threshold_type: THRESHOLD_MEAN,
                type: REMAINING_TIME
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
                predictive_model: REGRESSION
            },
            split: {
                id: 2,
                splitting_method: 'strict_temporal',
                test_log_path: 'cache/log_cache/80-100_1559742742743335.xes',
                test_size: 0.2,
                train_log_path: 'cache/log_cache/0-80_1559742738260318.xes',
                type: 'double'
            },
        },
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 3,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    },
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
                features: ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'prefix_5', 'label'],
                padding: false,
                prefix_length: 5,
                task_generation_type: ONLY_THIS,
                value_encoding: SIMPLE_INDEX
            },
            evaluation: {},
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                threshold_type: THRESHOLD_MEAN,
                type: DURATION
            },
            predictive_model: {
                model_path: '',
                prediction_method: RANDOM_FOREST,
                predictive_model: CLASSIFICATION
            },
            split: {
                id: 4,
                splitting_method: 'strict_temporal',
                test_log_path: 'cache/log_cache/80-100_1559742742743335.xes',
                test_size: 0.2,
                train_log_path: 'cache/log_cache/0-80_1559742738260318.xes',
                type: 'double'
            },
        },
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 4,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'created',
        type: 'prediction'
    },
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
                features: ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'label'],
                padding: false,
                prefix_length: 4,
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                threshold_type: THRESHOLD_MEAN,
                type: DURATION
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 5,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    },
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 0,
                type: REMAINING_TIME
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
                predictive_model: REGRESSION
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 6,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    },
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
                features: ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'label'],
                padding: false,
                prefix_length: 4,
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 100,
                threshold_type: THRESHOLD_CUSTOM,
                type: DURATION
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 75,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    },
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
                features: ['prefix_1', 'prefix_2', 'prefix_3', 'prefix_4', 'label'],
                padding: false,
                prefix_length: 4,
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
            hyperparameter_optimizer: {},
            incremental_train: null,
            labelling: {
                results: {},
                threshold: 100,
                threshold_type: THRESHOLD_MEAN,
                attribute_name: 'name',
                type: ATTRIBUTE_NUMBER
            },
            predictive_model: {
                model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
                prediction_method: RANDOM_FOREST,
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
        created_date: '2019-06-05T13:51:55.034402Z',
        error: '',
        id: 76,
        modified_date: '2019-06-05T13:52:24.902133Z',
        status: 'completed',
        type: 'prediction'
    }
];

const changedJob = {
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
        hyperparameter_optimizer: {},
        incremental_train: null,
        labelling: {
            results: {},
            threshold: 0,
            threshold_type: THRESHOLD_MEAN,
            attribute_name: 'name',
            type: DURATION
        },
        predictive_model: {
            model_path: 'cache/model_cache/job_2-split_4-predictive_model-prediction-v0.sav',
            prediction_method: RANDOM_FOREST,
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
    created_date: '2019-06-05T13:51:55.034402Z',
    error: '',
    id: 76,
    modified_date: '2019-06-05T13:52:24.902133Z',
    status: 'completed',
    type: 'prediction'
};

const initState = {fetchState: {inFlight: false}, byId: {}, allIds: [], filteredIds: [], decodedDf: {},
    encodedUniqueValues: {},
    isDecodingLoaded: true,
    isEncodedUniqueValuesLoaded: true};
describe('JobsReducer', () => {
    let state;

    beforeEach(() => {
        state = jobs(undefined, jobsRequested());
    });

    it('has nothing initially', () => {
        expect(jobs(undefined, {})).toMatchObject(initState);
    });

    it('changes fetchState when requesting', () => {
        expect(state).toMatchObject({fetchState: {inFlight: true}});
    });

    it('when receives nothing', () => {
        const state2 = jobs(state, jobsRetrieved([]));
        expect(state2.fetchState).toMatchObject({inFlight: false});

        const {allIds, byId} = state2;
        expect(allIds).toEqual([]);
        expect(Object.keys(byId).length).toEqual(0);
    });

    it('adds jobs when request completed', () => {
        const state2 = jobs(state, jobsRetrieved(jobList));
        expect(state2.fetchState).toMatchObject({inFlight: false});
        expect(state2.attributeNames).toEqual(['name']);
        expect(state2.thresholds).toEqual([0, 100]);
        expect(state2.uniqueSplits).toEqual([1, 2]);

        const {allIds, byId} = state2;
        expect(allIds).toEqual([1, 2, 3, 4, 5, 6, 75, 76]);
        expect(Object.keys(byId).length).toEqual(8);
        expect(byId[1].config.split.id).toBe(1);
    });

    it('updates job list by id', () => {
        const state2 = jobs(jobs(undefined, jobsRetrieved(jobList)), jobsRetrieved([changedJob]));

        const {allIds, byId} = state2;
        expect(Object.keys(byId).length).toEqual(8);
        expect(allIds.length).toEqual(8);
        expect(byId[1].status).toBe('created');
    });

    it('stores error message', () => {
        const state2 = jobs(state, jobsFailed('error'));
        expect(state2).toMatchObject({fetchState: {inFlight: false, error: 'error'}});
    });

    it('removes from list on delete', () => {
        const state2 = jobs(jobs(undefined, jobsRetrieved(jobList)), {type: JOB_DELETED, id: 75});
        const state3 = jobs(state2, {type: JOB_DELETED, id: 76});
        expect(state3.attributeNames).toEqual([]);
        expect(state3.thresholds).toEqual([0]);

        const {allIds, byId} = state3;
        expect(allIds).toEqual([1, 2, 3, 4, 5, 6]);
        expect(Object.keys(byId).length).toEqual(6);
    });
});

describe('Validation filter', () => {
    let state;
    let state2;
    let stateClass;

    beforeEach(() => {
        state = jobs(undefined, jobsRetrieved(jobList));
        state2 = jobs(state, {type: FILTER_SPLIT_CHANGED, splitId: 1});
        stateClass = jobs(state2, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
    });

    describe('initial state', () => {
        it('has no filtered jobs initially', () => {
            expect(state).toMatchObject({filteredIds: []});
        });

        it('has unique list of split ids', () => {
            expect(state).toMatchObject({uniqueSplits: [1, 2]});
        });

        it('has REGRESSION method', () => {
            expect(state).toMatchObject({predictionMethod: REGRESSION});
        });

        it('has no prefix lengths', () => {
            expect(state).toMatchObject({prefixLengths: []});
        });
    });

    describe('when FILTER_SPLIT_CHANGED', () => {
        it('adds to filtered job list', () => {
            expect(state2.filteredIds).toEqual([6]);
        });

        it('populates prefix list', () => {
            expect(state2.prefixLengths).toEqual([2]);
        });

        it('sets splitId', () => {
            expect(state2.splitId).toEqual(1);
        });
    });

    describe('when FILTER_PREDICTION_METHOD_CHANGED', () => {
        it('adds to filtered job list', () => {
            let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
            expect(state3.filteredIds).toEqual([3]);
        });

        it('populates prefix list', () => {
            let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
            expect(state3.prefixLengths).toEqual([1]);
            expect(state3.selectedPrefixes).toEqual([1]);
        });

        it('resets filter options', () => {
            let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
            state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
            expect(state3.classification.length).toEqual(10);
            expect(state3.regression.length).toEqual(5);
            expect(state3.clusterings.length).toEqual(2);
            expect(state3.encodings.length).toEqual(5);
        });

        it('has label remaining type for regression', () => {
            let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
            state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: REGRESSION});
            expect(state3.labelling).toEqual({type: REMAINING_TIME});
        });

        it('has label duration for classification', () => {
            let state3 = jobs(stateClass, {type: FILTER_SPLIT_CHANGED, splitId: 2});
            expect(state3.labelling).toEqual({type: DURATION, threshold_type: THRESHOLD_MEAN});
        });

        it('has label duration for labelling', () => {
            const state3 = jobs(state2, {type: FILTER_PREDICTION_METHOD_CHANGED, method: LABELLING});
            expect(state3.labelling).toEqual({type: DURATION, threshold_type: THRESHOLD_MEAN});
            expect(state3.filteredIds).toEqual([]);
        });
    });

    describe('when FILTER_PREFIX_LENGTH_CHANGED', () => {
        it('removes from jobs', () => {
            const state3 = jobs(stateClass, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
            expect(state3.prefixLengths).toEqual([2, 4]);
            expect(state3.selectedPrefixes).toEqual([2]);
            expect(state3.filteredIds).toEqual([2]);
        });

        it('removes and adds back to jobs', () => {
            const state3 = jobs(stateClass, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
            const state4 = jobs(state3, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
            expect(state4.filteredIds).toEqual([2, 5]);
            expect(state4.selectedPrefixes).toEqual([2, 4]);
        });
    });

    describe('when FILTER_OPTION_CHANGED', () => {
        it('changes for encoding method', () => {
            let state3 = jobs(state2, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: SIMPLE_INDEX, name: 'encodings[]'}
            });
            expect(state3.filteredIds).toEqual([]);
            expect(state3.encodings.length).toEqual(4);
        });

        it('changes for classification method', () => {
            let state3 = jobs(stateClass, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: RANDOM_FOREST, name: 'classification[]'}
            });
            expect(state3.classification.length).toEqual(9);
            expect(state3.filteredIds).toEqual([]);
        });

        it('changes for regression method', () => {
            let state3 = jobs(state2, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: RANDOM_FOREST, name: 'regression[]'}
            });
            expect(state3.regression.length).toEqual(4);
            expect(state3.filteredIds).toEqual([]);
        });

        it('changes for clustering method', () => {
            let state3 = jobs(state2, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: NO_CLUSTER, name: 'clusterings[]'}
            });
            expect(state3.clusterings.length).toEqual(1);
            expect(state3.filteredIds).toEqual([]);
        });

        it('changes for padding', () => {
            let state3 = jobs(state2, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: ZERO_PADDING, name: 'padding-filter'}
            });
            expect(state3.filteredIds).toEqual([]);
            expect(state3.padding).toEqual(ZERO_PADDING);
        });

        it('resets when prediction method changes', () => {
            let state3 = jobs(state2, {
                type: FILTER_OPTION_CHANGED,
                payload: {value: SIMPLE_INDEX, name: 'encodings[]'}
            });
            state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
            expect(state3.filteredIds).toEqual([2, 5]);
            expect(state3.encodings.length).toEqual(5);
        });
    });

    describe('when FILTER_LABEL_CHANGED', () => {
        it('changes the label', () => {
            const state3 = jobs(stateClass, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'type'}, value: DURATION}
            });
            expect(state3.labelling).toEqual({type: DURATION, threshold_type: THRESHOLD_MEAN});
            expect(state3.filteredIds).toEqual([2, 5]);
        });

        it('filters for custom threshold', () => {
            let state3 = jobs(stateClass, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'type'}, value: DURATION}
            });
            state3 = jobs(state3, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'threshold_type'}, value: THRESHOLD_CUSTOM}
            });
            state3 = jobs(state3, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'threshold', isNumber: true}, value: '100'}
            });
            expect(state3.labelling).toEqual({type: DURATION, threshold_type: THRESHOLD_CUSTOM, threshold: 100});
            expect(state3.filteredIds).toEqual([75]);
            expect(state3.thresholds).toEqual([0, 100]);
        });

        it('filters for attribute names', () => {
            let state34 = jobs(stateClass, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'type'}, value: ATTRIBUTE_NUMBER}
            });
            state34 = jobs(state34, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'threshold_type'}, value: THRESHOLD_MEAN}
            });
            state34 = jobs(state34, {
                type: FILTER_LABEL_CHANGED,
                payload: {config: {methodConfig: 'labelling', key: 'attribute_name'}, value: 'name'}
            });
            expect(state34.labelling).toMatchObject({
                type: ATTRIBUTE_NUMBER,
                threshold_type: THRESHOLD_MEAN,
                attribute_name: 'name'
            });
            expect(state34.filteredIds).toEqual([76]);
            expect(state34.attributeNames).toEqual(['name']);
        });
    });

    describe('Decoded dataframe list requested', () => {
        const stateWithRequest = jobs(undefined, decodingRequested());

        it('changes fetchState when decoded dataframe requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: false});
            expect(stateWithRequest.isDecodingLoaded).toEqual(false);
        });

        it('changes fetchState when decoded dataframe completed', () => {
            const state2 = jobs(stateWithRequest, decodingtRetrieved([12, 12]));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isDecodingLoaded).toEqual(true);
            const {decodedDf} = state2;
            expect(decodedDf).toEqual([12, 12]);
        });

        it('changes fetchState when decoded dataframe request failed', () => {
            const state2 = jobs(stateWithRequest, decodingFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isDecodingLoaded).toEqual(true);
        });
    });

    describe('Encoded unique values list requested', () => {
        const stateWithRequest = jobs(undefined, encodedUniqueValuesRequested());

        it('changes fetchState when en encoded unique values requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: false});
            expect(stateWithRequest.isEncodedUniqueValuesLoaded).toEqual(false);
        });

        it('changes fetchState when encoded unique values completed', () => {
            const state2 = jobs(stateWithRequest, encodedUniqueValuesRetrieved([12, 12]));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isEncodedUniqueValuesLoaded).toEqual(true);
            const {encodedUniqueValues} = state2;
            expect(encodedUniqueValues).toEqual([12, 12]);
        });

        it('changes fetchState when encoded unique values request failed', () => {
            const state2 = jobs(stateWithRequest, encodedUniqueValuesFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isEncodedUniqueValuesLoaded).toEqual(true);
        });
    });
});
