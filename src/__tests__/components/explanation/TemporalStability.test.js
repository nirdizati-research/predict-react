import React from 'react';
import {shallow} from 'enzyme';
import TemporalStability from '../../../components/explanation/TemporalStability';
import {limeTemporalStabilityResult, shapTemporalStabilityResult} from '../../../../stories/Explanation';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import PredictionLineChart from '../../../components/chart/PredictionLineChart';


describe('Temporal stability', () => {
    it('All data loaded', () => {
        const element = shallow(<TemporalStability
                                limeTemporalChartData={limeTemporalStabilityResult}
                                shapTemporalChartData={shapTemporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isShapTempStabilityLoaded={true}
                                isLimeTempStabilityLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(PredictionLineChart).length).toBe(2);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('None of the data loaded', () => {
        const element = shallow(<TemporalStability
                                limeTemporalChartData={limeTemporalStabilityResult}
                                shapTemporalChartData={shapTemporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isShapTempStabilityLoaded={false}
                                isLimeTempStabilityLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(PredictionLineChart).length).toBe(2);
        expect(element.find(CircularProgress).length).toBe(2);
    });
});
