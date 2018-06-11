import {TRACE_LIST_FAILED, TRACE_LIST_REQUESTED, TRACE_LIST_RETRIEVED} from '../actions/TraceActions';

const initialState = {
  fetchState: {inFlight: false},
  byId: [],
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
          byId: action.payload,
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
