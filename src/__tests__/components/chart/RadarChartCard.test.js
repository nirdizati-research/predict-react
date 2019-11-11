import React from 'react';
import {shallow} from 'enzyme';
import RadarChartCard from '../../../components/chart/RadarChartCard';
import ReactApexChart from 'react-apexcharts';

const labels = ['f1_score', 'accuracy', 'precision', 'recall', 'auc'];
const values = [1, 0.8, 0.1, 0.3, 0];

describe('RadarChartCard', () => {
  it('renders', () => {
    const element = shallow(<RadarChartCard data={values} labels={labels}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);
  });

  it('maps and sorts data', () => {
    const element = shallow(<RadarChartCard data={values} labels={labels}/>);
    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.series[0].data.length).toBe(5);
    expect(chartProps.options.labels.length).toBe(5);

    expect(chartProps.series[0].data[0]).toEqual(1);
    expect(chartProps.series[0].data[4]).toEqual(0);
    expect(chartProps.options.labels[0]).toEqual('f1_score');
    expect(chartProps.options.labels[4]).toEqual('auc');
  });
});
