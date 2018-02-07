import {
  getJobResults, getJobs, getLogInfo, getLogList, getSplits, postSplit,
  postTraining
} from '../actions/ServerActions';
import {JOB_RESULTS_REQUESTED, JOBS_REQUESTED, TRAINING_SUBMITTED} from '../actions/JobActions';
import {LOG_INFO_REQUESTED, LOG_LIST_REQUESTED} from '../actions/LogActions';
import {SPLIT_SUBMITTED, SPLITS_REQUESTED} from '../actions/SplitActions';

const ACTION_TYPE_TO_SERVER_ACTION = {
  [JOBS_REQUESTED]: getJobs,
  [JOB_RESULTS_REQUESTED]: getJobResults,
  [LOG_LIST_REQUESTED]: getLogList,
  [LOG_INFO_REQUESTED]: getLogInfo,
  [TRAINING_SUBMITTED]: postTraining,
  [SPLITS_REQUESTED]: getSplits,
  [SPLIT_SUBMITTED]: postSplit
};

const serverMiddleware = (store) => (next) => (action) => {
  const serverAction = ACTION_TYPE_TO_SERVER_ACTION[action.type];
  if (serverAction) {
    serverAction(action.payload)(store.dispatch);
  }
  return next(action);
};

export default serverMiddleware;
