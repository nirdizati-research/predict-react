import {labelJobs} from '../../../stories/Charts';
import {labelJobToTable} from '../../util/tableUtil';

const labellingData = [
  ['Prefix length', 'rmse', 'mae', 'third'],
  [1, 221, 193, undefined],
  [3, 191, 138, undefined],
  [4, 201, 165, 34],
  [5, 171, 128, undefined],
];

it('creates label chart data', () => {
  const data = labelJobToTable(labelJobs);
  expect(data).toEqual(labellingData);
});
