import React from 'react';
import {shallow} from 'enzyme';
import TimeSeriesPredictionMethodsCard
    from '../../../components/static/TimeSeriesPredictionMethodsCard';
import {Card} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {
    hAxis: {
        title: 'Time Series Prediction methods',
        minValue: 0,
    },
    vAxis: {
        title: 'Time in seconds',
    },
    chartArea: {width: '60%'},
    isStacked: false,
};
const columns2 = [
    {type: 'string', label: 'Time Series Prediction method'},
    {type: 'number', label: 'Method time'},
    {type: 'string', role: 'annotation'},
];
const dataClass = [
    columns2,
    ['Decision tree', 0.06, '0.06'],
    ['Random forest', 0.39, '0.39'],
    ['KNN', 4.60, '4.60'],
];
describe('HelpDialog result', () => {
    it('Visible item', () => {
        const element = shallow(<TimeSeriesPredictionMethodsCard
           />);
        expect(element).toBeDefined();
        expect(element.find(Card).length).toBe(1);
        expect(element.find(Chart).length).toBe(1);
        expect(element.find(Chart).at(0).props().data.toString()).toBe(dataClass.toString());
        expect(element.find(Chart).at(0).props().options.toString()).toBe(opts.toString());
    });
});
