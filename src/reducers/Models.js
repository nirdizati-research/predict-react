import {MODELS_FAILED, MODELS_REQUESTED, MODELS_RETRIEVED} from '../actions/ModelActions';
import {REPLAY_JOB_CHANGED} from '../actions/JobActions';
import {LOG_CHANGED} from '../actions/LogActions';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../reference';

const initialState = {
    fetchState: {inFlight: false},
    models: [],
    logId: 0,
    jobSelected: 0,
    regressionModels: [],
    classificationModels: [],
    timeSeriesPredictionModels: [],
    pLength: 0,
};

const filterModels = (modelstmp, plength, method) => {
    const models = modelstmp.filter((model) => (model.type === method));
    return models.filter((model) => (model.config.encoding.prefix_length === plength)
        || (((model.config.padding === 'all_in_one') || (model.config.padding === 'zero_padding')) &&
            (model.config.encoding.prefix_length >= plength)));
};

const mergeIncomingModels = (incoming, existing) => {
    // From https://stackoverflow.com/a/34963663
    const mergedIncoming = existing.concat(incoming).reduce((acc, x) => {
        acc[x.id] = Object.assign(acc[x.id] || {}, x);
        return acc;
    }, {});
    return Object.keys(mergedIncoming).map((key) => mergedIncoming[key]);
};

const models = (state = initialState, action) => {
    switch (action.type) {
        case MODELS_REQUESTED: {
            return {
                ...state,
                fetchState: {inFlight: true},
            };
        }

        case MODELS_RETRIEVED: {
            const models = mergeIncomingModels(action.payload, state.models);
            const regressionModels = models.filter((model) => (
                model.config.predictive_model['predictive_model'] === REGRESSION));
            const classificationModels = models.filter((model) => (
                model.config.predictive_model['predictive_model'] === CLASSIFICATION));
            const timeSeriesPredictionModels = models.filter((model) => (
                model.config.predictive_model['predictive_model'] === TIME_SERIES_PREDICTION));
            return {
                ...state,
                fetchState: {inFlight: false},
                models: models,
                regressionModels: regressionModels,
                classificationModels: classificationModels,
                timeSeriesPredictionModels: timeSeriesPredictionModels,
            };
        }

        case MODELS_FAILED: {
            return {
                ...state,
                fetchState: {inFlight: false, error: action.payload},
            };
        }

        case REPLAY_JOB_CHANGED: {
            const jobSelected = action.jobId;
            return {
                ...state,
                jobSelected,
            };
        }

        case LOG_CHANGED: {
            const logId = action.logId;
            const regressionModels = filterModels(state.models, action.pLength, REGRESSION);
            const classificationModels = filterModels(state.models, action.pLength, CLASSIFICATION);
            const timeSeriesPredictionModels = filterModels(state.models, action.pLength, TIME_SERIES_PREDICTION);
            const pLength = action.pLength;

            return {
                ...state,
                logId,
                regressionModels: regressionModels,
                classificationModels,
                timeSeriesPredictionModels,
                pLength,
            };
        }

        default:
            return state;
    }
};

export default models;
