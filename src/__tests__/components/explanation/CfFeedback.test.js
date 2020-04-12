import React from 'react';
import {shallow} from 'enzyme';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {retrainResult, cfFeedbackResult} from '../../../../stories/Explanation';
import CfFeedback from '../../../components/explanation/CfFeedback';
import RetrainResultTable from '../../../components/explanation/RetrainResultTable';
import {TextField} from 'react-md';


describe('CfFeedback result', () => {
    it('All data loaded', () => {
        const element = shallow(<CfFeedback
            jobId = {1}
            cfFeedbackValue={cfFeedbackResult}
            isCfFeedbackValuesLoaded={true}
            isRetrainValuesLoaded={true}
            isEncodedUniqueValuesLoaded={true}
            retrainValue={retrainResult}
            featureNames={['Age', 'Prefix']}
            featureValues={[{'Age': [1, 2]}, {'Prefix': [1, 2]}]}
            onSubmitTopK={new function () {}}
            onSubmitFeatureNamesAndValues={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(1);
        expect(element.find(TextField).at(0).props().min).toBe(0);
        expect(element.find(RetrainResultTable).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(0);
    });

    // it('None of the data loaded', () => {
        const element = shallow(<CfFeedback
            jobId = {1}
            cfFeedbackValue={[]}
            isCfFeedbackValuesLoaded={false}
            isRetrainValuesLoaded={false}
            isEncodedUniqueValuesLoaded={false}
            retrainValue={[]}
            featureNames={['Age', 'Prefix']}
            featureValues={[{'Age': [1, 2]}, {'Prefix': [1, 2]}]}
            onSubmitTopK={new function () {}}
            onSubmitFeatureNamesAndValues={new function () {}}/>);
        expect(element).toBeDefined();
        expect(element.find(TextField).length).toBe(1);
        expect(element.find(TextField).at(0).props().min).toBe(0);
        expect(element.find(RetrainResultTable).length).toBe(1);
        expect(element.find(CircularProgress).length).toBe(3);
});
