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
export const classTableColumns = [
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

export const regTableColumns = [
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
      return regColumns;
    // no default
  }
};
