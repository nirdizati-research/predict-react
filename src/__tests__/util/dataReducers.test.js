/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {makeLabels, makeTable, parseLimeResult, getTraceAttributes, getTraceIdsFromLogs} from '../../util/dataReducers';
import {regJobs} from '../../../stories/LineChart';
import {limeList, traceList} from '../../../stories/Explanation';
import {log} from '../../../stories/Logs';


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

    it('parse lime values', () => {
        const limeValues = parseLimeResult(limeList);
        expect(limeValues.labels.length).toEqual(5);
        expect(limeValues.values.length).toEqual(5);
    });

    it('parse trace attributes', () => {
        const traces = getTraceAttributes(traceList, '00000912');
        expect(traces.traceAttributesHeader.length).toEqual(10);
        expect(traces.traceEventsHeaders.length).toEqual(9);
        expect(traces.traceArr.attributes.length).toEqual(10);
        expect(traces.traceArr.events.length).toEqual(2);
        expect(traces.traceArr.events[0].length).toEqual(9);
    });

    it('get trace ids from log', () => {
        const traceIds = getTraceIdsFromLogs({'1': log}, '1');
        expect(traceIds.length).toEqual(4);
    });
});
