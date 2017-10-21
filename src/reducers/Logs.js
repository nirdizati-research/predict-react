/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {
  CHANGE_VISIBLE_LOG, LOG_INFO_FAILED, LOG_INFO_RETRIEVED, LOG_LIST_FAILED, LOG_LIST_REQUESTED,
  LOG_LIST_RETRIEVED
} from '../actions/LogActions';

const initialState = {
  fetchState: {inFlight: false},
  logs: []
};

const dummy = (name) => {
  return {
    name: name,
    fetchState: {inFlight: false},
    visible: false,
    events: {},
    resources: {},
    traces: {}
  };
};

const mergeIncomingLogs = (logNames, existingLogs) => {
  return logNames.map((name) => {
    const log = (existingLogs.find((exLog) => exLog.name === name));
    if (log) {
      return log;
    } else {
      return dummy(name);
    }
  });
};

const addData = (log, data, infoType) => {
  log[infoType] = data;
  return log;
};

const logs = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_VISIBLE_LOG: {
        const resetLogs = state.logs.map((log) => {
          if (log.name === action.payload.logName) {
            return {...log, visible: true};
          } else {
            return {...log, visible: false};
          }
        });

        return {
          ...state,
          logs: resetLogs
        };
      }

      case LOG_INFO_RETRIEVED: {
        const logs = state.logs.map((log) => {
          if (log.name === action.payload.logName) {
            return addData(log, action.payload.data, action.payload.infoType);
          } else {
            return log;
          }
        });

        return {...state, logs};
      }

      // Only fail. no inFlight for log itself
      case LOG_INFO_FAILED: {
        const logs = state.logs.map((log) => {
          if (log.name === action.payload.logName) {
            return {...log, fetchState: {inFlight: false, error: action.payload.error}};
          } else {
            return log;
          }
        });

        return {...state, logs};
      }

      case LOG_LIST_REQUESTED: {
        return {
          ...state,
          fetchState: {inFlight: true},
        };
      }

      case LOG_LIST_RETRIEVED: {
        return {
          ...state,
          fetchState: {inFlight: false},
          logs: mergeIncomingLogs(action.payload, state.logs)
        };
      }

      case LOG_LIST_FAILED: {
        return {
          ...state,
          fetchState: {inFlight: false, error: action.payload},
        };
      }
      default:
        return state;
    }
  }
;

export default logs;
