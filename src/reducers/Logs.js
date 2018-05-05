/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {LOG_LIST_FAILED, LOG_LIST_REQUESTED, LOG_LIST_RETRIEVED} from '../actions/LogActions';

const initialState = {
  fetchState: {inFlight: false},
  logs: {
    byId: {},
    allIds: []
  }
};

// replace current state with new list
const addLogs = (logList) => {
  const allIds = logList.map(({id}) => id);
  const byId = Object.assign(...logList.map((log) => ({[log.id]: log})));
  return {allIds, byId};
};

const logs = (state = initialState, action) => {
    switch (action.type) {
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
          logs: addLogs(action.payload)
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
