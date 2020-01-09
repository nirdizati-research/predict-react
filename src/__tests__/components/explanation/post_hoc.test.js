import React from 'react';
import {shallow} from 'enzyme';
import PostHocExplanation from '../../../components/explanation/post_hoc';
import HorizontalBarChartCard from '../../../components/chart/HorizontalBarChartCard';
import {parseLimeResult} from '../../../util/dataReducers';
import {limeList} from '../../../../stories/Explanation';

describe('TraceTable', () => {
    it('renders without data', () => {
        const element = shallow(<PostHocExplanation
                                    jobs={[]}
                                    isLimeValuesLoaded={true}
                                    traceId={1}
                                    limeValueList={{labels: [], values: []}}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(0);
    });

    it('renders with data', () => {
        const element = shallow(<PostHocExplanation
                                    jobs={[]}
                                    isLimeValuesLoaded={true}
                                    traceId={1}
                                    limeValueList={parseLimeResult(limeList)}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(1);
    });
});
