/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const CHANGE_VISIBLE_LOG = 'CHANGE_VISIBLE_LOG';
export const changeVisibleLog = createPayloadForwardingAction(CHANGE_VISIBLE_LOG);

export const LOG_LIST_REQUESTED = 'LOG_LIST_REQUESTED';
export const logListRequested = createPayloadForwardingAction(LOG_LIST_REQUESTED);

export const LOG_LIST_RETRIEVED = 'LOG_LIST_RETRIEVED';
export const logListsRetrieved = createPayloadForwardingAction(LOG_LIST_RETRIEVED);

export const LOG_LIST_FAILED = 'LOG_LIST_FAILED';
export const logListFailed = createPayloadForwardingAction(LOG_LIST_FAILED);

export const LOG_INFO_REQUESTED = 'LOG_INFO_REQUESTED';
export const logInfoRequested = createPayloadForwardingAction(LOG_INFO_REQUESTED);

export const LOG_INFO_RETRIEVED = 'LOG_INFO_RETRIEVED';
export const logInfoRetrieved = createPayloadForwardingAction(LOG_INFO_RETRIEVED);

export const LOG_INFO_FAILED = 'LOG_INFO_FAILED';
export const logInfoFailed = createPayloadForwardingAction(LOG_INFO_FAILED);

export const LOG_CHANGED = 'LOG_CHANGED';
export const logChanged = createPayloadForwardingAction(LOG_CHANGED);
