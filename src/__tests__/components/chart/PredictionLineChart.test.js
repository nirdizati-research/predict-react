import React from 'react';
import {shallow} from 'enzyme';
import ReactApexChart from 'react-apexcharts';
import PredictionLineChart from '../../../components/chart/PredictionLineChart';

const categories = ['event', 'event1', 'event2', 'event3', 'event4'];
const values = [[16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1]];

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

  });

  it('renders with non empty data and label', () => {
    const element = shallow(<PredictionLineChart data={values} categories={categories}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);

    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.series.length).toBe(5);
  });
});
