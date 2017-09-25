/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {CHANGE_VISIBLE_LOG, LOG_LIST_FAILED, LOG_LIST_REQUESTED, LOG_LIST_RETRIEVED} from '../actions/LogActions';

const initialState = {
  fetchState: {inFlight: false},
  logs: []
};

const createLogObjects = (logNames) => {
  return logNames.map((name) => {
    return {
      name: name,
      fetchState: {inFlight: false},
      visible: false
    };
  });
};

const logs = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_VISIBLE_LOG: {
        const resetLogs = state.logs.map((log) => {
          if (log.name === action.payload.log) {
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

      case
      LOG_LIST_REQUESTED: {
        return {
          ...state,
          fetchState: {inFlight: true},
        };
      }

      case
      LOG_LIST_RETRIEVED: {
        return {
          ...state,
          fetchState: {inFlight: false},
          logs: createLogObjects(action.payload)
        };
      }

      case
      LOG_LIST_FAILED: {
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
