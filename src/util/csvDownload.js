// Transform data to CSV format
export const makeCSV = (columns, data) => {
  const header = columns.map((el) => el.label).join() + '\n';
  return header + data.map((row) => row.join()).join('\n');
};
