import {
    TEMPORAL_STABILITY_LIME_PREDICTION_LIST_REQUESTED,
    TEMPORAL_STABILITY_LIME_PREDICTION_LIST_RETRIEVED,
    TEMPORAL_STABILITY_LIME_PREDICTION_LIST_FAILED,
    TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_REQUESTED,
    TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_RETRIEVED,
    TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_FAILED,
    TEMPORAL_STABILITY_PREDICTION_LIST_REQUESTED,
    TEMPORAL_STABILITY_PREDICTION_LIST_RETRIEVED,
    TEMPORAL_STABILITY_PREDICTION_LIST_FAILED
} from '../actions/PredictionAction';

const initialState = {
    fetchState: {inFlight: false},
    limeTempStabilityList: {},
    shapTempStabilityList: {},
    predictionTempStabilityList: {},
    isLimeTempStabilityLoaded: true,
    isShapTempStabilityLoaded: true,
    isPredictionTempStabilityLoaded: true,
    limeError: '',
    shapError: '',

};

const predictions = (state = initialState, action) => {
        switch (action.type) {
            case TEMPORAL_STABILITY_LIME_PREDICTION_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    limeError: '',
                    isLimeTempStabilityLoaded: false,

                };
            }

            case TEMPORAL_STABILITY_LIME_PREDICTION_LIST_RETRIEVED: {
                const limeTempStabilityList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    limeError: '',
                    limeTempStabilityList,
                    isLimeTempStabilityLoaded: true
                };
            }

            case TEMPORAL_STABILITY_LIME_PREDICTION_LIST_FAILED: {
                const limeTempStabilityList = initialState.limeTempStabilityList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    limeTempStabilityList,
                    limeError: action.payload,
                    isLimeTempStabilityLoaded: true
                };
            }
            case TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    shapError: '',
                    isShapTempStabilityLoaded: false,

                };
            }

            case TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_RETRIEVED: {
                const shapTempStabilityList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    shapError: '',
                    shapTempStabilityList,
                    isShapTempStabilityLoaded: true
                };
            }

            case TEMPORAL_STABILITY_SHAP_PREDICTION_LIST_FAILED: {
                const shapTempStabilityList = initialState.limeTempStabilityList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    shapTempStabilityList,
                    shapError: action.payload,
                    isShapTempStabilityLoaded: true
                };
            }

            case TEMPORAL_STABILITY_PREDICTION_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isPredictionTempStabilityLoaded: false,

                };
            }

            case TEMPORAL_STABILITY_PREDICTION_LIST_RETRIEVED: {
                const predictionTempStabilityList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    predictionTempStabilityList,
                    isPredictionTempStabilityLoaded: true
                };
            }

            case TEMPORAL_STABILITY_PREDICTION_LIST_FAILED: {
                const predictionTempStabilityList = initialState.predictionTempStabilityList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    predictionTempStabilityList,
                    isPredictionTempStabilityLoaded: true
                };
            }
            default:
                return state;
        }
    }
;

export default predictions;
