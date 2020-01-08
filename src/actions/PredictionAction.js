import {createPayloadForwardingAction} from './index';
export const PREDICTION_LIST_REQUESTED = 'PREDICTION_LIST_REQUESTED';
export const predictionListRequested = createPayloadForwardingAction(PREDICTION_LIST_REQUESTED);
export const PREDICTION_LIST_RETRIEVED = 'PREDICTION_LIST_RETRIEVED';
export const predictionListRetrieved = createPayloadForwardingAction(PREDICTION_LIST_RETRIEVED);
export const PREDICTION_LIST_FAILED = 'PREDICTION_LIST_FAILED';
export const predictionListFailed = createPayloadForwardingAction(PREDICTION_LIST_FAILED);
