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
