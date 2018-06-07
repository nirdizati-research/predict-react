import {createPayloadForwardingAction} from './index';

export const MODELS_REQUESTED = 'MODELS_REQUESTED';
export const modelsRequested = createPayloadForwardingAction(MODELS_REQUESTED);

export const MODELS_RETRIEVED = 'MODELS_RETRIEVED';
export const modelsRetrieved = createPayloadForwardingAction(MODELS_RETRIEVED);

export const MODELS_FAILED = 'MODELS_FAILED';
export const modelsFailed = createPayloadForwardingAction(MODELS_FAILED);

export const REG_MODEL_CHANGED = 'REG_MODEL_CHANGED';
export const CLAS_MODEL_CHANGED = 'CLAS_MODEL_CHANGED';
export const MODEL_CHANGED = 'MODEL_CHANGED';
