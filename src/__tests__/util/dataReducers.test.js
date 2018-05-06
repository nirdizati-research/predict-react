/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {makeLabels, makeTable, mergeSplitWithLogName, splitsToLabel, splitsToString} from '../../util/dataReducers';
import {regJobs} from '../../../stories/LineChart';

const splitsById = {
  1: {
    'id': 1,
    'original_log': 1,
    'test_log': null,
    'training_log': null,
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  2: {
    'id': 2,
    'original_log': null,
    'test_log': 2,
    'training_log': 3,
    'type': 'double',
    'config': {
      'value': 123,
      'setting': 'something',
      'value2': 123,
      'setting2': 'something'
    }
  }
};

const logsById = {
  1: {'id': 1, 'name': 'log1'},
  2: {'id': 2, 'name': 'log2'},
  3: {'id': 3, 'name': 'log3'}
};
const splits = [
  {
    'id': 1,
    'original_log': {'id': 1, 'name': 'log1'},
    'test_log': null,
    'training_log': null,
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'original_log': null,
    'test_log': {'id': 2, 'name': 'log2'},
    'training_log': {'id': 3, 'name': 'log3'},
    'type': 'double',
    'config': {
      'value': 123,
      'setting': 'something',
      'value2': 123,
      'setting2': 'something'
    }
  }
];

const completeSplits = [
  {
    'id': 1,
    'originalLogName': 'log1',
    'testLogName': '', 'trainingLogName': '',
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'originalLogName': '',
    'testLogName': 'log2',
    'trainingLogName': 'log3',
    'type': 'double',
    'config': {'setting': 'something', 'setting2': 'something', 'value': 123, 'value2': 123}
  }
];

it('merges splits with log names', () => {
  expect(mergeSplitWithLogName(splitsById, logsById)).toMatchObject(completeSplits);
});

describe('split to string', () => {
  const stringLabels = splitsToString(splits);

  it('formats single split', () => {
    expect(stringLabels[0]).toEqual({value: 1, label: 'Split #1, log1'});
  });

  it('formats double split', () => {
    expect(stringLabels[1]).toEqual({value: 2, label: 'Split #2, logs log3 and log2'});
  });
});

describe('split to label', () => {
  const stringLabels = splitsToLabel(splitsById, logsById);

  it('formats single split', () => {
    expect(stringLabels[0]).toEqual({value: 1, label: 'Split #1, log1'});
  });

  it('formats double split', () => {
    expect(stringLabels[1]).toEqual({value: 2, label: 'Split #2, logs log3 and log2'});
  });
});

/* eslint-disable max-len */
describe('generates data for prefix chart', () => {
  it('generates stuff', () => {
    const table = makeTable(regJobs, 'rmse');
    const actualTable = [
      ['Prefix length', 'randomForest_simpleIndex_noCluster', 'linear_simpleIndex_noCluster', 'linear_complex_noCluster'],
      [5, 171.19102930552305, null, null],
      [3, 191.19102930552305, 201.76464727647456, null],
      [1, null, null, 221.72427510287082],

    ];
    expect(table).toEqual(actualTable);
  });

  it('makes selectId labels from results', () => {
    const labels = makeLabels(regJobs);
    expect(labels.length).toEqual(3);
    expect(labels).toEqual([{
      label: 'rmse',
      value: 'rmse'
    },
      {
        label: 'mae',
        value: 'mae'
      },
      {
        label: 'rscore',
        value: 'rscore'
      }]);
  });
});
