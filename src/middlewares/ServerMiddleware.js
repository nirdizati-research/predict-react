import {getJobs, getLogInfo, getLogList} from '../actions/ServerActions';
import {JOBS_REQUESTED} from '../actions/JobActions';
import {LOG_INFO_REQUESTED, LOG_LIST_REQUESTED} from '../actions/LogActions';

const ACTION_TYPE_TO_SERVER_ACTION = {
  [JOBS_REQUESTED]: getJobs,
  [LOG_LIST_REQUESTED]: getLogList,
  [LOG_INFO_REQUESTED]: getLogInfo
};

const serverMiddleware = (store) => (next) => (action) => {
  const serverAction = ACTION_TYPE_TO_SERVER_ACTION[action.type];
  if (serverAction) {
    serverAction(action.payload)(store.dispatch);
  }
  return next(action);
};

export default serverMiddleware;
