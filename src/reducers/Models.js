/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */

import {
  MODELS_FAILED,
  MODELS_RETRIEVED,
  MODELS_REQUESTED,
  REG_MODEL_CHANGED,
  CLAS_MODEL_CHANGED,
  NA_MODEL_CHANGED
} from '../actions/ModelActions'
import {LOG_CHANGED} from '../actions/LogActions'
import {REGRESSION, NEXT_ACTIVITY, CLASSIFICATION} from '../reference';

const initialState = {
  fetchState: {inFlight: false},
  models: [],
  logId: 0,
  regselected: 0,
  classelected: 0,
  naselected: 0,
  regressionModels: [],
  classificationModels: [],
  nextActivityModels: [],
  predictionMethod: REGRESSION,
  prefixLengths: 1,
  selectedPrefixes: []
};

const mergeIncomingModels = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
};

const filterByMethod = (models, predictionMethod) => {
  return models.filter((model) => (model.type === predictionMethod));
};

const models = (state = initialState, action) => {
  switch (action.type) {
    case MODELS_REQUESTED: {
      return {
        ...state,
        fetchState: {inFlight: true},
      };
    }

    case MODELS_RETRIEVED: {
      const models = mergeIncomingModels(action.payload, state.models);
      const regressionModels = filterByMethod(models, REGRESSION)
      const classificationModels = filterByMethod(models, CLASSIFICATION)
      const nextActivityModels = filterByMethod(models, NEXT_ACTIVITY)
      return {
        ...state,
        fetchState: {inFlight: false},
        models: models,
        regressionModels,
        classificationModels,
        nextActivityModels,
      };
    }

    case MODELS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    case REG_MODEL_CHANGED: {
      const regselected=action.modelId
      return {
        ...state,
        regselected,
      };
    }

    case CLAS_MODEL_CHANGED: {
      const classelected=action.modelId
      return {
        ...state,
        classelected,
      };
    }

    case NA_MODEL_CHANGED: {
      const naselected=action.modelId
      return {
        ...state,
        naselected,
      };
    }

    case LOG_CHANGED: {
      const logId=action.logId
      return {
        ...state,
        logId,
      };
    }

    default:
      return state;
  }
};

export default models;
