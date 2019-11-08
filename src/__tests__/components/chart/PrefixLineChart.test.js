import React from 'react';
import {shallow} from 'enzyme';
import {Chart} from 'react-google-charts';
import PrefixLineChart from '../../../components/chart/PrefixLineChart';
import {labelJobs} from '../../../../stories/Charts';


const element = shallow(<PrefixLineChart jobs={labelJobs}/>);
it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
});

it('maps jobs to chart', () => {
    const chartProps = element.find(Chart).props();

    expect(chartProps.rows.length).toBe(4);
    expect(chartProps.columns.length).toBe(5);
    expect(chartProps.options.hAxis.minValue).toBe(1);
});

