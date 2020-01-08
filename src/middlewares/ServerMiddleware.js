import {
    deleteJob,
    getJobs,
    getLogInfo,
    getLogList,
    getModels,
    postPrediction,
    postReplay,
    getSplits,
    getTraceList,
    postSplit,
    postTraining,
    getLimeValues,
    getPredictionValues
} from '../actions/ServerActions';
import {JOB_DELETE_REQUESTED, JOBS_REQUESTED, TRAINING_SUBMITTED} from '../actions/JobActions';
import {TRACE_LIST_REQUESTED} from '../actions/TraceActions';
import {LOG_INFO_REQUESTED, LOG_LIST_REQUESTED} from '../actions/LogActions';
import {LIME_VALUE_LIST_REQUESTED} from '../actions/LimeActions';
import {SPLIT_SUBMITTED, SPLITS_REQUESTED} from '../actions/SplitActions';
import {MODELS_REQUESTED} from '../actions/ModelActions';
import {PREDICTION_SUBMITTED, REPLAY_SUBMITTED} from '../actions/RuntimeActions';
import { PREDICTION_LIST_REQUESTED } from '../actions/PredictionAction';

const ACTION_TYPE_TO_SERVER_ACTION = {
    [JOBS_REQUESTED]: getJobs,
    [LOG_LIST_REQUESTED]: getLogList,
    [TRACE_LIST_REQUESTED]: getTraceList,
    [LOG_INFO_REQUESTED]: getLogInfo,
    [TRAINING_SUBMITTED]: postTraining,
    [SPLITS_REQUESTED]: getSplits,
    [SPLIT_SUBMITTED]: postSplit,
    [PREDICTION_SUBMITTED]: postPrediction,
    [REPLAY_SUBMITTED]: postReplay,
    [MODELS_REQUESTED]: getModels,
    [JOB_DELETE_REQUESTED]: deleteJob,
    [LIME_VALUE_LIST_REQUESTED]: getLimeValues,
    [PREDICTION_LIST_REQUESTED]: getPredictionValues,

};

const serverMiddleware = (store) => (next) => (action) => {
    const serverAction = ACTION_TYPE_TO_SERVER_ACTION[action.type];
    if (serverAction) {
        serverAction(action.payload)(store.dispatch);
    }
    return next(action);
};

export default serverMiddleware;
