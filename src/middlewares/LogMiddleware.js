/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import {CHANGE_VISIBLE_LOG, logInfoRequested} from '../actions/LogActions';

const checkIfNoTraces = (logId, state) => {
  const first = state.logs.logs.find((log) => log.id === logId);
  return first !== undefined && Object.keys(first.events).length === 0;
};

const infoPayload = (logId, infoType) => {
  return {logId, infoType};
};

// Download logs for visible log if needed
const logMiddleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_VISIBLE_LOG && action.payload.requestInfo) {
    if (checkIfNoTraces(action.payload.logId, store.getState())) {
      store.dispatch(logInfoRequested(infoPayload(action.payload.logId, 'events')));
      store.dispatch(logInfoRequested(infoPayload(action.payload.logId, 'resources')));
      store.dispatch(logInfoRequested(infoPayload(action.payload.logId, 'executions')));
    }
  }
  return next(action);
};

export default logMiddleware;
