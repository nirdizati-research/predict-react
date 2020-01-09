import React from 'react';
import {shallow} from 'enzyme';
import ReactApexChart from 'react-apexcharts';
import PredictionLineChart from '../../../components/chart/PredictionLineChart';

const categories = ['event', 'event1', 'event2', 'event3', 'event4'];
const values = [1, 0.8, 0.1, 0.3, 0];

describe('PredictionLineChart', () => {
  it('renders with empty data', () => {
    const element = shallow(<PredictionLineChart data={[]} categories={[]}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(0);
  });

  it('renders with empty labels', () => {
    const element = shallow(<PredictionLineChart data={values} categories={[]}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);

    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.options.xaxis.categories.length).toBe(0);
  });

  it('renders with non empty data and label', () => {
    const element = shallow(<PredictionLineChart data={values} categories={categories}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);

    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.options.xaxis.categories.length).toBe(5);
    expect(chartProps.series[0].data.length).toBe(5);
  });
});
