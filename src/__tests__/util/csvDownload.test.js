import {makeCSV} from '../../util/csvDownload';
import {getTableHeader} from '../../components/validation/ColumnHelper';
import {REGRESSION} from '../../reference';

/* eslint-disable max-len */
const regData = [
    [1, 'linear', 321.16984512656944, 470.1483088530332, 13.12, '1', -0.75205320910182749],
    [2, 'xboost', 218.33484913201886, 218.33484913201886, 23.45, '1', 0.10676014147290103]
];

it('creates csv file', () => {
    const csv = makeCSV(getTableHeader(REGRESSION), regData);
    expect(csv).toEqual(
        'ID,Task identity,Mean Absolute Error (MAE),Root Mean Squared Error (RMSE),Mean Absolute Percentage Error (MAPE),Prefix length,R-score\n' +
        '1,linear,321.16984512656944,470.1483088530332,13.12,1,-0.7520532091018275\n' +
        '2,xboost,218.33484913201886,218.33484913201886,23.45,1,0.10676014147290103');
});
