/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import {SPLIT_SINGLE} from '../reference';


export const normalizeSplits = (splits) => {
  return splits.map((split) => {
    let originalLogName;
    let trainingLogName;
    let testLogName;

    if (split.type === SPLIT_SINGLE) {
      originalLogName = split.originalLog.name;
      trainingLogName = '';
      testLogName = '';
    } else {
      originalLogName = '';
      trainingLogName = split.trainingLog.name;
      testLogName = split.testLog.name;
    }
    return {id: split.id, config: split.config, type: split.type, originalLogName, trainingLogName, testLogName};
  });
};


