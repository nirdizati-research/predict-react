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

export const classificationDecisionTreeCriterion = [
  {
    value: 'gini',
    label: 'gini'
  },
  {
    value: 'entropy',
    label: 'entropy'
  }
];

export const classificationDecisionTreeSplitter = [
  {
    value: 'best',
    label: 'best'
  },
  {
    value: 'random',
    label: 'random'
  }
];


export const regressionRFCriterion = [
  {
    value: 'mse',
    label: 'mse'
  },
  {
    value: 'mae',
    label: 'mae'
  }
];

export const regressionMetrics = [
  {
    value: 'mse',
    label: 'mse'
  },
  {
    value: 'mae',
    label: 'mae'
  },
  {
    value: 'rscore',
    label: 'rscore'
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
