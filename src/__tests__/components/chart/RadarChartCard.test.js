import React from 'react';
import {shallow} from 'enzyme';
import RadarChartCard from '../../../components/chart/RadarChartCard';
import ReactApexChart from 'react-apexcharts';

const labels = ['f1_score', 'accuracy', 'precision', 'recall', 'auc'];
const values = [1, 0.8, 0.1, 0.3, 0];

describe('RadarChartCard', () => {
  it('renders with full data', () => {
    const element = shallow(<RadarChartCard data={values} labels={labels}/>);
    expect(element).toBeDefined();
    const chartProps = element.find(ReactApexChart).props();
    expect(element.find(ReactApexChart).length).toBe(1);
    expect(chartProps.options.labels.length).toBe(5);
    expect(chartProps.options.labels[0]).toEqual('f1_score');
    expect(chartProps.options.labels[4]).toEqual('auc');
    expect(chartProps.series).toEqual(values);
  });

  it('renders without labels', () => {
    const element = shallow(<RadarChartCard data={values} labels={[]}/>);
    expect(element).toBeDefined();
    const chartProps = element.find(ReactApexChart).props();
    expect(element.find(ReactApexChart).length).toBe(1);
    expect(chartProps.options.labels.length).toBe(0);
    expect(chartProps.series).toEqual(values);
  });

  it('renders without data', () => {
    const element = shallow(<RadarChartCard data={[]} labels={[]}/>);
    expect(element).toBeDefined();
    const chartProps = element.find(ReactApexChart).props();
    expect(element.find(ReactApexChart).length).toBe(1);
    expect(chartProps.options.labels.length).toBe(0);
    expect(chartProps.series).toEqual([]);
  });
});
