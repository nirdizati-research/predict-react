/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
/* eslint-disable max-len */
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

const clustering = [
  {
    label: 'None',
    value: 'None',
    message: 'No clustering and train a single model'
  },
  {
    label: 'Kmeans',
    value: 'kmeans',
    message: 'Assign traces to k-means clusters and train a model for each cluster'
  }
];

const regression = [
  {
    label: 'Linear',
    value: 'linear'
  },
  {
    label: 'Xboost',
    value: 'xboost'
  },
  {
    label: 'Random forest',
    value: 'randomforest'
  },
  {
    label: 'Lasso',
    value: 'lasso'
  },
];

const predictions = [
  {
    label: 'Remaining time',
    value: 'time'
  },
  {
    label: 'Outcome',
    value: 'outcome'
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
export const regressionMethods = controlCreator(regression);
export const predictionMethods = controlCreator(predictions);
