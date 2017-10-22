/**
 * Created by tonis.kasekamp on 10/11/17.
 */
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';

const tableColumns = [
  {
    type: 'string',
    label: 'uuid',
  },
  {
    type: 'string',
    label: 'run',
  }
];

const classColumns = [
  {
    type: 'string',
    label: 'uuid',
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
  }
];

const regColumns = [
  {
    type: 'string',
    label: 'uuid',
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
  }
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
