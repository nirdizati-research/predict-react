/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {normalizeSplits} from '../../util/dataReducers';

const splits = [
  {
    'id': 1,
    'originalLog': {'id': 1, 'name': 'log1'},
    'testLog': null,
    'trainingLog': null,
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'originalLog': null,
    'testLog': {'id': 2, 'name': 'log2'},
    'trainingLog': {'id': 3, 'name': 'log3'},
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

