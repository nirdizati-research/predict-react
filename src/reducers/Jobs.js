/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  JOB_RESULTS_REQUESTED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED
} from '../actions/JobActions';

const initialState = {
  fetchState: {inFlight: false},
  jobs: []
};

const mergeIncomingJobs = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
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
        jobs: mergeIncomingJobs(action.payload, state.jobs)
      };
    }

    case JOBS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }
    case JOB_RESULTS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    default:
      return state;
  }
};

export default jobs;
