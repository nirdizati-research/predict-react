/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {makeLabels, makeTable} from '../../util/dataReducers';
import {regJobs} from '../../../stories/LineChart';


/* eslint-disable max-len */
describe('generates data for prefix chart', () => {
  it('generates stuff', () => {
    const table = makeTable(regJobs, 'rmse');
    const actualTable = [
      ['Prefix length', 'randomForest_simpleIndex_noCluster', 'linear_simpleIndex_noCluster', 'linear_complex_noCluster'],
      [5, 171.19102930552305, null, null],
      [3, 191.19102930552305, 201.76464727647456, null],
      [1, null, null, 221.72427510287082],

    ];
    expect(table).toEqual(actualTable);
  });

  it('makes selectId labels from results', () => {
    const labels = makeLabels(regJobs);
    expect(labels.length).toEqual(4);
    expect(labels).toEqual([
      {
        label: 'rmse',
        value: 'rmse'
      },
      {
        label: 'mae',
        value: 'mae'
      },
      {
        label: 'rscore',
        value: 'rscore'
      },
      {
        label: 'mape',
        value: 'mape'
      }
    ]);
  });
});
