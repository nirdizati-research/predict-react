import React from 'react';
import {shallow} from 'enzyme';
import ReactApexChart from 'react-apexcharts';
import VerticalBarChartCard from '../../../components/chart/VerticalBarChartCard';

const labels = ['event', 'event1', 'event2', 'event3', 'event4'];
const data = [1, 0.8, 0.1, 0.3, 0];
const count = [1, 2, 1, 3, 9];


describe('VerticalBarChartCard', () => {
  it('renders with empty data', () => {
    const element = shallow(<VerticalBarChartCard data={[]} labels={[]} count={[]}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(0);
  });

  it('renders with empty labels', () => {
    const element = shallow(<VerticalBarChartCard data={data} labels={[]} count={count}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);

    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.options.xaxis.categories.length).toBe(0);
    expect(chartProps.series[0].data.length).toBe(count.length);
    expect(chartProps.series[1].data.length).toBe(data.length);
    expect(chartProps.options.xaxis.categories.length).toBe(0);
  });

  it('renders with non empty data and label', () => {
    const element = shallow(<VerticalBarChartCard data={data} labels={labels} count={count}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);

    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.options.xaxis.categories.length).toBe(labels.length);
    expect(chartProps.series[0].data.length).toBe(count.length);
    expect(chartProps.series[1].data.length).toBe(data.length);
  });
});
