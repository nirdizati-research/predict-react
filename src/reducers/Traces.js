import {TRACE_LIST_FAILED, TRACE_LIST_REQUESTED, TRACE_LIST_RETRIEVED, TRACE_UPDATED, TRACE_COMPLETED} from '../actions/TraceActions';

const initialState = {
  fetchState: {inFlight: false},
  changed: 0,
  byId: [],
  inter_results: [],
  final_diff: [],

};

function getIntermediateResults(array, inter_results) {
  array.map(function(trace) {
    if(trace.n_events === 3)
    inter_results = addToSet(inter_results, {id:trace.id, duration:trace.reg_results + trace.duration, class_results: trace.class_results});
  } )
  return inter_results;
};

function calculateFinalDiff(trace, final_diff) {
  const iFin = myIndexOf(final_diff, trace);
  if (iFin === -1){
    final_diff.push({id:trace.id, diff:trace.duration, class_actual:trace.class_actual});
  }
  else{
    final_diff[iFin] = {id:trace.id, diff:trace.duration, class_actual:trace.class_actual};
  }
  return final_diff
}

function compare (a, b) {
    const idA = a.id;
    const idB = b.id;

    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
};

export function myIndexOf(arr, o) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === o.id) {
            return i;
        }
    }
    return -1;
}

function addToSet (array, object) {
  const index = myIndexOf(array, object);
  if(index === -1) array.push(object);
  else array[index] = object;
  return array;
};

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
          changed:1,
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
        const inter_results = getIntermediateResults(byId, state.inter_results);
        const changed = 1 - state.changed;
        byId.sort(compare);
        return {...state, byId, changed, inter_results};
      }

      case TRACE_COMPLETED: {
        const byId = addToSet(state.byId, action.payload);
        const final_diff = calculateFinalDiff(action.payload, state.final_diff);
        const changed = 1 - state.changed;
        byId.sort(compare);
        return {...state, byId, changed, final_diff}
      }

      default:
        return state;
    }
  }
;

export default traces;
