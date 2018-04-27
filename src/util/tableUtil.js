const compareByPrefix = (a, b) => {
  if (a.config.prefix_length < b.config.prefix_length) {
    return -1;
  }
  if (a.config.prefix_length > b.config.prefix_length) {
    return 1;
  }
  return 0;
};

export const labelJobToTable = (jobs) => {
  jobs.sort(compareByPrefix);
  const headers = Object.keys(jobs[0].result).map((metric) => metric);

  const rows = jobs.map((job) => [job.config.prefix_length, ...headers.map((h) => job.result[h])]);
  return [['Prefix length', ...headers], ...rows];
};
