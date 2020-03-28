import React from 'react';
import {shallow} from 'enzyme';
import ScatterChartCard from '../../../components/chart/ScatterChartCard';
import {parseTemporalStabilityPredictionResultList}
from '../../../util/dataReducers';
import {temporalStabilityResult} from '../../../../stories/Explanation';
import ReactApexChart from 'react-apexcharts';

const temporalStabilityPredictionResult =
parseTemporalStabilityPredictionResultList(temporalStabilityResult, '2_3301');

it('renders', () => {
    const element = shallow(<ScatterChartCard data={temporalStabilityPredictionResult}/>);
    expect(element).toBeDefined();
    expect(element.find(ReactApexChart).length).toBe(1);
    const chartProps = element.find(ReactApexChart).props();
    expect(chartProps.series[0].data.length).toBe(temporalStabilityPredictionResult.length);
});

it('no data', () => {
    const element = shallow(<ScatterChartCard data={[]}/>);
    expect(element.find(ReactApexChart).length).toBe(0);
});

