/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const MODELS_REQUESTED = 'MODELS_REQUESTED';
export const modelsRequested = createPayloadForwardingAction(MODELS_REQUESTED);

export const MODELS_RETRIEVED = 'MODELS_RETRIEVED';
export const modelsRetrieved = createPayloadForwardingAction(MODELS_RETRIEVED);

export const MODELS_FAILED = 'MODELS_FAILED';
export const modelsFailed = createPayloadForwardingAction(MODELS_FAILED);

export const REG_MODEL_CHANGED = 'REG_MODEL_CHANGED';
export const regModelChanged = createPayloadForwardingAction(REG_MODEL_CHANGED);

export const CLAS_MODEL_CHANGED = 'CLAS_MODEL_CHANGED';
export const clasModelChanged = createPayloadForwardingAction(CLAS_MODEL_CHANGED);

export const NA_MODEL_CHANGED = 'NA_MODEL_CHANGED';
export const nAModelChanged = createPayloadForwardingAction(NA_MODEL_CHANGED);

export const MODEL_CHANGED = 'MODEL_CHANGED';
export const modelChanged = createPayloadForwardingAction(MODEL_CHANGED);

export const FILTER_METHOD_CHANGED = 'FILTER_PREDICTION_METHOD_CHANGED';
