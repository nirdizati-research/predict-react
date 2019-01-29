/**
 * Created by tonis.kasekamp on 10/11/17.
 */
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';

const tableColumns = [
  {
    type: 'string',
    label: 'ID',
  },
  {
    type: 'string',
    label: 'Task identity',
  }
];

const classColumns = [
  {
    type: 'string',
    label: 'ID',
  },
  {
    type: 'number',
    label: 'F1 score',
  },
  {
    type: 'number',
    label: 'AUC',
  },
  {
    type: 'string',
    label: 'Method',
  },
  {
    type: 'number',
    label: 'Accuracy',
  }
];

const classTableColumns = [
  ...tableColumns,
  {
    type: 'number',
    label: 'F1 score',
  },
  {
    type: 'number',
    label: 'AUC',
  },
  {
    type: 'number',
    label: 'Accuracy',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'Precision',
  },
  {
    type: 'number',
    label: 'Recall',
  },
  {
    type: 'number',
    label: 'True positive',
  },
  {
    type: 'number',
    label: 'True negative',
  },
  {
    type: 'number',
    label: 'False positive',
  },
  {
    type: 'number',
    label: 'False negative',
  },
];

const regColumns = [
  {
    type: 'string',
    label: 'ID',
  },
  {
    type: 'number',
    label: 'MAE',
  },
  {
    type: 'number',
    label: 'RMSE',
  },
  {
    type: 'string',
    label: 'Method',
  },
  {
    type: 'number',
    label: 'MAPE',
  }
];

const regTableColumns = [
  ...tableColumns,
  {
    type: 'number',
    label: 'Mean Absolute Error (MAE)',
  },
  {
    type: 'number',
    label: 'Root Mean Squared Error (RMSE)',
  },
  {
    type: 'number',
    label: 'Mean Absolute Percentage Error (MAPE)',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'R-score',
  },
];

const timeSeriesPredColumns = [
    {
        type: 'string',
        label: 'ID',
    },
    {
        type: 'number',
        label: 'nlevenshtein',
    },
    {
        type: 'string',
        label: 'Method',
    },
];

const timeSeriesPredTableColumns = [
    ...tableColumns,
    {
        type: 'number',
        label: 'Nlevenshtein',
    },
    {
        type: 'string',
        label: 'Prefix length',
    },
];

export const getChartHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regColumns;
    case CLASSIFICATION:
      return classColumns;
      case TIME_SERIES_PREDICTION:
          return timeSeriesPredColumns;
    // no default
  }
};

export const getPrefixChartHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return prefixColumnsReg;
    case CLASSIFICATION:
      return prefixColumnsClass;
      case TIME_SERIES_PREDICTION:
          return prefixColumnsTimeSeriesPred;
    // no default
  }
};

const desc = 'Bubble chart by ';
const regTitles = ['regression method', 'encoding method', 'clustering method'].map((elem) => desc + elem);
const classTitles = ['classification method', 'encoding method', 'clustering method'].map((elem) => desc + elem);
const timeSeriesPredTitles = ['time series prediction method', 'encoding method', 'clustering method'].map((elem) => desc + elem);

export const getTitles = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTitles;
    case CLASSIFICATION:
      return classTitles;
      case TIME_SERIES_PREDICTION:
          return timeSeriesPredTitles;
    // no default
  }
};

export const getTableHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTableColumns;
    case CLASSIFICATION:
      return classTableColumns;
      case TIME_SERIES_PREDICTION:
          return timeSeriesPredTableColumns;
    // no default
  }
};

const prefixColumnsClass = [
  {
    type: 'string',
    label: 'id',
  },
  {
    type: 'number',
    label: 'F1 score',
  },
  {
    type: 'number',
    label: 'Accuracy',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'AUC',
  }
];

const prefixColumnsTimeSeriesPred = [
    {
        type: 'string',
        label: 'id',
    },
    {
        type: 'string',
        label: 'Prefix length',
    },
    {
        type: 'number',
        label: 'Nlevenshtein',
    },
];

const prefixColumnsReg = [
  {
    type: 'string',
    label: 'id',
  },
  {
    type: 'number',
    label: 'mae',
  },
  {
    type: 'number',
    label: 'rmse',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'rscore',
  }
];
