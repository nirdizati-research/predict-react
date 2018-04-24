import {createPayloadForwardingAction} from './index';


export const PREDICTION_SUBMITTED = 'PREDICTION_SUBMITTED';
export const submitPrediction = createPayloadForwardingAction(PREDICTION_SUBMITTED);

export const PREDICTION_SUCCEEDED = 'PREDICTION_SUCCEEDED';
export const predictionSucceeded = createPayloadForwardingAction(PREDICTION_SUCCEEDED);

export const PREDICTION_FAILED = 'PREDICTION_FAILED';
export const predictionFailed = createPayloadForwardingAction(PREDICTION_FAILED);

export const JOB_RUN_CHANGED = 'JOB_RUN_CHANGED';
export const jobRunChanged = createPayloadForwardingAction(JOB_RUN_CHANGED);
