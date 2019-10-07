import {createPayloadForwardingAction} from './index';

export const MODELS_REQUESTED = 'MODELS_REQUESTED';
export const modelsRequested = createPayloadForwardingAction(MODELS_REQUESTED);

export const MODELS_RETRIEVED = 'MODELS_RETRIEVED';
export const modelsRetrieved = createPayloadForwardingAction(MODELS_RETRIEVED);

export const MODELS_FAILED = 'MODELS_FAILED';
export const modelsFailed = createPayloadForwardingAction(MODELS_FAILED);

export const MODEL_CHANGED = 'MODEL_CHANGED';
export const REPLAY_MODEL_CHANGED = 'REPLAY_MODEL_CHANGED';
export const PREDICTION_MODEL_CHANGED = 'PREDICTION_MODEL_CHANGED';
