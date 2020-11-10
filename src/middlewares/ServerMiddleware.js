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
    getLimeTemporalStabilityValues,
    getShapTemporalStabilityValues,
    getPredictionTemporalStabilityValues,
    getShapValues,
    getIceValues,
    getSkaterValues,
    getDecodingDf,
    getCmFeedbackValues,
    getRetrainValues,
    getEncodedUniqueValues
} from '../actions/ServerActions';
import {JOB_DELETE_REQUESTED, JOBS_REQUESTED, TRAINING_SUBMITTED,
     DECODING_REQUESTED, ENCODED_UNIQUE_VALUES_REQUESTED} from '../actions/JobActions';
import {TRACE_LIST_REQUESTED} from '../actions/TraceActions';
import {LOG_INFO_REQUESTED, LOG_LIST_REQUESTED} from '../actions/LogActions';
import {SHAP_VALUE_LIST_REQUESTED,
     ICE_VALUE_LIST_REQUESTED, SKATER_VALUE_LIST_REQUESTED,
     CMFEEDBACK_VALUE_LIST_REQUESTED, RETRAIN_VALUE_LIST_REQUESTED} from '../actions/ExplanationActions';
import {SPLIT_SUBMITTED, SPLITS_REQUESTED} from '../actions/SplitActions';
import {MODELS_REQUESTED} from '../actions/ModelActions';
import {PREDICTION_SUBMITTED, REPLAY_SUBMITTED} from '../actions/RuntimeActions';
import {TEMPORAL_STABILITY_LIME_PREDICTION_LIST_REQUESTED, TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_REQUESTED,
    TEMPORAL_STABILITY_PREDICTION_LIST_REQUESTED} from '../actions/PredictionAction';

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
    [SHAP_VALUE_LIST_REQUESTED]: getShapValues,
    [ICE_VALUE_LIST_REQUESTED]: getIceValues,
    [SKATER_VALUE_LIST_REQUESTED]: getSkaterValues,
    [TEMPORAL_STABILITY_LIME_PREDICTION_LIST_REQUESTED]: getLimeTemporalStabilityValues,
    [TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_REQUESTED]: getShapTemporalStabilityValues,
    [TEMPORAL_STABILITY_PREDICTION_LIST_REQUESTED]: getPredictionTemporalStabilityValues,
    [DECODING_REQUESTED]: getDecodingDf,
    [ENCODED_UNIQUE_VALUES_REQUESTED]: getEncodedUniqueValues,
    [CMFEEDBACK_VALUE_LIST_REQUESTED]: getCmFeedbackValues,
    [RETRAIN_VALUE_LIST_REQUESTED]: getRetrainValues,
};

const serverMiddleware = (store) => (next) => (action) => {
    const serverAction = ACTION_TYPE_TO_SERVER_ACTION[action.type];
    if (serverAction) {
        serverAction(action.payload)(store.dispatch);
    }
    return next(action);
};

export default serverMiddleware;
