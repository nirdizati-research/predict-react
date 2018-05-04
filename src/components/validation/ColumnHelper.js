/**
 * Created by tonis.kasekamp on 10/11/17.
 */
import {CLASSIFICATION, REGRESSION} from '../../reference';

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
    label: 'Accuracy',
  },
  {
    type: 'string',
    label: 'Method',
  },
  {
    type: 'number',
    label: 'AUC',
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
    label: 'Accuracy',
  },
  {
    type: 'number',
    label: 'AUC',
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
    label: 'rscore',
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
    label: 'R-score',
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
    // no default
  }
};

export const getPrefixChartHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return prefixColumnsReg;
    case CLASSIFICATION:
      return prefixColumnsClass;
    // no default
  }
};

const desc = 'Bubble chart by ';
const regTitles = ['regression method', 'encoding method', 'clustering method'].map((elem) => desc + elem);
const classTitles = ['classification method', 'encoding method', 'clustering method'].map((elem) => desc + elem);

export const getTitles = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTitles;
    case CLASSIFICATION:
      return classTitles;
    // no default
  }
};

export const getTableHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTableColumns;
    case CLASSIFICATION:
      return classTableColumns;
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
