import {TRACE_LIST_FAILED, TRACE_LIST_REQUESTED, TRACE_LIST_RETRIEVED, TRACE_UPDATED,
  TRACE_COMPLETED} from '../actions/TraceActions';

const initialState = {
  fetchState: {inFlight: false},
  changed: 0,
  byId: [],
  interResults: [],
  finalDiff: [],

};

function getIntermediateResults(array, interResults) {
  // eslint-disable-next-line
  array.map(function (trace) {
    if (trace.n_events === 3) {
      // eslint-disable-next-line
      interResults = addToSet(interResults, {id: trace.id, duration: (parseInt(trace.reg_results) + parseInt(trace.duration)),
        class_results: trace.class_results});
    }
  });
  return interResults;
}

function calculateFinalDiff(trace, finalDiff) {
  const iFin = myIndexOf(finalDiff, trace);
  if (iFin === -1) {
    finalDiff.push({id: trace.id, diff: trace.duration, class_actual: trace.class_actual});
  } else {
    finalDiff[iFin] = {id: trace.id, diff: trace.duration, class_actual: trace.class_actual};
  }
  return finalDiff;
}

function compare(a, b) {
  const idA = a.id;
  const idB = b.id;

  let comparison = 0;
  if (idA > idB) {
    comparison = 1;
  } else if (idA < idB) {
    comparison = -1;
  }
  return comparison;
}

export function myIndexOf(arr, o) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === o.id) {
            return i;
        }
    }
    return -1;
}

function addToSet(array, object) {
  const index = myIndexOf(array, object);
  if (index === -1) array.push(object);
  else array[index] = object;
  return array;
}

const traces = (state = initialState, action) => {
    switch (action.type) {
      case TRACE_LIST_REQUESTED: {
        return {
          ...state,
          fetchState: {inFlight: true},
          changed: 0,
        };
      }

      case TRACE_LIST_RETRIEVED: {
        const byId = action.payload;
        byId.sort(compare);
        return {
          ...state,
          fetchState: {inFlight: false},
          byId,
          changed: 1,
        };
      }

      case TRACE_LIST_FAILED: {
        return {
          ...state,
          fetchState: {inFlight: false, error: action.payload},
        };
      }

      case TRACE_UPDATED: {
        const byId = addToSet(state.byId, action.payload);
        const interResults = getIntermediateResults(byId, state.interResults);
        const changed = 1 - state.changed;
        byId.sort(compare);
        return {...state, byId, changed, interResults};
      }

      case TRACE_COMPLETED: {
        const byId = addToSet(state.byId, action.payload);
        const finalDiff = calculateFinalDiff(action.payload, state.finalDiff);
        const changed = 1 - state.changed;
        byId.sort(compare);
        return {...state, byId, changed, finalDiff};
      }

      default:
        return state;
    }
  }
;

export default traces;
