/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  FILTER_LABEL_CHANGED,
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  JOB_DELETED,
  JOBS_FAILED,
  JOBS_REQUESTED,
  JOBS_RETRIEVED
} from '../actions/JobActions';
import {
  BOOLEAN,
  COMPLEX,
  DECISION_TREE,
  DURATION,
  FREQUENCY,
  KMEANS,
  KNN,
  LABELLING,
  LASSO,
  LAST_PAYLOAD,
  LINEAR,
  NO_CLUSTER,
  NO_PADDING,
  RANDOM_FOREST,
  REGRESSION,
  REMAINING_TIME,
  SIMPLE_INDEX,
  THRESHOLD_MEAN
} from '../reference';
import {labelCompare} from '../util/labelCompare';
import {addListToStore, removeFromStore} from './genericHelpers';

/* eslint-disable max-len */

const initialLabels = {
  remainingTime: {type: REMAINING_TIME},
  duration: {type: DURATION, threshold_type: THRESHOLD_MEAN}
};

const initialState = {
  fetchState: {inFlight: false},
  jobs: {
    byId: {},
    allIds: [],
    filteredIds: []
  },
  filteredJobs: [],
  uniqueSplits: [],
  predictionMethod: REGRESSION,
  prefixLengths: [],
  selectedPrefixes: [],
  thresholds: [],
  attributeNames: [],
  splitId: -100
};

const initialFilters = {
  encodings: [SIMPLE_INDEX, BOOLEAN, FREQUENCY, COMPLEX, LAST_PAYLOAD],
  clusterings: [NO_CLUSTER, KMEANS],
  classification: [KNN, DECISION_TREE, RANDOM_FOREST],
  regression: [LINEAR, LASSO, RANDOM_FOREST],
  label: initialLabels.remainingTime,
  padding: NO_PADDING
};


const filterBySplit = (splitId) => (job) => {
  return job.split_id === splitId;
};

const filterByMethod = (predictionMethod) => (job) => {
  return (job.type === predictionMethod) && (job.status === 'completed');
};

const filterByPrefix = (selectedPrefixes) => (job) => {
  return selectedPrefixes.includes(job.config.prefix_length);
};

const filterByPadding = (padding) => (job) => {
  return job.config.padding === padding;
};

const filterByAllElse = (encodings, clusterings, classification, regression, predictionMethod) => (job) => {
  const firstHalf = encodings.includes(job.config.encoding) && clusterings.includes(job.config.clustering);
  if (predictionMethod === REGRESSION) {
    return firstHalf && regression.includes(job.config.method);
  } else {
    return firstHalf && classification.includes(job.config.method);
  }
};

const filterByLabelType = (predictionMethod, label) => (job) => {
  return labelCompare(predictionMethod)(label, job.config.label);
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
const thresholdSet = (jobsById) => [...new Set(Object.values(jobsById).map((job) => job.config.label.threshold))];
const attributeNameSet = (jobsById) =>
  [...new Set(Object.values(jobsById).map(job => job.config.label.attribute_name).filter(a => a !== undefined))];

const applyFilters =
  ({jobs, splitId, predictionMethod, encodings, clusterings, classification, regression, label, padding}) => {
    const commonJobs = jobs
      .filter(filterBySplit(splitId))
      .filter(filterByMethod(predictionMethod))
      .filter(filterByPadding(padding))
      .filter(filterByLabelType(predictionMethod, label));
    if (predictionMethod === LABELLING) {
      return commonJobs;
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
    case 'padding-filter':
      return {...state, padding: value};
    // no default
  }
  return state;
};

const advancedConfigChange = (state, {methodConfig, key, isNumber, isFloat, maybeNumber}, value) => {
  // Only the changed values are put in config. Otherwise merged with config in backend
  // classification.knn weights distance
  const config = state[methodConfig];
  if (isNumber) {
    // for some reason, value can be "". Don't know, dont care
    value = parseInt(value, 10);
  } else if (isFloat) {
    value = parseFloat(value);
  } else if (maybeNumber) {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      value = parsed;
    }
  }
  config[key] = value;
  return {...state, [methodConfig]: config};
};

const completedUniqueSplits = (jobsById) =>
  [...new Set(Object.values(jobsById).filter(job => job.status === 'completed').map((job => job.split_id)))];

const jobs = (state = {...initialState, ...initialFilters}, action) => {
  switch (action.type) {
    case JOBS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    case JOBS_RETRIEVED: {
      const jobs = addListToStore(state.jobs, action.payload);
      const uniqueSplits = completedUniqueSplits(jobs.byId);
      const thresholds = thresholdSet(jobs.byId);
      const attributeNames = attributeNameSet(jobs.byId);
      return {
        ...state, fetchState: {inFlight: false}, jobs: {...jobs, filteredIds: jobs.allIds},
        uniqueSplits, thresholds, attributeNames
      };
    }

    case JOBS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    case JOB_DELETED: {
      const jobs = removeFromStore(state.jobs, action.id);
      const uniqueSplits = completedUniqueSplits(jobs.byId);
      const thresholds = thresholdSet(jobs.byId);
      const attributeNames = attributeNameSet(jobs.byId);
      return {
        ...state, jobs: {...jobs, filteredIds: jobs.allIds}, uniqueSplits, thresholds, attributeNames
      };
    }
    case FILTER_SPLIT_CHANGED: {
      const splitId = action.splitId;
      const filteredJobs = applyFilters({...state, splitId});
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths, splitId, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREDICTION_METHOD_CHANGED: {
      const label = action.method === REGRESSION ? initialLabels.remainingTime : initialLabels.duration;
      const predictionMethod = action.method;
      const filteredJobs = applyFilters({...state, predictionMethod, ...initialFilters, label});
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...state, filteredJobs, prefixLengths, ...initialFilters, label,
        predictionMethod, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREFIX_LENGTH_CHANGED: {
      const selectedPrefixes = addOrRemove(state.selectedPrefixes, action.prefixLength);
      const filteredJobs = applyFilters({...state})
        .filter(filterByPrefix(selectedPrefixes));
      return {
        ...state, selectedPrefixes, filteredJobs
      };
    }

    case FILTER_OPTION_CHANGED: {
      state = checkboxChange(action.payload, state);
      const filteredJobs = applyFilters({...state});
      return {
        ...state, filteredJobs
      };
    }

    case FILTER_LABEL_CHANGED: {
      const modifiedState = advancedConfigChange(state, action.payload.config, action.payload.value);
      const filteredJobs = applyFilters({...modifiedState});
      const prefixLengths = prefixSet(filteredJobs);
      return {
        ...modifiedState, filteredJobs, prefixLengths, selectedPrefixes: prefixLengths
      };
    }

    default:
      return state;
  }
};

export default jobs;
