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
    label = `Split #${split.id}, ${split.original_log.name}`;
  } else {
    label = `Split #${split.id}, logs ${split.training_log.name} and ${split.test_log.name}`;
  }
  return label;
};

export const jobToConfigTable = (job) => {
  const createdDate = new Date(job.created_date).toLocaleString();
  const modifiedDate = new Date(job.modified_date).toLocaleString();
  if (job.type === REGRESSION) {
    return {
      id: job.id,
      type: job.type,
      created_date: createdDate,
      modified_date: modifiedDate,
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
      created_date: createdDate,
      modified_date: modifiedDate,
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

export const jobToValidationTable = (job) => {
  if (job.type === REGRESSION) {
    return {
      id: job.id,
      type: job.type,
      encoding: job.config.encoding,
      clustering: job.config.clustering,
      method: job.config.method,
      splitName: splitToString(job.split),
      prefix_length: job.config.prefix_length
    };
  } else {
    return {
      id: job.id,
      type: job.type,
      encoding: job.config.encoding,
      clustering: job.config.clustering,
      method: job.config.method,
      splitName: splitToString(job.split),
      prefix_length: job.config.prefix_length,
      rule: job.config.rule,
      threshold: job.config.threshold
    };
  }
};

const toRun = (job) => {
  return `${job.config.encoding}, ${job.config.method}, ${job.config.clustering}`;
};
