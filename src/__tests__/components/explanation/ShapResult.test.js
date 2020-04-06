import React from 'react';
import {shallow} from 'enzyme';
import ShapResult from '../../../components/explanation/ShapResult';
import {shapResult} from '../../../../stories/Explanation';
import InlineSVG from 'svg-inline-react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

describe('Shap result', () => {
    it('renders with data', () => {
        const element = shallow(<ShapResult
                                shapValueList={shapResult[1]}
                                traceId={'12'}
                                jobId={11}
                                shapSelectedTrace={'2_3301'}
                                isShapValuesLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(InlineSVG).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('renders without data', () => {
        const element = shallow(<ShapResult
                                shapValueList={{}}
                                traceId={'12'}
                                jobId={11}
                                shapSelectedTrace={'2_3301'}
                                isShapValuesLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(InlineSVG).length).toBe(0);
        expect(element.find(CircularProgress).length).toBe(1);
    });
});
