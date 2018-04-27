import {labelJobs} from '../../../stories/Charts';
import {labelJobToTable} from '../../util/tableUtil';

const labellingData = [
  ['Prefix length', 'rmse', 'mae'],
  [1, 221, 193],
  [3, 191, 138],
  [4, 201, 165],
  [5, 171, 128],
];

it('creates label chart data', () => {
  const data = labelJobToTable(labelJobs);
  expect(data).toEqual(labellingData);
});
