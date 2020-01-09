import React from 'react';
import {shallow} from 'enzyme';
import PredictionLineChartCard from '../../../components/explanation/PredictionLineChartCard';
import PredictionLineChart from '../../../components/chart/PredictionLineChart';

const data = {'11': 0.23601741983630742, '12': 0.6921891807047289, '13': 0.9996623681734312, '14': 0.7841328330041475};
const element = shallow(<PredictionLineChartCard data={data} traceId={1} jobId={1}/>);
it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(PredictionLineChart).length).toBe(1);
});

