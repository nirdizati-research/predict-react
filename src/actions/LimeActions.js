import {createPayloadForwardingAction} from './index';
export const LIME_VALUE_LIST_REQUESTED = 'LIME_VALUE_LIST_REQUESTED';
export const limeValueListRequested = createPayloadForwardingAction(LIME_VALUE_LIST_REQUESTED);
export const LIME_VALUE_LIST_RETRIEVED = 'LIME_VALUE_LIST_RETRIEVED';
export const limeValueListRetrieved = createPayloadForwardingAction(LIME_VALUE_LIST_RETRIEVED);
export const LIME_VALUE_LIST_FAILED = 'LIME_VALUE_LIST_FAILED';
export const limeValueListFailed = createPayloadForwardingAction(LIME_VALUE_LIST_FAILED);
