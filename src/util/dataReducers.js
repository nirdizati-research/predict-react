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
      prefix_length: job.config.prefix_length,
      padding: job.config.padding,
      hyperopt: job.config.hyperopt,
      create_models: job.config.create_models,
      advanced: job.config[`${REGRESSION}.${job.config.method}`]
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
      threshold: job.config.threshold,
      padding: job.config.padding,
      hyperopt: job.config.hyperopt,
      create_models: job.config.create_models,
      advanced: job.config[`${job.type}.${job.config.method}`]
    };
  }
};

const toRun = (job) => {
  return `${job.config.encoding}_${job.config.method}_${job.config.clustering}`;
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

export const makeTable = (jobs, metricName) => {
  const lineObjects = jobs.map((job) => toLineObject(job, metricName));
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
