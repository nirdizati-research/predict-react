/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const LOG_LIST_REQUESTED = 'LOG_LIST_REQUESTED';
export const logListRequested = createPayloadForwardingAction(LOG_LIST_REQUESTED);

export const LOG_LIST_RETRIEVED = 'LOG_LIST_RETRIEVED';
export const logListsRetrieved = createPayloadForwardingAction(LOG_LIST_RETRIEVED);

export const LOG_LIST_FAILED = 'LOG_LIST_FAILED';
export const logListFailed = createPayloadForwardingAction(LOG_LIST_FAILED);
