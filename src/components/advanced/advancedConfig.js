/* Advanced configuration defaults */

export const classificationKnnWeights = [
  {
    value: 'uniform',
    label: 'uniform'
  },
  {
    value: 'distance',
    label: 'distance'
  }
];

export const regressionMetrics = [
  {
    value: 'rmse',
    label: 'rmse'
  },
  {
    value: 'mae',
    label: 'mae'
  },
  {
    value: 'rscore',
    label: 'rscore'
  },
  {
    value: 'mape',
    label: 'mape'
  }
];

export const classificationMetrics = [
  {
    value: 'acc',
    label: 'Accuracy'
  },
  {
    value: 'f1score',
    label: 'F1 score'
  },
  {
    value: 'auc',
    label: 'AUC'
  },
  {
    value: 'precision',
    label: 'Precision'
  },
  {
    value: 'recall',
    label: 'Recall'
  },
  {
    value: 'true_positive',
    label: 'True positive'
  },
  {
    value: 'true_negative',
    label: 'True negative'
  },
  {
    value: 'false_positive',
    label: 'False positive'
  },
  {
    value: 'false_negative',
    label: 'False negative'
  },
];

export const kmeansAlgorithm = [
  {
    value: 'auto',
    label: 'auto'
  },
  {
    value: 'full',
    label: 'full'
  },
  {
    value: 'elkan',
    label: 'elkan'
  },
];
