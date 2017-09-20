/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const JOBS_REQUESTED = 'JOBS_REQUESTED';
export const jobsRequested = createPayloadForwardingAction(JOBS_REQUESTED);

export const JOBS_RETRIEVED = 'JOBS_RETRIEVED';
export const jobsRetrieved = createPayloadForwardingAction(JOBS_RETRIEVED);

export const JOBS_FAILED = 'PROTOTYPES_FAILED';
export const jobsFailed = createPayloadForwardingAction(JOBS_FAILED);