/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import {REGRESSION, SPLIT_SINGLE} from '../reference';

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

export const jobToConfigTable = (job) => {
  if (job.type === REGRESSION) {
    return {
      id: job.id,
      type: job.type,
      created_date: job.created_date,
      modified_date: job.modified_date,
      splitName: splitToString(job.split),
      run: toRun(job),
      status: job.status,
      prefix_length: job.config.prefix_length,
      error: job.error
    };
  } else {
    return {
      id: job.id,
      type: job.type,
      created_date: job.created_date,
      modified_date: job.modified_date,
      splitName: splitToString(job.split),
      run: toRun(job),
      status: job.status,
      prefix_length: job.config.prefix_length,
      rule: job.config.rule,
      threshold: job.config.threshold,
      error: job.error
    };
  }
};


const toRun = (job) => {
  return `Encoding: ${job.config.encoding}, method: ${job.config.method}, clustering: ${job.config.clustering}`;
};


