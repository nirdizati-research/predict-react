/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {makeTable, normalizeSplits, splitsToString} from '../../util/dataReducers';
import {regJobs} from '../../../stories/LineChart';

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

it('returns normalized split', () => {
  expect(normalizeSplits(splits)).toEqual(completeSplits);
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

describe('generates data for prefix chart', () => {
  it('generates stuff', () => {
    const table = makeTable(regJobs, 'rmse');
    const actualTable = [
      ['Prefix length', 'complex_linear_noCluster', 'simpleIndex_linear_noCluster', 'simpleIndex_randomForest_noCluster'],
      [1, 221.72427510287082, null, null],
      [3, null, 201.76464727647456, 191.19102930552305],
      [5, null, null, 171.19102930552305]
    ];
    expect(table).toEqual(actualTable);
  });
});
