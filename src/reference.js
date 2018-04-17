/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
/* eslint-disable max-len */

export const CLASSIFICATION = 'classification';
export const REGRESSION = 'regression';
export const NEXT_ACTIVITY = 'nextActivity';

export const SPLIT_SINGLE = 'single';
export const SPLIT_DOUBLE = 'double';
// clustering
export const NO_CLUSTER = 'noCluster';
export const KMEANS = 'kmeans';
// classification methods
export const KNN = 'knn';
export const DECISION_TREE = 'decisionTree';
export const RANDOM_FOREST = 'randomForest';
// regression methods
export const LINEAR = 'linear';
export const LASSO = 'lasso';
// encoding methods
export const SIMPLE_INDEX = 'simpleIndex';
export const BOOLEAN = 'boolean';
export const FREQUENCY = 'frequency';
export const COMPLEX = 'complex';
export const LAST_PAYLOAD = 'lastPayload';


const clustering = [
  {
    label: 'None',
    value: NO_CLUSTER,
    message: 'No clustering and train a single model'
  },
  {
    label: KMEANS,
    value: KMEANS,
    message: 'Assign traces to k-means clusters and train a model for each cluster'
  }
];

const classification = [
  {
    label: 'KNN',
    value: KNN
  },
  {
    label: 'Decision tree',
    value: DECISION_TREE
  },
  {
    label: 'Random forest',
    value: RANDOM_FOREST
  }
];

const encoding = [
  {
    label: 'Simple index',
    value: SIMPLE_INDEX,
    message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the event classes. Event attributes are discarded.'
  },
  {
    label: 'Boolean',
    value: BOOLEAN,
    message: 'Features represent whether or not a particular event class has occurred in the trace. Does not support 0 padding.'
  },
  {
    label: 'Frequency',
    value: FREQUENCY,
    message: 'Features represent the absolute frequency of each possible event class. Event attributes are discarded. Does not support 0 padding.'
  },
  {
    label: 'Complex',
    value: COMPLEX,
    message: 'Simple index encoding with event attributes'
  },
  {
    label: 'Last payload',
    value: LAST_PAYLOAD,
    message: 'Simple index encoding with event attributes for only the last considered event in trace.'
  }
];

const outcomeRules = [
  {
    label: 'Remaining time',
    value: 'remaining_time',
    message: 'Fast/Slow'
  },
  {
    label: 'Duration',
    value: 'elapsed_time',
    message: 'Fast/Slow'
  }
];

const predictions = [
  {
    label: 'Remaining time',
    value: REGRESSION
  },
  {
    label: 'Outcome',
    value: CLASSIFICATION
  },
  {
    label: 'Next activity',
    value: NEXT_ACTIVITY
  },
];

const regression = [
  {
    label: 'Linear',
    value: LINEAR
  },
  {
    label: 'Random forest',
    value: RANDOM_FOREST
  },
  {
    label: 'Lasso',
    value: LASSO
  },
];

const threshold = [
  {
    label: 'Average',
    value: 'default',
    message: 'Average value from the created labels of the business rule'
  },
  {
    label: 'Custom',
    value: 'custom',
    message: 'Threshold used is set by you'
  }
];

export const splitTypes = [
  {
    label: 'Sequential order',
    value: 'split_sequential'
  },
  {
    label: 'Temporal order',
    value: 'split_temporal'
  },
  {
    label: 'Random order',
    value: 'split_random'
  },
  {
    label: 'Strict temporal order',
    value: 'split_strict_temporal'
  },
];

const padding = [
  {
    label: 'No padding',
    value: 'no_padding',
    message: 'Traces with less than prefix_length will be discarded'
  },
  {
    label: 'With 0 padding',
    value: 'zero_padding',
    message: 'Traces with less than prefix_length will be padded with 0'
  }
];

const prefixTypes = [
  {
    label: 'Only this prefix',
    value: 'only'
  },
  {
    label: 'Up to the prefix',
    value: 'up_to',
    message: 'Run jobs from 1 to this value'
  },
];

// Makes things for Selection Controls
const controlCreator = (optMap) => {
  return optMap.map((opt) => {
    return {
      key: opt.value,
      value: opt.value,
      label: <div>{opt.label}
        <div className="md-caption">{opt.message}</div>
      </div>
    };
  });
};

export const encodingMethods = controlCreator(encoding);
export const clusteringMethods = controlCreator(clustering);
export const classificationMethods = controlCreator(classification);
export const regressionMethods = controlCreator(regression);
export const predictionMethods = controlCreator(predictions);
export const outcomeRuleControls = controlCreator(outcomeRules);
export const thresholdControls = controlCreator(threshold);
export const paddingControls = controlCreator(padding);
export const prefixTypeControls = controlCreator(prefixTypes);

export const columnStyle = {paddingRight: '12px'};
