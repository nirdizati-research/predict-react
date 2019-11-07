import {createPayloadForwardingAction} from './index';

export const PREDICTION_SUBMITTED = 'PREDICTION_SUBMITTED';
export const submitPrediction = createPayloadForwardingAction(PREDICTION_SUBMITTED);

export const PREDICTION_SUCCEEDED = 'PREDICTION_SUCCEEDED';
export const predictionSucceeded = createPayloadForwardingAction(PREDICTION_SUCCEEDED);

export const PREDICTION_FAILED = 'PREDICTION_FAILED';
export const predictionFailed = createPayloadForwardingAction(PREDICTION_FAILED);

export const REPLAY_SUBMITTED = 'REPLAY_SUBMITTED';
export const submitReplay = createPayloadForwardingAction(REPLAY_SUBMITTED);

export const REPLAY_SUCCEEDED = 'REPLAY_SUCCEEDED';
export const replaySucceeded = createPayloadForwardingAction(REPLAY_SUCCEEDED);

export const REPLAY_FAILED = 'REPLAY_FAILED';
export const replayFailed = createPayloadForwardingAction(REPLAY_FAILED);

export const JOB_RUN_CHANGED = 'JOB_RUN_CHANGED';
