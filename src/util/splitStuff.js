import {SPLIT_SINGLE} from '../reference';

export const getLogProperties = (splits, splitId) => {
  const split = splits.filter((split) => split.id === splitId)[0];
  let logs;
  if (split.type === SPLIT_SINGLE) {
    logs = [split.original_log];
  } else {
    logs = [split.training_log, split.test_log];
  }
  const arr = logs.map((log) => log.properties.maxEventsInLog);
  const max = arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
  return {maxEventsInLog: max, traceAttributes: logs[0].properties.traceAttributes};
};
