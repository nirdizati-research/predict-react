import {SPLITS_FAILED, SPLITS_REQUESTED, SPLITS_RETRIEVED} from '../actions/SplitActions';

const initialState = {
  fetchState: {inFlight: false},
  splits: []
};

// TODO refactor with jobs
const mergeIncomingSplits = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
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
        splits: mergeIncomingSplits(action.payload, state.splits)
      };
    }

    case SPLITS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    default:
      return state;
  }
};

export default splits;
