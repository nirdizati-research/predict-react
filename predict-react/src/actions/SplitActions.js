import {createPayloadForwardingAction} from './index';

export const SPLITS_REQUESTED = 'SPLITS_REQUESTED';
export const splitsRequested = createPayloadForwardingAction(SPLITS_REQUESTED);

export const SPLITS_RETRIEVED = 'SPLITS_RETRIEVED';
export const splitsRetrieved = createPayloadForwardingAction(SPLITS_RETRIEVED);

export const SPLITS_FAILED = 'SPLITS_FAILED';
export const splitsFailed = createPayloadForwardingAction(SPLITS_FAILED);

export const SPLIT_SUBMITTED = 'SPLIT_SUBMITTED';
export const submitSplit = createPayloadForwardingAction(SPLIT_SUBMITTED);

export const SPLIT_SUCCEEDED = 'SPLIT_SUCCEEDED';
export const splitSucceeded = createPayloadForwardingAction(SPLIT_SUCCEEDED);

export const SPLIT_FAILED = 'SPLIT_FAILED';
export const splitFailed = createPayloadForwardingAction(SPLIT_FAILED);
