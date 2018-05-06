/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import {CLASSIFICATION, REGRESSION, SPLIT_SINGLE} from '../reference';

const logOrDefault = (logsById, log) => (logsById[log] ? logsById[log].name : '');
export const mergeSplitWithLogName = (splitsById, logsById) => {
  return Object.values(splitsById).map((split) => ({
    ...split,
    originalLogName: logOrDefault(logsById, split.original_log),
    testLogName: logOrDefault(logsById, split.test_log),
    trainingLogName: logOrDefault(logsById, split.training_log)
  }));
};

export const splitsToLabel = (splitsById, logsById) => {
  return Object.values(splitsById).map((split) => {
    return {value: split.id, label: splitToLabel(logsById, split)};
  });
};

/* eslint-disable max-len */
export const splitToLabel = (logsById, split) => {
  let label;
  if (split.type === SPLIT_SINGLE) {
    label = `Split #${split.id}, ${logOrDefault(logsById, split.original_log)}`;
  } else {
    label = `Split #${split.id}, logs ${logOrDefault(logsById, split.training_log)} and ${logOrDefault(logsById, split.test_log)}`;
  }
  return label;
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
  const kmeans = job.config.kmeans;
  if (job.type === REGRESSION) {
    return {
      id: job.id,
      type: job.type,
      encoding: job.config.encoding,
      clustering: job.config.clustering,
      method: job.config.method,
      splitName: splitToString(job.split),
      prefix_length: job.config.prefix_length,
      padding: job.config.padding,
      hyperopt: job.config.hyperopt,
      label: job.config.label,
      kmeans,
      create_models: job.config.create_models,
      advanced: job.config[`${REGRESSION}.${job.config.method}`]
    };
  } else if (job.type === CLASSIFICATION) {
    return {
      id: job.id,
      type: job.type,
      encoding: job.config.encoding,
      clustering: job.config.clustering,
      method: job.config.method,
      splitName: splitToString(job.split),
      prefix_length: job.config.prefix_length,
      padding: job.config.padding,
      hyperopt: job.config.hyperopt,
      label: job.config.label,
      create_models: job.config.create_models,
      kmeans,
      advanced: job.config[`${job.type}.${job.config.method}`]
    };
  } else {
    return {
      id: job.id,
      encoding: job.config.encoding,
      splitName: splitToString(job.split),
      prefix_length: job.config.prefix_length,
      padding: job.config.padding,
      label: job.config.label,
      result: job.result
    };
  }
};

export const toRun = (job) => {
  return `${job.config.method}_${job.config.encoding}_${job.config.clustering}`;
};

const toLineObject = (job, metricName) => {
  const metric = job.result[metricName];
  return {run: toRun(job), prefix_length: job.config.prefix_length, metric};
};

const uniqEs6 = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};

const uniqueJobRuns = (lineObjects) => {
  const runs = lineObjects.map((ob) => ob.run);
  return uniqEs6(runs);
};

const uniquePrefixes = (lineObjects) => {
  const runs = lineObjects.map((ob) => ob.prefix_length);
  return uniqEs6(runs);
};

const makeEmptyPrefixRows = (uniqPrefs, columnSize) => {
  return uniqPrefs.map((u) => [u, ...Array.from({length: columnSize}, (_) => null)]);
};

const compareByPrefix = (a, b) => {
  if (a.prefix_length > b.prefix_length) {
    return -1;
  }
  if (a.prefix_length < b.prefix_length) {
    return 1;
  }
  return 0;
};

export const makeTable = (jobs, metricName) => {
  const lineObjects = jobs.map((job) => toLineObject(job, metricName));
  lineObjects.sort(compareByPrefix);
  const uniqueRuns = uniqueJobRuns(lineObjects);
  const header = ['Prefix length', ...uniqueRuns];
  const uniquePrefs = uniquePrefixes(lineObjects);
  const prefixRows = makeEmptyPrefixRows(uniquePrefs, uniqueRuns.length);
  // empty shell ready
  let dataTable = [header, ...prefixRows];

  for (let ob of lineObjects) {
    const column = dataTable[0].findIndex((el) => el === ob.run);
    const row = uniquePrefs.findIndex((el) => el === ob.prefix_length) + 1;
    dataTable[row][column] = ob.metric;
  }
  return dataTable;
};

export const makeLabels = (jobs) => {
  if (jobs.length === 0) {
    return [];
  }
  return Object.keys(jobs[0].result).map((metric) => {
    return {label: metric, value: metric};
  });
};
