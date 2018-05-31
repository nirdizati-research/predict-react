/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const TRACE_LIST_REQUESTED = 'TRACE_LIST_REQUESTED';
export const traceListRequested = createPayloadForwardingAction(TRACE_LIST_REQUESTED);

export const TRACE_LIST_RETRIEVED = 'TRACE_LIST_RETRIEVED';
export const traceListsRetrieved = createPayloadForwardingAction(TRACE_LIST_RETRIEVED);

export const TRACE_LIST_FAILED = 'TRACE_LIST_FAILED';
export const traceListFailed = createPayloadForwardingAction(TRACE_LIST_FAILED);
