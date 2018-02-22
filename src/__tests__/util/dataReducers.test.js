/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {normalizeSplits, splitsToString} from '../../util/dataReducers';

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
    expect(stringLabels[0]).toEqual({value: 1, label: 'Split #1 of log log1'});
  });

  it('formats double split', () => {
    expect(stringLabels[1]).toEqual({value: 2, label: 'Split #2 of logs log3 and log2'});
  });
});
