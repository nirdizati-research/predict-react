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
import {MODEL_CHANGED} from '../actions/ModelActions';
import {JOB_RUN_CHANGED} from '../actions/RuntimeActions';
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
  THRESHOLD_MEAN,
  XGBOOST
} from '../reference';
import {labelCompare} from '../util/labelCompare';
import {addListToStore, removeFromStore} from './genericHelpers';
import {advancedConfigChange} from '../util/advancedFormInput';

/* eslint-disable max-len */

const initialLabels = {
  remainingTime: {type: REMAINING_TIME},
  duration: {type: DURATION, threshold_type: THRESHOLD_MEAN}
};

const initialState = {
  fetchState: {inFlight: false},
  runIds: [],
  byId: {},
  allIds: [],
  filteredIds: [],
  uniqueSplits: [],
  predictionMethod: REGRESSION,
  prefixLengths: [],
  selectedPrefixes: [],
  logId: -100,
  regId: 0,
  classId: 0,
  thresholds: [],
  attributeNames: [],
  splitId: -100
};

const initialFilters = {
  encodings: [SIMPLE_INDEX, BOOLEAN, FREQUENCY, COMPLEX, LAST_PAYLOAD],
  clusterings: [NO_CLUSTER, KMEANS],
  classification: [KNN, DECISION_TREE, RANDOM_FOREST, XGBOOST],
  regression: [LINEAR, LASSO, RANDOM_FOREST, XGBOOST],
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
  return selectedPrefixes.includes(job.config.encoding.prefix_length);
};

const filterByPadding = (padding) => (job) => {
  return job.config.encoding.padding === padding;
};

const filterByAllElse = (encodings, clusterings, classification, regression, predictionMethod) => (job) => {
  const firstHalf = encodings.includes(job.config.encoding.method) && clusterings.includes(job.config.clustering);
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

const prefixSet = (jobsById, ids) => [...new Set(ids.map(id => jobsById[id].config.encoding.prefix_length))];
const thresholdSet = (jobsById) => [...new Set(Object.values(jobsById).map((job) => job.config.label.threshold))];
const attributeNameSet = (jobsById) =>
  [...new Set(Object.values(jobsById).map(job => job.config.label.attribute_name).filter(a => a !== undefined))];

const applyFilters =
  ({byId, splitId, predictionMethod, encodings, clusterings, classification, regression, label, padding}) => {
    const commonJobs = Object.values(byId)
      .filter(filterBySplit(splitId))
      .filter(filterByMethod(predictionMethod))
      .filter(filterByPadding(padding))
      .filter(filterByLabelType(predictionMethod, label));
    if (predictionMethod === LABELLING) {
      return commonJobs.map(({id}) => id);
    }
    return commonJobs
      .filter(filterByAllElse(encodings, clusterings, classification, regression, predictionMethod)).map(({id}) => id);
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
      const jobs = addListToStore(state, action.payload);
      // this is shit
      const runIds = [];
      for (const k in state.byId) {
        if ((state.byId.hasOwnProperty(k)) && state.byId[k].config.add_label === false) {
          runIds.push(k);
        }
      }
      const uniqueSplits = completedUniqueSplits(jobs.byId);
      const thresholds = thresholdSet(jobs.byId);
      const attributeNames = attributeNameSet(jobs.byId);
      return {
        ...state, fetchState: {inFlight: false}, ...jobs,
        uniqueSplits, thresholds, attributeNames,
        runIds
      };
    }

    case JOBS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    case JOB_DELETED: {
      const jobs = removeFromStore(state, action.id);
      const uniqueSplits = completedUniqueSplits(jobs.byId);
      const thresholds = thresholdSet(jobs.byId);
      const attributeNames = attributeNameSet(jobs.byId);
      return {
        ...state, ...jobs, uniqueSplits, thresholds, attributeNames
      };
    }
    case FILTER_SPLIT_CHANGED: {
      const splitId = action.splitId;
      const filteredIds = applyFilters({...state, splitId});
      const prefixLengths = prefixSet(state.byId, filteredIds);
      return {
        ...state, filteredIds, prefixLengths, splitId, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREDICTION_METHOD_CHANGED: {
      const label = action.method === REGRESSION ? initialLabels.remainingTime : initialLabels.duration;
      const predictionMethod = action.method;
      const filteredIds = applyFilters({...state, predictionMethod, ...initialFilters, label});
      const prefixLengths = prefixSet(state.byId, filteredIds);
      return {
        ...state, filteredIds, prefixLengths, ...initialFilters, label,
        predictionMethod, selectedPrefixes: prefixLengths
      };
    }
    case FILTER_PREFIX_LENGTH_CHANGED: {
      const selectedPrefixes = addOrRemove(state.selectedPrefixes, action.prefixLength);
      const filteredIds = applyFilters({...state}).map(id => state.byId[id])
        .filter(filterByPrefix(selectedPrefixes)).map(({id}) => id);
      return {
        ...state, selectedPrefixes, filteredIds
      };
    }

    case FILTER_OPTION_CHANGED: {
      state = checkboxChange(action.payload, state);
      const filteredIds = applyFilters({...state});
      return {
        ...state, filteredIds
      };
    }
    case JOB_RUN_CHANGED: {
      const logId = action.logId;
      return {
        ...state,
        logId: logId
      };
    }
    case MODEL_CHANGED: {
      const regId = action.regId;
      const classId = action.classId;
      return {
        ...state,
        classId: classId,
        regId: regId,
      };
    }

    case FILTER_LABEL_CHANGED: {
      const modifiedState = advancedConfigChange(state, action.payload.config, action.payload.value);
      const filteredIds = applyFilters({...modifiedState});
      const prefixLengths = prefixSet(state.byId, filteredIds);
      return {
        ...modifiedState, filteredIds, prefixLengths, selectedPrefixes: prefixLengths
      };
    }

    default:
      return state;
  }
};

export default jobs;
