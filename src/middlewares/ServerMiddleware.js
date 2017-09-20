import {getJobs} from '../actions/ServerActions';
import {JOBS_REQUESTED} from '../actions/JobActions';

const ACTION_TYPE_TO_SERVER_ACTION = {
  [JOBS_REQUESTED]: getJobs
};

const serverMiddleware = (store) => (next) => (action) => {
  const serverAction = ACTION_TYPE_TO_SERVER_ACTION[action.type];
  if (serverAction) {
    serverAction(action.payload)(store.dispatch);
  }
  return next(action);
};

export default serverMiddleware;
