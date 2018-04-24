import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  CLASSIFICATION,
  NEXT_ACTIVITY,
  REGRESSION,
  REMAINING_TIME,
  THRESHOLD_CUSTOM,
  THRESHOLD_MEAN
} from './reference';
import PropTypes from 'prop-types';

/**
 * Created by tonis.kasekamp on 10/9/17.
 */


const hyperOptShape = PropTypes.shape({
  use_hyperopt: PropTypes.bool.isRequired,
  max_evals: PropTypes.number.isRequired,
  performance_metric: PropTypes.string.isRequired
});

export const labelPropType = PropTypes.shape({
  type: PropTypes.oneOf([NEXT_ACTIVITY, REMAINING_TIME, ATTRIBUTE_NUMBER, ATTRIBUTE_STRING]).isRequired,
  attribute_name: PropTypes.string,
  threshold_type: PropTypes.oneOf([THRESHOLD_MEAN, THRESHOLD_CUSTOM]).isRequired,
  threshold: PropTypes.number.isRequired,
  add_remaining_time: PropTypes.bool.isRequired,
  add_elapsed_time: PropTypes.bool.isRequired,
});

export const jobPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  split: PropTypes.any.isRequired,
  type: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
  config: PropTypes.shape({
    prefix_length: PropTypes.number.isRequired,
    padding: PropTypes.string,
    hyperopt: PropTypes.objectOf(hyperOptShape),
    label: PropTypes.objectOf(labelPropType),
    method: PropTypes.string.isRequired,
    clustering: PropTypes.string,
    encoding: PropTypes.string,
  }).isRequired,
  created_date: PropTypes.string.isRequired,
  modified_date: PropTypes.string.isRequired,
  result: PropTypes.shape({
    mae: PropTypes.number,
    rmse: PropTypes.number,
    rscore: PropTypes.number,
    fmeasure: PropTypes.number,
    acc: PropTypes.number,
    auc: PropTypes.number,
    true_positive: PropTypes.number,
    true_negative: PropTypes.number,
    false_positive: PropTypes.number,
    false_negative: PropTypes.number,
    precision: PropTypes.number,
    recall: PropTypes.number
  }).isRequired
}).isRequired;

export const jobFlatPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  splitName: PropTypes.string.isRequired,
  prefix_length: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  rule: PropTypes.string,
  padding: PropTypes.string,
  advanced: PropTypes.objectOf(PropTypes.any).isRequired,
  hyperopt: PropTypes.shape(hyperOptShape),
  threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}).isRequired;

export const splitLabels = PropTypes.arrayOf(PropTypes.shape({
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
    maxEventsInLog: PropTypes.number.isRequired,
  }).isRequired
});


