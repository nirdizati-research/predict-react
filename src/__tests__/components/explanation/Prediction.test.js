import React from 'react';
import {shallow} from 'enzyme';
import Prediction from '../../../components/explanation/Prediction';
import {temporalStabilityResult} from '../../../../stories/Explanation';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import ScatterChartCard from '../../../components/chart/ScatterChartCard';


describe('Prediction', () => {
    it('All data loaded', () => {
        const element = shallow(<Prediction
                                predictionTemportalChartData={temporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isPredictionTempStabilityLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(ScatterChartCard).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('None of the data loaded', () => {
        const element = shallow(<Prediction
                                predictionTemportalChartData={temporalStabilityResult}
                                traceId={'2_3301'}
                                jobId={57}
                                isPredictionTempStabilityLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(ScatterChartCard).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(1);
    });
});

