import React from 'react';
import {shallow} from 'enzyme';
import LimeResult from '../../../components/explanation/LimeResult';
import HorizontalBarChartCard from '../../../components/chart/HorizontalBarChartCard';
import {parseLimeResult} from '../../../util/dataReducers';
import {limeList} from '../../../../stories/Explanation';

describe('Lime result', () => {
    it('renders without data', () => {
        const element = shallow(<LimeResult
                                    jobs={[]}
                                    isLimeValuesLoaded={true}
                                    traceId={1}
                                    limeValueList={{labels: [], values: []}}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(0);
    });

    it('renders with data', () => {
        const element = shallow(<LimeResult
                                    jobs={[]}
                                    isLimeValuesLoaded={true}
                                    traceId={1}
                                    limeValueList={parseLimeResult(limeList, '2_100', 'prefix_5')}/>);
        expect(element).toBeDefined();
        expect(element.find(HorizontalBarChartCard).length).toBe(1);
    });
});
