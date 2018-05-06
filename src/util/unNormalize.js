// methods to interact with byId stuff

import {SPLIT_SINGLE} from '../reference';

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
const splitToLabel = (logsById, split) => {
  let label;
  if (split.type === SPLIT_SINGLE) {
    label = `Split #${split.id}, ${logOrDefault(logsById, split.original_log)}`;
  } else {
    label = `Split #${split.id}, logs ${logOrDefault(logsById, split.training_log)} and ${logOrDefault(logsById, split.test_log)}`;
  }
  return label;
};

export const mapJobs = (logsById, splitsById, jobsById) => {
  return Object.values(jobsById).map((job) => {
    return {
      ...job,
      splitName: splitToLabel(logsById, splitsById[job.split_id])
    };
  });
};
