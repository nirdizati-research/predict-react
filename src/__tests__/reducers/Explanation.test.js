import explanation from '../../reducers/Explanation';
import {shapValueListFailed, shapValueListRequested, shapValueListRetrieved,
    iceValueListFailed, iceValueListRequested, iceValueListRetrieved,
    skaterValueListFailed, skaterValueListRequested, skaterValueListRetrieved,
    cmfeedbackValueListFailed, cmfeedbackValueListRequested, cmfeedbackValueListRetrieved,
    retrainValueListFailed, retrainValueListRequested,
    retrainValueListRetrieved} from '../../actions/ExplanationActions';
import {shapResult, iceResultList, skaterResult,
     retrainResult, cmFeedbackResult} from '../../../stories/Explanation';


const initialState = {
    fetchState: {inFlight: false},
    limeValueList: {},
    shapValueList: {},
    iceValueList: {},
    skaterValueList: {},
    cmFeedbackValue: {},
    retrainValue: {},
    isLimeValuesLoaded: true,
    isShapValuesLoaded: true,
    isSkaterValuesLoaded: true,
    isIceValuesLoaded: true,
    isCmFeedbackLoaded: true,
    isRetrainLoaded: true,
};

describe('Explanation reducer', () => {
    it('has nothing initially', () => {
        expect(explanation(undefined, {})).toEqual(initialState);
    });

    describe('SHAP List requested', () => {
        const stateWithRequest = explanation(undefined, shapValueListRequested());

        it('changes fetchState when shap requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isShapValuesLoaded).toEqual(false);
        });

        it('changes fetchState when shap request completed', () => {
            const state2 = explanation(stateWithRequest, shapValueListRetrieved(shapResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isShapValuesLoaded).toEqual(true);
            const {shapValueList} = state2;
            expect(shapValueList).toEqual(shapResult[1]);
        });

        it('changes fetchState when shap request failed', () => {
            const state2 = explanation(stateWithRequest, shapValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isShapValuesLoaded).toEqual(true);
        });
    });

    describe('ICE List requested', () => {
        const stateWithRequest = explanation(undefined, iceValueListRequested());

        it('changes fetchState when ice requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isIceValuesLoaded).toEqual(false);
        });

        it('changes fetchState when ice request completed', () => {
            const state2 = explanation(stateWithRequest, iceValueListRetrieved(iceResultList));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isIceValuesLoaded).toEqual(true);
            const {iceValueList} = state2;
            expect(iceValueList).toEqual(iceResultList[1]);
        });

        it('changes fetchState when ice request failed', () => {
            const state2 = explanation(stateWithRequest, iceValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isIceValuesLoaded).toEqual(true);
        });
    });

    describe('Skater List requested', () => {
        const stateWithRequest = explanation(undefined, skaterValueListRequested());

        it('changes fetchState when skater requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isSkaterValuesLoaded).toEqual(false);
        });

        it('changes fetchState when skater request completed', () => {
            const state2 = explanation(stateWithRequest, skaterValueListRetrieved(skaterResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isSkaterValuesLoaded).toEqual(true);
            const {skaterValueList} = state2;
            expect(skaterValueList).toEqual(skaterResult[1]);
        });

        it('changes fetchState when skater request failed', () => {
            const state2 = explanation(stateWithRequest, skaterValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isSkaterValuesLoaded).toEqual(true);
        });
    });

    describe('CmFeedback Value requested', () => {
        const stateWithRequest = explanation(undefined, cmfeedbackValueListRequested());

        it('changes fetchState when CmFeedback requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isCmFeedbackLoaded).toEqual(false);
        });

        it('changes fetchState when CmFeedback request completed', () => {
            const state2 = explanation(stateWithRequest, cmfeedbackValueListRetrieved(cmFeedbackResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isCmFeedbackLoaded).toEqual(true);
            const {cmFeedbackValue} = state2;
            expect(cmFeedbackValue).toEqual(cmFeedbackResult[1]);
        });

        it('changes fetchState when CmFeedback request failed', () => {
            const state2 = explanation(stateWithRequest, cmfeedbackValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isCmFeedbackLoaded).toEqual(true);
        });
    });

    describe('Retrain Value requested', () => {
        const stateWithRequest = explanation(undefined, retrainValueListRequested());

        it('changes fetchState when CmFeedback requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isRetrainLoaded).toEqual(false);
        });

        it('changes fetchState when CmFeedback request completed', () => {
            const state2 = explanation(stateWithRequest, retrainValueListRetrieved(retrainResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isRetrainLoaded).toEqual(true);
            const {retrainValue} = state2;
            expect(retrainValue).toEqual(retrainResult[1]);
        });

        it('changes fetchState when CmFeedback request failed', () => {
            const state2 = explanation(stateWithRequest, retrainValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isRetrainLoaded).toEqual(true);
        });
    });
});
