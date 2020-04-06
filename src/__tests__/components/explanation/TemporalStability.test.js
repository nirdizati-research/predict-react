import React from 'react';
import {shallow} from 'enzyme';
import TemporalStability from '../../../components/explanation/TemporalStability';
import {limeTemporalStabilityResult, temporalStabilityResult} from '../../../../stories/Explanation';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import PredictionLineChart from '../../../components/chart/PredictionLineChart';
import ScatterChartCard from '../../../components/chart/ScatterChartCard';


describe('Temporal stability', () => {
    it('All data loaded', () => {
        const element = shallow(<TemporalStability
                                limeTemporalChartData={limeTemporalStabilityResult}
                                predictionTemportalChartData={temporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isPredictionTempStabilityLoaded={true}
                                isLimeTempStabilityLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(PredictionLineChart).length).toBe(1);
        expect(element.find(ScatterChartCard).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('None of the data loaded', () => {
        const element = shallow(<TemporalStability
                                limeTemporalChartData={limeTemporalStabilityResult}
                                predictionTemportalChartData={temporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isPredictionTempStabilityLoaded={false}
                                isLimeTempStabilityLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(PredictionLineChart).length).toBe(1);
        expect(element.find(ScatterChartCard).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(2);
    });
});
