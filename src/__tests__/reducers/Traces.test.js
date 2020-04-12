/**
 * Created by tonis.kasekamp on 02/07/18.
 */

import traces from '../../reducers/Traces';
import {traceListFailed, traceListRequested, traceListRetrieved,
     TRACE_UPDATED, TRACE_COMPLETED} from '../../actions/TraceActions';

const traceList = [{
    id: 5,
    xlog: {
        id: 4,
        config: '{"creator": "Fluxicon Nitro", "AMOUNT": "300"}'
    },
    real_log: 2,
    config: '{"concept:name": "5", "creator": "Fluxicon Nitro", "AMOUNT": "300"}',
    first_event: '2011-01-06T08:02:00Z',
    last_event: '2011-01-24T13:56:00Z',
    n_events: 13,
    reg_model: null,
    class_model: {
        id: 23,
        split: {
            id: 4,
            type: 'noCluster',
            model_path: 'model_cache/split_1-model-classification.sav',
            estimator_path: null
        },
        type: 'classification',
        log: {
            id: 1,
            name: 'general_example.xes',
            properties: {
                events: {
                    '2010-12-30': 7,
                    '2010-12-31': 1,
                    '2011-01-05': 2,
                    '2011-01-06': 8,
                    '2011-01-07': 5,
                    '2011-01-08': 4,
                    '2011-01-09': 2,
                    '2011-01-10': 1,
                    '2011-01-11': 1,
                    '2011-01-12': 1,
                    '2011-01-14': 1,
                    '2011-01-15': 1,
                    '2011-01-16': 2,
                    '2011-01-19': 1,
                    '2011-01-20': 1,
                    '2011-01-21': 2,
                    '2011-01-23': 1,
                    '2011-01-24': 1
                },
                resources: {
                    '2010-12-30': 4,
                    '2010-12-31': 1,
                    '2011-01-05': 2,
                    '2011-01-06': 5,
                    '2011-01-07': 3,
                    '2011-01-08': 3,
                    '2011-01-09': 1,
                    '2011-01-10': 1,
                    '2011-01-11': 1,
                    '2011-01-12': 1,
                    '2011-01-14': 1,
                    '2011-01-15': 1,
                    '2011-01-16': 1,
                    '2011-01-19': 1,
                    '2011-01-20': 1,
                    '2011-01-21': 2,
                    '2011-01-23': 1,
                    '2011-01-24': 1
                },
                newTraces: {
                    '2010-12-30': 3,
                    '2011-01-06': 3
                },
                maxEventsInLog: 13,
                traceAttributes: [
                    {
                        name: 'creator',
                        type: 'string',
                        example: 'Fluxicon Nitro'
                    }
                ]
            }
        },
        config: {
            'encoding': {
                padding: 'zero_padding',
                generation_type: 'up_to',
                prefix_length: 13,
                method: 'simpleIndex'
            },
            'label': {
                type: 'duration',
                attribute_name: '',
                threshold_type: 'threshold_mean',
                threshold: 0,
                add_remaining_time: false,
                add_elapsed_time: false,
                add_executed_events: false,
                add_resources_used: false,
                add_new_traces: false
            },
            'create_models': true,
            'hyperopt': {
                use_hyperopt: false,
                max_evals: 10,
                performance_metric: 'acc'
            },
            'classification.decisionTree': {
                max_depth: null,
                min_samples_split: 2,
                min_samples_leaf: 1,
                random_state: 21
            },
            'clustering': 'noCluster',
            'method': 'decisionTree'
        }
    },
    reg_results: {},
    class_results: [
        false
    ]
}];

const initState = {fetchState: {inFlight: false}, byId: [], changed: 0, finalDiff: [], interResults: []};

describe('TraceList', () => {
    it('has nothing initially', () => {
        expect(traces(undefined, {})).toEqual(initState);
    });

    it('changes fetchState when requesting', () => {
        const state = traces(undefined, traceListRequested());
        expect(state).toEqual({
            fetchState: {inFlight: true}, byId: [],
            finalDiff: [], changed: 0, interResults: []
        });
    });

    it('adds splits when request completed', () => {
        const state = traces(undefined, traceListRequested());
        const state2 = traces(state, traceListRetrieved(traceList));
        expect(state2.fetchState).toEqual({inFlight: false});
        expect(Object.keys(state2.byId).length).toEqual(1);
        expect(state2.byId[0].real_log).toBe(2);
    });
    it('stores error message', () => {
        const state = traces(undefined, traceListRequested());
        const state2 = traces(state, traceListFailed('error'));
        expect(state2).toEqual({
            byId: [], fetchState: {inFlight: false, error: 'error'},
            finalDiff: [], changed: 0, interResults: []
        });
    });
    it('stores error message', () => {
        const state = traces(undefined, traceListRequested());
        const state2 = traces(state, traceListFailed('error'));
        expect(state2).toEqual({
            byId: [], fetchState: {inFlight: false, error: 'error'},
            finalDiff: [], changed: 0, interResults: []
        });
    });

    it('Trace update', () => {
        const state = traces(undefined, traceListRequested());
        const state2 = traces(state, {type: TRACE_UPDATED, byId: [], payload: traceList});
        expect(state2).toEqual({
            byId: [traceList], fetchState: {inFlight: true},
            finalDiff: [], changed: 1, interResults: []
        });
    });

    it('Trace completed', () => {
        const state = traces(undefined, traceListRequested());
        const state2 = traces(state, {type: TRACE_COMPLETED, byId: [], payload: traceList});
        expect(state2).toEqual({
            byId: [traceList], fetchState: {inFlight: true},
            finalDiff: [{'class_actual': undefined, 'diff': undefined, 'id': undefined}], changed: 1, interResults: []
        });
    });
});
