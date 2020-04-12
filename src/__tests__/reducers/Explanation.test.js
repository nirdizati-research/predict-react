import explanation from '../../reducers/Explanation';
import {limeValueListRequested, limeValueListRetrieved, limeValueListFailed,
    shapValueListFailed, shapValueListRequested, shapValueListRetrieved,
    iceValueListFailed, iceValueListRequested, iceValueListRetrieved,
    skaterValueListFailed, skaterValueListRequested, skaterValueListRetrieved,
    cffeedbackValueListFailed, cffeedbackValueListRequested, cffeedbackValueListRetrieved,
    retrainValueListFailed, retrainValueListRequested, retrainValueListRetrieved} from '../../actions/ExplanationActions';
import {limeList, shapResult, iceResultList, skaterResult,
     retrainResult, cfFeedbackResult} from '../../../stories/Explanation';


const initialState = {
    fetchState: {inFlight: false},
    limeValueList: {},
    shapValueList: {},
    iceValueList: {},
    skaterValueList: {},
    cfFeedbackValue: {},
    retrainValue: {},
    isLimeValuesLoaded: true,
    isShapValuesLoaded: true,
    isSkaterValuesLoaded: true,
    isIceValuesLoaded: true,
    isCfFeedbackLoaded: true,
    isRetrainLoaded: true,
};

describe('Explanation reducer', () => {
    it('has nothing initially', () => {
        expect(explanation(undefined, {})).toEqual(initialState);
    });

    describe('LIME List requested', () => {
        const stateWithRequest = explanation(undefined, limeValueListRequested());

        it('changes fetchState when lime requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isLimeValuesLoaded).toEqual(false);
        });

        it('changes fetchState when lime request completed', () => {
            const state2 = explanation(stateWithRequest, limeValueListRetrieved(limeList));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isLimeValuesLoaded).toEqual(true);
            const {limeValueList} = state2;
            expect(limeValueList).toEqual(limeList);
        });

        it('changes fetchState when lime request failed', () => {
            const state2 = explanation(stateWithRequest, limeValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isLimeValuesLoaded).toEqual(true);
        });
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

    describe('CfFeedback Value requested', () => {
        const stateWithRequest = explanation(undefined, cffeedbackValueListRequested());

        it('changes fetchState when CfFeedback requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isCfFeedbackLoaded).toEqual(false);
        });

        it('changes fetchState when CfFeedback request completed', () => {
            const state2 = explanation(stateWithRequest, cffeedbackValueListRetrieved(cfFeedbackResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isCfFeedbackLoaded).toEqual(true);
            const {cfFeedbackValue} = state2;
            expect(cfFeedbackValue).toEqual(cfFeedbackResult[1]);
        });

        it('changes fetchState when CfFeedback request failed', () => {
            const state2 = explanation(stateWithRequest, cffeedbackValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isCfFeedbackLoaded).toEqual(true);
        });
    });

    describe('Retrain Value requested', () => {
        const stateWithRequest = explanation(undefined, retrainValueListRequested());

        it('changes fetchState when CfFeedback requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isRetrainLoaded).toEqual(false);
        });

        it('changes fetchState when CfFeedback request completed', () => {
            const state2 = explanation(stateWithRequest, retrainValueListRetrieved(retrainResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isRetrainLoaded).toEqual(true);
            const {retrainValue} = state2;
            expect(retrainValue).toEqual(retrainResult[1]);
        });

        it('changes fetchState when CfFeedback request failed', () => {
            const state2 = explanation(stateWithRequest, retrainValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isRetrainLoaded).toEqual(true);
        });
    });
});
