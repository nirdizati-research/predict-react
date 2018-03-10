/**
 * Created by tonis.kasekamp on 10/11/17.
 */
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';

const tableColumns = [
  {
    type: 'string',
    label: 'id',
  },
  {
    type: 'string',
    label: 'run',
  }
];

const classColumns = [
  {
    type: 'string',
    label: 'id',
  },
  {
    type: 'number',
    label: 'fmeasure',
  },
  {
    type: 'number',
    label: 'acc',
  },
  {
    type: 'string',
    label: 'method',
  },
  {
    type: 'number',
    label: 'auc',
  }
];
const classTableColumns = [
  ...tableColumns,
  {
    type: 'number',
    label: 'fmeasure',
  },
  {
    type: 'number',
    label: 'acc',
  },
  {
    type: 'number',
    label: 'auc',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
];

const regColumns = [
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
    label: 'method',
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
    label: 'mae',
  },
  {
    type: 'number',
    label: 'rmse',
  },
  {
    type: 'number',
    label: 'rscore',
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
    case NEXT_ACTIVITY:
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
    case NEXT_ACTIVITY:
      return prefixColumnsClass;
    // no default
  }
};

const desc = 'Bubble chart by ';
const regTitles = ['regressor', 'clustering', 'encoding'].map((elem) => desc + elem);
const classTitles = ['classifier', 'clustering', 'encoding'].map((elem) => desc + elem);

export const getTitles = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTitles;
    case CLASSIFICATION:
      return classTitles;
    case NEXT_ACTIVITY:
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
    case NEXT_ACTIVITY:
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
    label: 'fmeasure',
  },
  {
    type: 'number',
    label: 'acc',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'auc',
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
