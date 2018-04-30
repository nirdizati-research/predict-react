/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
/* eslint-disable max-len */

export const CLASSIFICATION = 'classification';
export const REGRESSION = 'regression';
export const LABELLING = 'labelling';

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

// labeling stuff
export const NEXT_ACTIVITY = 'next_activity';
export const REMAINING_TIME = 'remaining_time';
export const ATTRIBUTE_NUMBER = 'attribute_number';
export const ATTRIBUTE_STRING = 'attribute_string';
export const DURATION = 'duration';

export const THRESHOLD_MEAN = 'threshold_mean';
export const THRESHOLD_CUSTOM = 'threshold_custom';

// Using these options directly means the message is not shown
export const clustering = [
  {
    label: 'None',
    value: NO_CLUSTER,
    message: 'No clustering and train a single model'
  },
  {
    label: 'K-means clustering',
    value: KMEANS,
    message: 'Assign traces to 3 k-means clusters and train a model for each cluster'
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

export const encoding = [
  {
    label: 'Simple index',
    value: SIMPLE_INDEX,
    message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the activity names. Event attributes are discarded.'
  },
  {
    label: 'Boolean',
    value: BOOLEAN,
    message: 'Features represent whether or not a particular activity has occurred in the trace. Event attributes are discarded.'
  },
  {
    label: 'Frequency',
    value: FREQUENCY,
    message: 'Features represent the absolute frequency of each possible activity. Event attributes are discarded.'
  },
  {
    label: 'Complex',
    value: COMPLEX,
    message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the activity names and event attributes'
  },
  {
    label: 'Last payload',
    value: LAST_PAYLOAD,
    message: 'Features represent the event attributes of the last event that occurred in the trace.'
  }
];

const predictions = [
  {
    label: 'Regression',
    value: REGRESSION,
    message: 'Numeric values'
  },
  {
    label: 'Classification',
    value: CLASSIFICATION,
    message: 'Categorical values'
  }
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
    label: 'Label mean',
    value: THRESHOLD_MEAN,
    message: 'Threshold is label mean'
  },
  {
    label: 'Custom',
    value: THRESHOLD_CUSTOM,
    message: 'Use the threshold value below'
  }
];

const regressionLabelTypes = [
  {
    value: REMAINING_TIME,
    label: 'Remaining time ',
  },
  {
    value: ATTRIBUTE_NUMBER,
    label: 'Trace number attribute',
  }
];
const classificationLabelTypes = [
  {
    value: DURATION,
    label: 'Trace duration',
    message: 'Binary classification'
  },
  {
    value: NEXT_ACTIVITY,
    label: 'Next activity',
    message: 'Multiclass classification'
  },
  {
    value: ATTRIBUTE_NUMBER,
    label: 'Trace number attribute',
    message: 'Binary classification'
  },
  {
    value: ATTRIBUTE_STRING,
    label: 'Trace string attribute',
    message: 'Multiclass classification'
  },
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
    message: 'Traces with length less then the specified prefix length will be discarded'
  },
  {
    label: 'With 0 padding',
    value: 'zero_padding',
    message: 'Traces with length less then the specified prefix length will padded with 0'
  }
];

const prefixTypes = [
  {
    label: 'Only this prefix length',
    value: 'only'
  },
  {
    label: 'Up to the prefix length',
    value: 'up_to',
    message: 'Create multiple tasks from the specified prefix length 1 up to this value'
  },
];

// Makes things for Selection Controls
export const controlCreator = (optMap) => {
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
export const thresholdControls = controlCreator(threshold);
export const regLabelControls = controlCreator(regressionLabelTypes);
export const classLabelControls = controlCreator(classificationLabelTypes);
export const paddingControls = controlCreator(padding);
export const prefixTypeControls = controlCreator(prefixTypes);

export const columnStyle = {paddingRight: '12px'};
