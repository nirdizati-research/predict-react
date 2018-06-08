import {
  ALL_IN_ONE,
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  BOOLEAN,
  CLASSIFICATION,
  COMPLEX,
  DURATION,
  FREQUENCY,
  LABELLING,
  LAST_PAYLOAD,
  NEXT_ACTIVITY,
  NO_PADDING,
  ONLY_THIS,
  REGRESSION,
  REMAINING_TIME,
  SIMPLE_INDEX,
  THRESHOLD_CUSTOM,
  THRESHOLD_MEAN,
  UP_TO,
  ZERO_PADDING
} from './reference';
import PropTypes from 'prop-types';

/**
 * Created by tonis.kasekamp on 10/9/17.
 */


const hyperOptShape = {
  use_hyperopt: PropTypes.bool.isRequired,
  max_evals: PropTypes.number.isRequired,
  performance_metric: PropTypes.string.isRequired
};

export const traceAttributeShape = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired
};

export const fetchStatePropType = PropTypes.shape({
  inFlight: PropTypes.bool.isRequired,
  error: PropTypes.any
}).isRequired;

export const encodingPropType = {
  method: PropTypes.oneOf([SIMPLE_INDEX, BOOLEAN, FREQUENCY, COMPLEX, LAST_PAYLOAD]),
  padding: PropTypes.oneOf([ZERO_PADDING, NO_PADDING]).isRequired,
  generation_type: PropTypes.oneOf([UP_TO, ONLY_THIS, ALL_IN_ONE]).isRequired,
  prefix_length: PropTypes.number.isRequired
};

export const labelPropType = {
  type: PropTypes.oneOf([NEXT_ACTIVITY, REMAINING_TIME, ATTRIBUTE_NUMBER, ATTRIBUTE_STRING, DURATION]).isRequired,
  attribute_name: PropTypes.string,
  threshold_type: PropTypes.oneOf([THRESHOLD_MEAN, THRESHOLD_CUSTOM]).isRequired,
  threshold: PropTypes.number.isRequired,
  add_remaining_time: PropTypes.bool.isRequired,
  add_elapsed_time: PropTypes.bool.isRequired,
  add_executed_events: PropTypes.bool.isRequired,
  add_resources_used: PropTypes.bool.isRequired,
  add_new_traces: PropTypes.bool.isRequired,
};

export const jobPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  split_id: PropTypes.number.isRequired,
  splitName: PropTypes.string,
  type: PropTypes.oneOf([CLASSIFICATION, REGRESSION]).isRequired,
  config: PropTypes.shape({
    hyperopt: PropTypes.shape(hyperOptShape),
    label: PropTypes.shape(labelPropType).isRequired,
    method: PropTypes.string,
    clustering: PropTypes.string,
    encoding: PropTypes.shape(encodingPropType).isRequired,
    kmeans: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  created_date: PropTypes.string.isRequired,
  modified_date: PropTypes.string.isRequired,
  result: PropTypes.shape({
    mae: PropTypes.number,
    rmse: PropTypes.number,
    rscore: PropTypes.number,
    mape: PropTypes.number,
    fmeasure: PropTypes.number,
    acc: PropTypes.number,
    auc: PropTypes.number,
    true_positive: PropTypes.number,
    true_negative: PropTypes.number,
    false_positive: PropTypes.number,
    false_negative: PropTypes.number,
    precision: PropTypes.number,
    recall: PropTypes.number
  })
}).isRequired;

export const jobRunPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  split_id: PropTypes.number.isRequired,
  splitName: PropTypes.string,
  type: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  config: PropTypes.shape({
    hyperopt: PropTypes.shape(hyperOptShape),
    label: PropTypes.shape(labelPropType).isRequired,
    method: PropTypes.string,
    clustering: PropTypes.string,
    encoding: PropTypes.shape(encodingPropType).isRequired,
    kmeans: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  created_date: PropTypes.string.isRequired,
  modified_date: PropTypes.string.isRequired,
  result: PropTypes.any.isRequired,
}).isRequired;

export const jobFlatPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  prefix_length: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  padding: PropTypes.string,
  encodingMethod: PropTypes.string.isRequired,
  generationType: PropTypes.string.isRequired,
  advanced: PropTypes.objectOf(PropTypes.any).isRequired,
  hyperopt: PropTypes.shape(hyperOptShape),
  kmeans: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.shape(labelPropType).isRequired,
}).isRequired;

export const labelJobFlat = PropTypes.shape({
  id: PropTypes.number.isRequired,
  encoding: PropTypes.shape(encodingPropType).isRequired,
  result: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  label: PropTypes.shape(labelPropType).isRequired,
}).isRequired;

export const selectLabelProptype = PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}).isRequired).isRequired;

export const logPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  properties: PropTypes.shape({
    events: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    resources: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    newTraces: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired,
    maxEventsInLog: PropTypes.number.isRequired,
  }).isRequired
});

export const modelPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  split: PropTypes.any.isRequired,
  config: PropTypes.shape({
    hyperopt: PropTypes.shape(hyperOptShape),
    label: PropTypes.shape(labelPropType).isRequired,
    method: PropTypes.string,
    clustering: PropTypes.string,
    encoding: PropTypes.shape(encodingPropType).isRequired,
    kmeans: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export const tracePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  xlog: PropTypes.shape({
    config: PropTypes.any.isRequired,
  }).isRequired,
  completed: PropTypes.bool.isrequired,
  first_event: PropTypes.string.isRequired,
  last_event: PropTypes.string.isRequired,
  n_events: PropTypes.number.isRequired,
  real_log: PropTypes.number.isRequired,
  reg_model: PropTypes.shape(modelPropType),
  class_model: PropTypes.shape(modelPropType),
  config: PropTypes.any.isRequired,
  reg_results: PropTypes.any,
  class_results: PropTypes.any
});

export const splitPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['single', 'double']).isRequired,
  originalLogName: PropTypes.string,
  trainingLogName: PropTypes.string,
  testLogName: PropTypes.string,
  original_log: PropTypes.number,
  training_log: PropTypes.number,
  test_log: PropTypes.number,
  config: PropTypes.object.isRequired,
});

export const logsStore = PropTypes.shape({
  byId: PropTypes.objectOf(logPropType).isRequired,
  allIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
}).isRequired;

export const splitStore = PropTypes.shape({
  byId: PropTypes.objectOf(splitPropType).isRequired,
  allIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
}).isRequired;

export const jobStore = PropTypes.shape({
  byId: PropTypes.objectOf(jobPropType).isRequired,
  allIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
}).isRequired;
