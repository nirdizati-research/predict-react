import prediction from '../../reducers/Predictions';
import {temporalLimePredictionListFailed, temporalLimePredictionListRequested, temporalLimePredictionListRetrieved,
    temporalPredictionListFailed, temporalPredictionListRequested, temporalPredictionListRetrieved} from '../../actions/PredictionAction';
import {limeTemporalStabilityResult, temporalStabilityResult} from '../../../stories/Explanation';


const initialState = {
    fetchState: {inFlight: false},
    limeTempStabilityList: {},
    predictionTempStabilityList: {},
    isLimeTempStabilityLoaded: true,
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

        it('changes fetchState when temportal stability prediction requesting', () => {
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
});
