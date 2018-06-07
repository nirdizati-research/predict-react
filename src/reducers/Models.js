import {
  MODELS_FAILED,
  MODELS_RETRIEVED,
  MODELS_REQUESTED,
  REG_MODEL_CHANGED,
  CLAS_MODEL_CHANGED
} from '../actions/ModelActions';
import {LOG_CHANGED} from '../actions/LogActions';
import {REGRESSION, CLASSIFICATION} from '../reference';

const initialState = {
  fetchState: {inFlight: false},
  models: [],
  logId: 0,
  regselected: 0,
  classelected: 0,
  regressionModels: [],
  classificationModels: [],
};

const mergeIncomingModels = (incoming, existing) => {
  // From https://stackoverflow.com/a/34963663
  const a3 = existing.concat(incoming).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});
  return Object.keys(a3).map((key) => a3[key]);
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
      const regressionModels = models.filter((model) => (model.type === REGRESSION));
      const classificationModels = models.filter((model) => (model.type === CLASSIFICATION));
      return {
        ...state,
        fetchState: {inFlight: false},
        models: models,
        regressionModels: regressionModels,
        classificationModels: classificationModels,
      };
    }

    case MODELS_FAILED: {
      return {
        ...state,
        fetchState: {inFlight: false, error: action.payload},
      };
    }

    case REG_MODEL_CHANGED: {
      const regselected = action.modelId;
      return {
        ...state,
        regselected,
      };
    }

    case CLAS_MODEL_CHANGED: {
      const classelected = action.modelId;
      return {
        ...state,
        classelected,
      };
    }

    case LOG_CHANGED: {
      const logId = action.logId;
      const regressionModels = state.regressionModels
        .filter((model) => (model.config.encoding.prefix_length === action.p_length)
          || ((model.config.padding === 'zero_padding') &&
            (model.config.encoding.prefix_length >= action.p_length)));
      const classificationModels = state.classificationModels
        .filter((model) => (model.config.encoding.prefix_length === action.p_length)
          || ((model.config.padding === 'zero_padding') &&
            (model.config.encoding.prefix_length >= action.p_length)));

      return {
        ...state,
        logId,
        regressionModels,
        classificationModels,
      };
    }

    default:
      return state;
  }
};

export default models;
