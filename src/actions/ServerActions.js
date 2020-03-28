import {SERVER_URL} from '../constants';
import jsonAjax from '../JSONAjaxRequest';
import {JOB_DELETED, jobsFailed, jobsRetrieved, trainingFailed, trainingSucceeded} from './JobActions';
import {logInfoFailed, logInfoRetrieved, logListFailed, logListsRetrieved} from './LogActions';
import {traceListFailed, traceListRetrieved} from './TraceActions';
import {limeValueListFailed, limeValueListRetrieved} from './LimeActions';
import {splitFailed, splitsFailed, splitsRetrieved, splitSucceeded} from './SplitActions';
import {modelsFailed, modelsRetrieved} from './ModelActions';
import {predictionFailed, predictionSucceeded, replayFailed, replaySucceeded} from './RuntimeActions';
import {temporalLimePredictionListRetrieved, temporalLimePredictionListFailed,
    temporalPredictionListRetrieved, temporalPredictionListFailed} from './PredictionAction';

export const getJobs = () => (dispatch) => {
    jsonAjax(
        SERVER_URL + '/jobs/',
        'GET',
        null,
        (jobs) => dispatch(jobsRetrieved(jobs)),
        ({error}) => dispatch(jobsFailed(error))
    );
};

export const getLogList = () => (dispatch) => {
    jsonAjax(
        SERVER_URL + '/logs/',
        'GET',
        null,
        (logList) => {
            dispatch(logListsRetrieved(logList));
        },
        ({error}) => dispatch(logListFailed(error))
    );
};

// Legacy endpoint
// Not used
export const getLogInfo = ({logId, infoType}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/logs/${logId}/${infoType}`,
        'GET',
        null,
        (data) => dispatch(logInfoRetrieved({logId, infoType, data})),
        ({error}) => dispatch(logInfoFailed({logId, error}))
    );
};

export const postTraining = (payload) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/jobs/multiple`,
        'POST',
        payload,
        (jobs) => dispatch(trainingSucceeded(jobs)),
        ({error}) => dispatch(trainingFailed(error))
    );
};

export const getSplits = () => (dispatch) => {
    jsonAjax(
        SERVER_URL + '/splits/',
        'GET',
        null,
        (splits) => dispatch(splitsRetrieved(splits)),
        ({error}) => dispatch(splitsFailed(error))
    );
};

export const postSplit = (payload) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/splits/`,
        'POST',
        payload,
        (split) => dispatch(splitSucceeded(split)),
        ({error}) => dispatch(splitFailed(error))
    );
};

export const deleteJob = ({id}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/jobs/${id}`,
        'DELETE',
        null,
        () => dispatch({type: JOB_DELETED, id: id}),
        ({error}) => {
        }
    );
};

// Runtime prediction

export const getModels = () => (dispatch) => {
    jsonAjax(
        SERVER_URL + '/runtime/models/',
        'GET',
        null,
        (models) => dispatch(modelsRetrieved(models)),
        ({error}) => dispatch(modelsFailed(error))
    );
};

export const postPrediction = ({payload}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/runtime/prediction/`,
        'POST',
        payload,
        (job) => dispatch(predictionSucceeded(job)),
        ({error}) => dispatch(predictionFailed(error))
    );
};

export const postReplay = ({payload}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/runtime/replay/`,
        'POST',
        payload,
        (job) => dispatch(replaySucceeded(job)),
        ({error}) => dispatch(replayFailed(error))
    );
};

export const getTraceList = ({id}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/logs/${id}/traces`,
        'GET',
        null,
        (logList) => {
            dispatch(traceListRetrieved(logList));
        },
        ({error}) => dispatch(traceListFailed(error))
    );
};

export const getLimeValues = ({jobId, traceId}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/explanation/lime/${jobId}&${traceId}/`,
        'GET',
        null,
        (limeList) => {
            dispatch(limeValueListRetrieved(limeList));
        },
        ({error}) => dispatch(limeValueListFailed(error))
    );
};

export const getLimeTemporalStabilityValues = ({jobId, traceId}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/explanation/lime_temporal_stability/${jobId}&${traceId}/`,
        'GET',
        null,
        (predictionList) => {
            dispatch(temporalLimePredictionListRetrieved(predictionList));
        },
        ({error}) => dispatch(temporalLimePredictionListFailed(error))
    );
};

export const getPredictionTemporalStabilityValues = ({jobId, traceId}) => (dispatch) => {
    jsonAjax(
        SERVER_URL + `/explanation/temporal_stability/${jobId}&${traceId}/`,
        'GET',
        null,
        (predictionList) => {
            dispatch(temporalPredictionListRetrieved(predictionList));
        },
        ({error}) => dispatch(temporalPredictionListFailed(error))
    );
};
