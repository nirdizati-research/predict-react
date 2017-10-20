/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  JOB_RESULTS_REQUESTED,
  JOB_RESULTS_RETRIEVED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED
} from '../actions/JobActions';

const initialState = {
  fetchState: {inFlight: false},
  jobs: []
};

const mergeIncomingJobs = (incoming, existing) => {
  // Delete existing of this log and merge
  const logName = incoming[0].log;
  const cleaned = existing.filter((job) => job.log !== logName);
  return [...cleaned, ...incoming];
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
        jobs: action.payload
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

    case JOB_RESULTS_RETRIEVED: {
      return {
        ...state,
        fetchState: {inFlight: false},
        jobs: mergeIncomingJobs(action.payload, state.jobs)
      };
    }

    default:
      return state;
  }
};

export default jobs;
