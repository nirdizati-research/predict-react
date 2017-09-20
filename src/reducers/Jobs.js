/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {JOBS_FAILED, JOBS_REQUESTED, JOBS_RETRIEVED} from '../actions/JobActions';

const initialState = {
  fetchState: {inFlight: false},
  jobs: []
};

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    case JOBS_RETRIEVED: {
      return {
        ...state,
        fetchState: {inFlight: false},
        prototypes: action.payload
      };
    }

    case JOBS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }
    default:
      return state;
  }
};

export default jobs;
