import React from 'react';
import {shallow} from 'enzyme';
import ShapResult from '../../../components/explanation/ShapResult';
import {shapData} from '../../../../stories/Explanation';
import InlineSVG from 'svg-inline-react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import HorizontalBarChartCard from "../../../components/chart/HorizontalBarChartCard";

describe('Shap result', () => {
    it('renders with data', () => {
        const element = shallow(<ShapResult
                                jobs={[]}
                                shapValueList={shapData[0]}
                                traceId={'12'}
                                jobId={11}
                                shapSelectedTrace={'2_3301'}
                                attributeId={'prefix_1'}
                                isShapValuesLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(1);
    });

    it('renders without data', () => {
        const element = shallow(<ShapResult
                                jobs={[]}
                                shapValueList={shapData[1]}
                                traceId={'12'}
                                jobId={11}
                                shapSelectedTrace={'2_3301'}
                                attributeId={''}
                                isShapValuesLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(0);
    });
});
