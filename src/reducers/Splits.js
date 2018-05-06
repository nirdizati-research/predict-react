import {
  SPLIT_FAILED,
  SPLIT_SUBMITTED,
  SPLIT_SUCCEEDED,
  SPLITS_FAILED,
  SPLITS_REQUESTED,
  SPLITS_RETRIEVED
} from '../actions/SplitActions';
import {addListToStore, listRetrieved} from './genericHelpers';

const initialState = {
  fetchState: {inFlight: false},
  byId: {},
  allIds: []
};

const splits = (state = initialState, action) => {
  switch (action.type) {
    case SPLITS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }
    case SPLITS_RETRIEVED: {
      return {
        ...state,
        fetchState: {inFlight: false},
        ...listRetrieved(action.payload)
      };
    }
    case SPLITS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }
    case SPLIT_SUBMITTED: {
      return {...state, fetchState: {inFlight: true}};
    }
    case SPLIT_SUCCEEDED: {
      return {
        ...addListToStore(state, [action.payload]),
        fetchState: {inFlight: false}
      };
    }
    case SPLIT_FAILED: {
      return {...state, fetchState: {inFlight: false, error: action.payload}};
    }
    default:
      return state;
  }
};

export default splits;
