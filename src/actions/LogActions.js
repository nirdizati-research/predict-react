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

export const LOG_TRACES_REQUESTED = 'LOG_TRACES_REQUESTED';
export const logTracesRequested = (log) => (
  {
    type: LOG_TRACES_REQUESTED,
    payload: {
      log
    }
  }
);

export const LOG_TRACES_RETRIEVED = 'LOG_TRACES_RETRIEVED';
export const logTracesRetrieved = createPayloadForwardingAction(LOG_TRACES_RETRIEVED);

export const LOG_TRACES_FAILED = 'LOG_TRACES_FAILED';
export const logTracesFailed = createPayloadForwardingAction(LOG_TRACES_FAILED);
