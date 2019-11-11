import {labelJobs} from '../../../stories/Charts';
import {labelJobToTable} from '../../util/tableUtil';

const labellingData = [
    ['Prefix length', 'rmse', 'mae', 'END', 'third'],
    [1, 221, 193, 0, 0],
    [3, 191, 138, 23, 0],
    [4, 201, 165, 0, 34],
    [5, 171, 128, 0, 0],
];

it('creates label chart data', () => {
    const data = labelJobToTable(labelJobs);
    expect(data).toEqual(labellingData);
});
