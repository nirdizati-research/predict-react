/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {mergeSplitWithLogName, splitsToLabel} from '../../util/unNormalize';

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


describe('split to label', () => {
  const stringLabels = splitsToLabel(splitsById, logsById);

  it('formats single split', () => {
    expect(stringLabels[0]).toEqual({value: 1, label: 'Split #1, log1'});
  });

  it('formats double split', () => {
    expect(stringLabels[1]).toEqual({value: 2, label: 'Split #2, logs log3 and log2'});
  });
});

