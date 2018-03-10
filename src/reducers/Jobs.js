/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  FILTER_PREDICTION_METHOD_CHANGED, FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  JOB_RESULTS_REQUESTED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED
} from '../actions/JobActions';
import {REGRESSION} from '../reference';

const initialState = {
  fetchState: {inFlight: false},
  jobs: [],
  filteredJobs: [],
  uniqueSplits: [],
  predictionMethod: REGRESSION,
  prefixLengths: [],
  selectedPrefixes: [],
  splitId: -100
};

const mergeIncomingJobs = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
};

const filterUnique = (splits) => {
  const resArr = [];
  splits.filter(function (item) {
    const i = resArr.findIndex((split) => split.id === item.id);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
  return resArr;
};

const reducer = (acc, job) => {
  acc.push(job.split);
  return acc;
};

const filterBySplit = (jobs, predictionMethod, splitId) => {
  return filterByMethod(jobs.filter((job) => (job.split.id === splitId)), predictionMethod);
};

const filterByMethod = (jobs, predictionMethod) => {
  return jobs.filter((job) => (job.type === predictionMethod) && (job.status === 'completed'));
};

const addOrRemove = (list, value) => {
  value = parseInt(value, 10);
  const index = list.indexOf(value);
  if (index > -1) {
    return list.filter((val) => val !== value);
  } else {
    return [...list, value];
  }
};

const prefixSet = (filteredJobs) => [...new Set(filteredJobs.map((job) => job.config.prefix_length))];

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    case JOBS_RETRIEVED: {
      const jobs = mergeIncomingJobs(action.payload, state.jobs);
      const uniqueSplits = filterUnique(jobs.filter((job) => job.status === 'completed').reduce(reducer, []));
      return {
        ...state,
        fetchState: {inFlight: false},
        jobs: jobs,
        uniqueSplits: uniqueSplits
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
    case FILTER_SPLIT_CHANGED: {
      const filteredJobs = filterBySplit(state.jobs, state.predictionMethod, action.splitId);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs: filteredJobs, prefixLengths: prefixLengths,
        splitId: action.splitId, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREDICTION_METHOD_CHANGED: {
      const filteredJobs = filterBySplit(state.jobs, action.method, state.splitId);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths: prefixLengths,
        predictionMethod: action.method, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREFIX_LENGTH_CHANGED: {
      const selectedPrefixes = addOrRemove(state.selectedPrefixes, action.prefixLength);
      const filteredJobs = filterBySplit(state.jobs, state.predictionMethod, state.splitId)
        .filter((job) => selectedPrefixes.includes(job.config.prefix_length));
      return {
        ...state, selectedPrefixes: selectedPrefixes, filteredJobs
      };
    }

    default:
      return state;
  }
};

export default jobs;
