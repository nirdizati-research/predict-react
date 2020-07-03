import React from 'react';
import {shallow} from 'enzyme';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {retrainResult, cmFeedbackResult, uniqueEncodedDecodedValues} from '../../../../stories/Explanation';
import CmFeedback from '../../../components/explanation/CmFeedback';
import RetrainResultTable from '../../../components/explanation/RetrainResultTable';
import {TextField, SelectField} from 'react-md';
import CfFeedbackResulttTable from '../../../components/explanation/CfFeedbackResulttTable';
import {getUniqueFeatureValues, getFeatureNames, encodePatternsForDropdown} from '../../../util/dataReducers';

const onSubmitTopK = jest.fn();
const onSubmitFeatureNamesAndValues = jest.fn();

describe('CmFeedback result', () => {
    it('All data loaded', () => {
        const element = shallow(<CmFeedback
            jobId = {1}
            cfFeedbackValue={cmFeedbackResult}
            isCfFeedbackValuesLoaded={true}
            isRetrainValuesLoaded={true}
            isEncodedUniqueValuesLoaded={true}
            retrainValue={retrainResult}
            featureNames={getFeatureNames(uniqueEncodedDecodedValues)}
            patterns={encodePatternsForDropdown(cmFeedbackResult[1])}
            featureValues={getUniqueFeatureValues(uniqueEncodedDecodedValues)}
            onSubmitTopK={onSubmitTopK}
            onSubmitFeatureNamesAndValues={onSubmitFeatureNamesAndValues}/>);
        expect(element).toBeDefined();
        element.setState({numberOfDropdownFeatures: 1});
        element.setState({numberOfDropdownPatterns: 1});

        expect(element.find(TextField).length).toBe(1);
        expect(element.find(CfFeedbackResulttTable).length).toBe(1);
        expect(element.find(RetrainResultTable).length).toBe(1);
        expect(element.find(TextField).at(0).props().min).toBe(0);
        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(CircularProgress).length).toBe(0);
    });

     it('None of the data loaded', () => {
        const element = shallow(<CmFeedback
            jobId = {1}
            cfFeedbackValue={cmFeedbackResult}
            isCfFeedbackValuesLoaded={false}
            isRetrainValuesLoaded={false}
            isEncodedUniqueValuesLoaded={false}
            retrainValue={retrainResult}
            featureNames={getFeatureNames(uniqueEncodedDecodedValues)}
            patterns={encodePatternsForDropdown(cmFeedbackResult[1])}
            featureValues={getUniqueFeatureValues(uniqueEncodedDecodedValues)}
            onSubmitTopK={onSubmitTopK}
            onSubmitFeatureNamesAndValues={onSubmitFeatureNamesAndValues}/>);
        expect(element).toBeDefined();

        element.setState({numberOfDropdownFeatures: 1});
        element.setState({numberOfDropdownPatterns: 1});

        expect(element.find(TextField).length).toBe(1);
        expect(element.find(CfFeedbackResulttTable).length).toBe(1);
        expect(element.find(RetrainResultTable).length).toBe(1);
        expect(element.find(TextField).at(0).props().min).toBe(0);
        expect(element.find(SelectField).length).toBe(3);
        expect(element.find(CircularProgress).length).toBe(3);
     });
});
