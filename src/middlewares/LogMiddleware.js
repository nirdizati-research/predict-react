/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import {CHANGE_VISIBLE_LOG, logTracesRequested} from '../actions/LogActions';

// Download logs for visible log if needed
const logMiddleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_VISIBLE_LOG) {
    if (checkIfNoTraces(action.payload.name, store.getState()))
      store.dispatch(logTracesRequested(action.payload.name));
  }
  return next(action);
};

const checkIfNoTraces = (logName, state) => {
  const first = state.logs.logs.find((log) => log.name === logName);
  return Object.keys(first.traces).length === 0;
};

export default logMiddleware;
