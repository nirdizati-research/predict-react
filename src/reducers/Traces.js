/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {TRACE_LIST_FAILED, TRACE_LIST_REQUESTED, TRACE_LIST_RETRIEVED} from '../actions/TraceActions';

const initialState = {
  fetchState: {inFlight: false},
  byId: [],
};

const mergeIncomingTraces = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
};

const traces = (state = initialState, action) => {
    switch (action.type) {
      case TRACE_LIST_REQUESTED: {
        return {
          ...state,
          fetchState: {inFlight: true},
        };
      }

      case TRACE_LIST_RETRIEVED: {
        return {
          ...state,
          fetchState: {inFlight: false},
          byId: mergeIncomingTraces(action.payload, state.byId)
        };
      }

      case TRACE_LIST_FAILED: {
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

export default traces;
