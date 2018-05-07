const compareByPrefix = (a, b) => {
  if (a.config.prefix_length < b.config.prefix_length) {
    return -1;
  }
  if (a.config.prefix_length > b.config.prefix_length) {
    return 1;
  }
  return 0;
};

const reducer = (accumulator, currentValue) => accumulator.concat(currentValue);
export const labelJobToTable = (jobs) => {
  jobs.sort(compareByPrefix);
  const allResultKeys = jobs.map((job) => Object.keys(job.result).map((metric) => metric));
  const headers = [...new Set(allResultKeys.reduce(reducer, []))];
  const rows = jobs.map((job) => [job.config.prefix_length, ...headers.map((h) => job.result[h])]);
  return [['Prefix length', ...headers], ...rows];
};
