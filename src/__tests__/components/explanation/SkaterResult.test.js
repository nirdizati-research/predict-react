import React from 'react';
import {shallow} from 'enzyme';
import SkaterResult from '../../../components/explanation/SkaterResult';
import {skaterResult} from '../../../../stories/Explanation';
import InlineSVG from 'svg-inline-react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

describe('Skater result', () => {
    it('renders with data', () => {
        const element = shallow(<SkaterResult
                                skaterValueList={skaterResult[1]}
                                traceId={'12'}
                                isSkaterValuesLoaded={true}/>);
        expect(element).toBeDefined();
        expect(element.find(InlineSVG).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('renders without data', () => {
        const element = shallow(<SkaterResult
                                    skaterValueList={{}}
                                    traceId={'12'}
                                    isSkaterValuesLoaded={false}/>);
        expect(element).toBeDefined();
        expect(element.find(InlineSVG).length).toBe(0);
        expect(element.find(CircularProgress).length).toBe(1);
    });
});
