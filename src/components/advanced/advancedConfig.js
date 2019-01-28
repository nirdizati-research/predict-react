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

export const splitCriterionHoeffding = [
    {
        value: 'mc',
        label: 'Majority Class'
    },
    {
        value: 'nb',
        label: 'Naive Bayes'
    },
    {
        value: 'nba',
        label: 'Naive Bayes Adaptive'
    }
];

export const leafPredictionHoeffding = [
    {
        value: 'gini',
        label: 'Gini'
    },
    {
        value: 'info_gain',
        label: 'Information Gain'
    }
];

export const lossSGDClassifier = [
    {value: 'hinge', label: 'Hinge'},
    {value: 'log', abel: 'Log'},
    {value: 'modified_huber', label: 'Modified huber'},
    {value: 'squared_hinge', label: 'Squared hinge'},
    {value: 'perceptron', label: 'Perceptron'},
    {value: 'squared_loss', label: 'Squared loss'},
    {value: 'huber', label: 'Huber'},
    {value: 'epsilon_insensitive', label: 'Epsilon insensitive'},
    {value: 'squared_epsilon_insensitive', label: 'Squared epsilon insensitive'}
];

export const penaltySGDClassifier = [
    {value: 'None', label: 'None'},
    {value: 'l1', label: 'l1'},
    {value: 'l2', label: 'l2'},
    {value: 'elasticnet', label: 'Elastic net'},
];

export const penaltyPerceptron = [
    {value: 'None', label: 'None'},
    {value: 'l1', label: 'l1'},
    {value: 'l2', label: 'l2'},
    {value: 'elasticnet', label: 'Elastic net'},
];

export const learningRateSGDClassifier = [
    {value: 'constant', label: 'Constant'},
    {value: 'optimal', label: 'Optimal'},
    {value: 'invscaling', label: 'Inv scaling'},
    {value: 'adaptive', label: 'Adaptive'},
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
