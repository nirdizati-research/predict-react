/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import {createPayloadForwardingAction} from './index';

export const JOBS_REQUESTED = 'JOBS_REQUESTED';
export const jobsRequested = createPayloadForwardingAction(JOBS_REQUESTED);

export const JOBS_RETRIEVED = 'JOBS_RETRIEVED';
export const jobsRetrieved = createPayloadForwardingAction(JOBS_RETRIEVED);

export const JOBS_FAILED = 'JOBS_FAILED';
export const jobsFailed = createPayloadForwardingAction(JOBS_FAILED);

export const TRAINING_SUBMITTED = 'TRAINING_SUBMITTED';
export const submitTraining = createPayloadForwardingAction(TRAINING_SUBMITTED);

export const TRAINING_SUCCEEDED = 'TRAINING_SUCCEEDED';
export const trainingSucceeded = createPayloadForwardingAction(TRAINING_SUCCEEDED);

export const TRAINING_FAILED = 'TRAINING_FAILED';
export const trainingFailed = createPayloadForwardingAction(TRAINING_FAILED);

export const FILTER_SPLIT_CHANGED = 'FILTER_SPLIT_CHANGED';
export const PREDICTION_SPLIT_CHANGED = 'PREDICTION_SPLIT_CHANGED';
export const REPLAY_SPLIT_CHANGED = 'REPLAY_SPLIT_CHANGED';
export const FILTER_PREDICTION_METHOD_CHANGED = 'FILTER_PREDICTION_METHOD_CHANGED';
export const FILTER_PREFIX_LENGTH_CHANGED = 'FILTER_PREFIX_LENGTH_CHANGED';
export const FILTER_OPTION_CHANGED = 'FILTER_OPTION_CHANGED';
export const FILTER_LABEL_CHANGED = 'FILTER_LABEL_CHANGED';

export const JOB_DELETE_REQUESTED = 'JOB_DELETE_REQUESTED';
export const JOB_DELETED = 'JOB_DELETED';

export const JOB_UPDATED = 'JOB_UPDATED';
