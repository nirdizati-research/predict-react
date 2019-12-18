import React from 'react';
import {shallow} from 'enzyme';
import {CLASSIFICATION, REGRESSION} from '../../../reference';
import {regJobs} from '../../../../stories/LineChart';
import {SelectField} from 'react-md';
import {classJobs} from '../../../../stories/Validation';
import RadarChartCard from '../../../components/chart/RadarChartCard';
import ControlledRadarChartCard from '../../../components/chart/ControlledRadarChartCard';


const element = shallow(<ControlledRadarChartCard predictionMethod={REGRESSION} jobs={regJobs}/>);
it('renders', () => {
  expect(element).toBeDefined();
  expect(element.find(RadarChartCard).length).toBe(1);
  expect(element.find(SelectField).length).toBe(2);

  expect(element.find(SelectField).at(0).props().menuItems.length).toBeGreaterThanOrEqual(1);
  expect(element.find(SelectField).at(0).props().menuItems).toContain('average');
  expect(element.find(SelectField).at(1).props().menuItems.length).toBeGreaterThanOrEqual(1);
  expect(element.find(SelectField).at(1).props().menuItems).toContain('All');
});

it('maps jobs to chart', () => {
  const radarChartProps = element.find(RadarChartCard).props();
  expect(radarChartProps.labels).toContain('rmse');
  expect(radarChartProps.data.length).toBe(1);
  expect(radarChartProps.data[0].data.length).toBe(4);
  expect(radarChartProps.labels.length).toBe(4);
});


it('when updating', () => {
  const upEl = shallow(<ControlledRadarChartCard predictionMethod={CLASSIFICATION} jobs={classJobs}/>);
  expect(upEl.find(SelectField).length).toBe(2);
  expect(upEl.find(SelectField).at(0).props().menuItems.length).toBeGreaterThanOrEqual(1);
  expect(upEl.find(SelectField).at(1).props().menuItems.length).toBeGreaterThanOrEqual(1);

  const radarChartProps = upEl.find(RadarChartCard).props();
  expect(radarChartProps.labels).toContain('f1_score');
  expect(radarChartProps.data.length).toBe(1);
  expect(radarChartProps.data[0].data.length).toBe(5);
  expect(radarChartProps.labels.length).toBe(5);
  expect(Math.max(...radarChartProps.data[0].data)).toBeLessThanOrEqual(1);
  expect(Math.min(...radarChartProps.data[0].data)).toBeGreaterThanOrEqual(0);
});

