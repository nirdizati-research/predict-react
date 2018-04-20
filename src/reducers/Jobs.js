/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  JOB_RESULTS_REQUESTED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED,
  JOB_RUN_CHANGED,
  MODEL_CHANGED
} from '../actions/JobActions';
import {
  BOOLEAN, COMPLEX, DECISION_TREE, FREQUENCY, KMEANS, KNN, LASSO, LAST_PAYLOAD, LINEAR, NO_CLUSTER, RANDOM_FOREST,
  REGRESSION,
  SIMPLE_INDEX
} from '../reference';

/* eslint-disable max-len */

const initialState = {
  fetchState: {inFlight: false},
  jobs: [],
  filteredJobs: [],
  jobsrun: [],
  filteredJobsRun: [],
  uniqueSplits: [],
  predictionMethod: REGRESSION,
  prefixLengths: [],
  selectedPrefixes: [],
  splitId: -100,
  logId: -100,
  naId: -100,
  regId: -100,
  classId: -100
};

const initialFilters = {
  encodings: [SIMPLE_INDEX, BOOLEAN, FREQUENCY, COMPLEX, LAST_PAYLOAD],
  clusterings: [NO_CLUSTER, KMEANS],
  classification: [KNN, DECISION_TREE, RANDOM_FOREST],
  regression: [LINEAR, LASSO, RANDOM_FOREST]
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

const filterBySplit = (splitId) => (job) => {
  return job.split.id === splitId;
};

const filterByMethod = (predictionMethod) => (job) => {
  return (job.type === predictionMethod) && (job.status === 'completed');
};

const filterByPrefix = (selectedPrefixes) => (job) => {
  return selectedPrefixes.includes(job.config.prefix_length);
};

const filterByAllElse = (encodings, clusterings, classification, regression, predictionMethod) => (job) => {
  const firstHalf = encodings.includes(job.config.encoding) && clusterings.includes(job.config.clustering);
  if (predictionMethod === REGRESSION) {
    return firstHalf && regression.includes(job.config.method);
  } else {
    return firstHalf && classification.includes(job.config.method);
  }
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

const addOrRemoveString = (list, value) => {
  const index = list.indexOf(value);
  if (index > -1) {
    return list.filter((val) => val !== value);
  } else {
    return [...list, value];
  }
};

const prefixSet = (filteredJobs) => [...new Set(filteredJobs.map((job) => job.config.prefix_length))];

const applyFilters = (jobs, splitId, predictionMethod, encodings, clusterings, classification, regression) => {
  return jobs.filter(filterBySplit(splitId)).filter(filterByMethod(predictionMethod))
    .filter(filterByAllElse(encodings, clusterings, classification, regression, predictionMethod));
};

const checkboxChange = (target, state) => {
  const value = target.value;
  switch (target.name) {
    case 'encodings[]':
      return {...state, encodings: addOrRemoveString(state.encodings, value)};
    case 'clusterings[]':
      return {...state, clusterings: addOrRemoveString(state.clusterings, value)};
    case 'regression[]':
      return {...state, regression: addOrRemoveString(state.regression, value)};
    case 'classification[]':
      return {...state, classification: addOrRemoveString(state.classification, value)};
    // no default
  }
  return state;
};

const filterJobRun = (jobsrun, logId, naId, regId, classId) => {
  return jobsrun.filter((job) => (job.config.log_id === logId) && ((job.config.model_id === naId) ||
                                                                  (job.config.model_id === regId) ||
                                                                  (job.config.model_id === classId)));
};

const jobs = (state = {...initialState, ...initialFilters}, action) => {
  switch (action.type) {
    case JOBS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    case JOBS_RETRIEVED: {
      const jobs = mergeIncomingJobs(action.payload, state.jobs);
      const jobsrun = jobs.filter((job) => (job.config.add_label === false));
      const filteredJobs = filterJobRun(state.jobsrun,state.logId,state.naId,state.regId,state.classId);
      const uniqueSplits = filterUnique(jobs.filter((job) => job.status === 'completed').reduce(reducer, []));
      return {
        ...state,
        fetchState: {inFlight: false},
        jobs: jobs,
        jobsrun: jobsrun,
        filteredJobsRun: filteredJobs,
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
      const filteredJobs = applyFilters(state.jobs, action.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths,
        splitId: action.splitId, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREDICTION_METHOD_CHANGED: {
      const filteredJobs = applyFilters(state.jobs, state.splitId, action.method, initialFilters.encodings, initialFilters.clusterings, initialFilters.classification, initialFilters.regression);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths, ...initialFilters,
        predictionMethod: action.method, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREFIX_LENGTH_CHANGED: {
      const selectedPrefixes = addOrRemove(state.selectedPrefixes, action.prefixLength);
      const filteredJobs = applyFilters(state.jobs, state.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression)
        .filter(filterByPrefix(selectedPrefixes));
      return {
        ...state, selectedPrefixes, filteredJobs
      };
    }

    case FILTER_OPTION_CHANGED: {
      state = checkboxChange(action.payload, state);
      const filteredJobs = applyFilters(state.jobs, state.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression);
      return {
        ...state, filteredJobs
      };
    }
    case JOB_RUN_CHANGED: {
      const logId = action.logId;
      const filteredJobsRun = filterJobRun(state.jobsrun,logId,state.naId,state.regId,state.classId);
      return {
        ...state,
          filteredJobsRun: filteredJobsRun,
          logId: logId
      };
    }
    case MODEL_CHANGED: {
      const naId = action.naId;
      const regId = action.regId;
      const classId = action.classId;
      const filteredJobsRun = filterJobRun(state.jobsrun,state.logId,naId,regId,classId);
      return {
        ...state,
          filteredJobsRun: filteredJobsRun,
          naId: naId,
          classId: classId,
          regId: regId
      };
    }

    default:
      return state;
  }
};

export default jobs;
