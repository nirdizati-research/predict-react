import {
    PREDICTION_LIST_REQUESTED,
    PREDICTION_LIST_RETRIEVED,
    PREDICTION_LIST_FAILED,
} from '../actions/PredictionAction';

const initialState = {
    fetchState: {inFlight: false},
    predictionList: {},
    isPredictionsLoaded: true
};

const predictions = (state = initialState, action) => {
        switch (action.type) {
            case PREDICTION_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isPredictionsLoaded: false,

                };
            }

            case PREDICTION_LIST_RETRIEVED: {
                const predictionList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    predictionList,
                    isPredictionsLoaded: true
                };
            }

            case PREDICTION_LIST_FAILED: {
                const predictionList = initialState.predictionList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    predictionList,
                    isPredictionsLoaded: true
                };
            }
            default:
                return state;
        }
    }
;

export default predictions;
