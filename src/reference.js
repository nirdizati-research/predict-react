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

const clustering = [
  {
    label: 'None',
    value: 'noCluster',
    message: 'No clustering and train a single model'
  },
  {
    label: 'kmeans',
    value: 'kmeans',
    message: 'Assign traces to k-means clusters and train a model for each cluster'
  }
];

const classification = [
  {
    label: 'KNN',
    value: 'knn'
  },
  {
    label: 'Decision tree',
    value: 'decisionTree'
  },
  {
    label: 'Random forest',
    value: 'randomForest'
  }
];

const encoding = [
  {
    label: 'Simple index',
    value: 'simpleIndex',
    message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the event classes. Event attributes are discarded.'
  },
  {
    label: 'Boolean',
    value: 'boolean',
    message: 'Features represent whether or not a particular event class has occurred in the trace.'
  },
  {
    label: 'Frequency',
    value: 'frequency',
    message: 'Features represent the absolute frequency of each possible event class. Event attributes are discarded.'
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
    value: 'linear'
  },
  {
    label: 'Random forest',
    value: 'randomForest'
  },
  {
    label: 'Lasso',
    value: 'lasso'
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

export const columnStyle = {paddingRight: '12px'};
