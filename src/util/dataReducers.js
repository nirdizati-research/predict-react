/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import {SPLIT_SINGLE} from '../reference';

// TODO use this in split table
export const normalizeSplits = (splits) => {
  return splits.map((split) => {
    let originalLogName;
    let trainingLogName;
    let testLogName;

    if (split.type === SPLIT_SINGLE) {
      originalLogName = split.original_log.name;
      trainingLogName = '';
      testLogName = '';
    } else {
      originalLogName = '';
      trainingLogName = split.training_log.name;
      testLogName = split.test_log.name;
    }
    return {id: split.id, config: split.config, type: split.type, originalLogName, trainingLogName, testLogName};
  });
};

export const splitsToString = (splits) => {
  return splits.map((split) => {
    return {value: split.id, label: splitToString(split)};
  });
};

export const splitToString = (split) => {
  let label;
  if (split.type === SPLIT_SINGLE) {
    label = `Split #${split.id} of log ${split.original_log.name}`;
  } else {
    label = `Split #${split.id} of logs ${split.training_log.name} and ${split.test_log.name}`;
  }
  return label;
};


