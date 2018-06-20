import {TRACE_LIST_FAILED, TRACE_LIST_REQUESTED, TRACE_LIST_RETRIEVED, TRACE_UPDATED} from '../actions/TraceActions';

const initialState = {
  fetchState: {inFlight: false},
  byId: [],
};

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

function myIndexOf(arr, o) {
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
        };
      }

      case TRACE_LIST_RETRIEVED: {
        const byId = action.payload;
        byId.sort(compare);
        return {
          ...state,
          fetchState: {inFlight: false},
          byId,
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
        byId.sort(compare);
        return {
          ...state,
          byId,
        };
      }

      default:
        return state;
    }
  }
;

export default traces;
