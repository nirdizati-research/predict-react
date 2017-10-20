/**
 * Created by tonis.kasekamp on 10/11/17.
 */

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

export const classColumns = [
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

export const regColumns = [
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
