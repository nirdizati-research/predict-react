import React from 'react';
import {shallow} from 'enzyme';
import ICEResult from '../../../components/explanation/ICEResult';
import IceResultTable from '../../../components/explanation/IceResultTable';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import VerticalBarChartCard from '../../../components/chart/VerticalBarChartCard';
import {parseICEResult} from '../../../util/dataReducers';
import {iceResultList} from '../../../../stories/Explanation';
import SelectField from 'react-md/lib/SelectFields';

const iceResult = parseICEResult(iceResultList);

describe('ICE result', () => {
    it('All data loaded', () => {
        const element = shallow(<ICEResult
            originalList = {iceResult}
            iceValueList={iceResult}
            jobId={12}
            isIceValuesLoaded={true}
            selectedAttribute={'Age_1'}
            onChangeFeature={new function () {}}
            attributes={['Age_1', 'Age_2']}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(2);

        expect(element.find(VerticalBarChartCard).length).toBe(1);
        expect(element.find(IceResultTable).length).toBe(0);

        expect(element.find(CircularProgress).length).toBe(0);
    });

    it('None of the data loaded', () => {
        const element = shallow(<ICEResult
            iceValueList={iceResult}
            originalList = {iceResult}
            jobId={12}
            isIceValuesLoaded={false}
            selectedAttribute={'Age_1'}
            attributes={['Age_1', 'Age_2']}/>);
        expect(element).toBeDefined();
        expect(element.find(SelectField).length).toBe(1);
        expect(element.find(SelectField).at(0).props().menuItems.length).toBe(2);
        expect(element.find(VerticalBarChartCard).length).toBe(1);
        expect(element.find(IceResultTable).length).toBe(0);
        expect(element.find(CircularProgress).length).toBe(1);
    });
});
