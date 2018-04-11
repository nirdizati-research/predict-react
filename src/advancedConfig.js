/* Advanced configuration defaults */

const classificationRandomForest = {
  'n_estimators': 10,
  'criterion': 'gini',
  'max_depth': null,
  'min_samples_split': 2,
  'min_samples_leaf': 1
};

const classificationKnn = {
  'n_neighbors': 5,
  'weights': 'uniform'
};

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
