import React from 'react';
import {shallow} from 'enzyme';
import {Chart} from 'react-google-charts';
import ControlledLineChartCard from '../../../components/chart/ControlledLineChartCard';
import {CLASSIFICATION, REGRESSION} from '../../../reference';
import {regJobs} from '../../../../stories/LineChart';
import {SelectField} from 'react-md';
import {classJobs} from '../../../../stories/Validation';


const element = shallow(<ControlledLineChartCard predictionMethod={REGRESSION} jobs={regJobs}/>);
it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
    expect(element.find(SelectField).length).toBe(1);
    expect(element.find(SelectField).props().menuItems.length).toBe(4);
    expect(element.find(SelectField).props().value).toBe('rmse');
});

it('maps jobs to chart', () => {
    const chartProps = element.find(Chart).props();

    expect(chartProps.rows.length).toBe(3);
    expect(chartProps.columns.length).toBe(4);
    expect(chartProps.options.hAxis.minValue).toBe(5);
});


it('when updating', () => {
    const upEl = shallow(<ControlledLineChartCard predictionMethod={REGRESSION} jobs={regJobs}/>);
    upEl.setProps({predictionMethod: CLASSIFICATION, jobs: classJobs});

    expect(upEl.find(SelectField).props().menuItems.length).toBe(10);
    expect(upEl.find(SelectField).props().value).toBe('accuracy');

    const chartProps = element.find(Chart).props();
    expect(chartProps.rows.length).toBe(3);
    expect(chartProps.columns.length).toBe(4);
    expect(chartProps.options.hAxis.minValue).toBe(5);
});
