import prediction from '../../reducers/Predictions';
import {temporalLimePredictionListFailed, temporalLimePredictionListRequested, temporalLimePredictionListRetrieved,
    temporalShapPredictionListFailed, temporalShapPredictionListRequested, temporalShapPredictionListRetrieved,
    temporalPredictionListFailed, temporalPredictionListRequested,
    temporalPredictionListRetrieved} from '../../actions/PredictionAction';
import {limeTemporalStabilityResult, shapTemporalStabilityResult,
    temporalStabilityResult} from '../../../stories/Explanation';


const initialState = {
    fetchState: {inFlight: false},
    shapTempStabilityList: {},
    limeTempStabilityList: {},
    predictionTempStabilityList: {},
    isLimeTempStabilityLoaded: true,
    isShapTempStabilityLoaded: true,
    isPredictionTempStabilityLoaded: true
};

describe('Temporal stability reducer', () => {
    it('has nothing initially', () => {
        expect(prediction(undefined, {})).toEqual(initialState);
    });

    describe('Prediction temporal stability list requested', () => {
        const stateWithRequest = prediction(undefined, temporalPredictionListRequested());

        it('changes fetchState when temportal stability prediction requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isPredictionTempStabilityLoaded).toEqual(false);
        });

        it('changes fetchState when temporal stability request completed', () => {
            const state2 = prediction(stateWithRequest, temporalPredictionListRetrieved(temporalStabilityResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isPredictionTempStabilityLoaded).toEqual(true);
            const {predictionTempStabilityList} = state2;
            expect(predictionTempStabilityList).toEqual(temporalStabilityResult);
        });

        it('changes fetchState when temporal stability request failed', () => {
            const state2 = prediction(stateWithRequest, temporalPredictionListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isPredictionTempStabilityLoaded).toEqual(true);
        });
    });

    describe('Lime temporal stability list requested', () => {
        const stateWithRequest = prediction(undefined, temporalLimePredictionListRequested());

        it('changes fetchState when temporal stability prediction requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isLimeTempStabilityLoaded).toEqual(false);
        });

        it('changes fetchState when lime temporal stability request completed', () => {
            const state2 = prediction(stateWithRequest,
                temporalLimePredictionListRetrieved(limeTemporalStabilityResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isLimeTempStabilityLoaded).toEqual(true);
            const {limeTempStabilityList} = state2;
            expect(limeTempStabilityList).toEqual(limeTemporalStabilityResult);
        });

        it('changes fetchState when lime temporal stability request failed', () => {
            const state2 = prediction(stateWithRequest, temporalLimePredictionListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isLimeTempStabilityLoaded).toEqual(true);
        });
    });

    describe('Shap temporal stability list requested', () => {
        const stateWithRequest = prediction(undefined, temporalShapPredictionListRequested());

        it('changes fetchState when temporal stability prediction requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
            expect(stateWithRequest.isShapTempStabilityLoaded).toEqual(false);
        });

        it('changes fetchState when lime temporal stability request completed', () => {
            const state2 = prediction(stateWithRequest,
                temporalShapPredictionListRetrieved(shapTemporalStabilityResult));
            expect(state2.fetchState).toEqual({inFlight: false});
            expect(state2.isShapTempStabilityLoaded).toEqual(true);
            const {shapTempStabilityList} = state2;
            expect(shapTempStabilityList).toEqual(shapTemporalStabilityResult);
        });

        it('changes fetchState when lime temporal stability request failed', () => {
            const state2 = prediction(stateWithRequest, temporalShapPredictionListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
            expect(state2.isShapTempStabilityLoaded).toEqual(true);
        });
    });
});
