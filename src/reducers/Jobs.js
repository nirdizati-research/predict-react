/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_REMAINING_TIME_CHANGED,
  FILTER_SPLIT_CHANGED,
  JOB_DELETED,
  JOB_RESULTS_REQUESTED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED
} from '../actions/JobActions';
import {
  BOOLEAN,
  COMPLEX,
  DECISION_TREE,
  FREQUENCY,
  KMEANS,
  KNN,
  LABELLING,
  LASSO,
  LAST_PAYLOAD,
  LINEAR,
  NO_CLUSTER,
  RANDOM_FOREST,
  REGRESSION,
  SIMPLE_INDEX
} from '../reference';

/* eslint-disable max-len */

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

const initialFilters = {
  encodings: [SIMPLE_INDEX, BOOLEAN, FREQUENCY, COMPLEX, LAST_PAYLOAD],
  clusterings: [NO_CLUSTER, KMEANS],
  classification: [KNN, DECISION_TREE, RANDOM_FOREST],
  regression: [LINEAR, LASSO, RANDOM_FOREST],
  labelType: 'remaining_time'
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

const filterByEncoding = (encodings) => (job) => {
  return encodings.includes(job.config.encoding);
};
const filterByLabelType = (labelType) => (job) => {
  return job.config.label.type === labelType;
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

const removeById = (list, value) => {
  return list.filter((val) => val.id !== value);
};

const prefixSet = (filteredJobs) => [...new Set(filteredJobs.map((job) => job.config.prefix_length))];

const applyFilters = (jobs, splitId, predictionMethod, encodings, clusterings, classification, regression, labelType) => {
  const commonJobs = jobs.filter(filterBySplit(splitId)).filter(filterByMethod(predictionMethod)).filter(filterByLabelType(labelType));
  if (predictionMethod === LABELLING) {
    return commonJobs.filter(filterByEncoding(encodings));
  }
  return commonJobs
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
    case 'labelType':
      return {...state, labelType: value};
    // no default
  }
  return state;
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
      const uniqueSplits = filterUnique(jobs.filter((job) => job.status === 'completed').reduce(reducer, []));
      return {
        ...state, fetchState: {inFlight: false}, jobs, uniqueSplits
      };
    }

    case JOBS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    case JOB_DELETED: {
      const jobs = removeById(state.jobs, action.id);
      const uniqueSplits = filterUnique(jobs.filter((job) => job.status === 'completed').reduce(reducer, []));
      return {
        ...state, jobs, uniqueSplits
      };
    }
    case JOB_RESULTS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }
    case FILTER_SPLIT_CHANGED: {
      const filteredJobs = applyFilters(state.jobs, action.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression, state.labelType);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths,
        splitId: action.splitId, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREDICTION_METHOD_CHANGED: {
      const filteredJobs = applyFilters(state.jobs, state.splitId, action.method, initialFilters.encodings, initialFilters.clusterings, initialFilters.classification, initialFilters.regression, initialFilters.labelType);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths, ...initialFilters,
        predictionMethod: action.method, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREFIX_LENGTH_CHANGED: {
      const selectedPrefixes = addOrRemove(state.selectedPrefixes, action.prefixLength);
      const filteredJobs = applyFilters(state.jobs, state.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression, state.labelType)
        .filter(filterByPrefix(selectedPrefixes));
      return {
        ...state, selectedPrefixes, filteredJobs
      };
    }

    case FILTER_OPTION_CHANGED: {
      state = checkboxChange(action.payload, state);
      const filteredJobs = applyFilters(state.jobs, state.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression, state.labelType);
      return {
        ...state, filteredJobs
      };
    }

    case FILTER_REMAINING_TIME_CHANGED: {
      const labelType = action.payload.value;
      const filteredJobs = applyFilters(state.jobs, state.splitId, state.predictionMethod, state.encodings, state.clusterings, state.classification, state.regression, labelType);
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths, labelType, selectedPrefixes: prefixLengths
      };
    }

    default:
      return state;
  }
};

export default jobs;
