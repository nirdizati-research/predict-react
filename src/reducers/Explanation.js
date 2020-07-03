import {
    LIME_VALUE_LIST_FAILED,
    LIME_VALUE_LIST_REQUESTED,
    LIME_VALUE_LIST_RETRIEVED,

    SHAP_VALUE_LIST_FAILED,
    SHAP_VALUE_LIST_REQUESTED,
    SHAP_VALUE_LIST_RETRIEVED,

    SKATER_VALUE_LIST_FAILED,
    SKATER_VALUE_LIST_REQUESTED,
    SKATER_VALUE_LIST_RETRIEVED,

    ICE_VALUE_LIST_FAILED,
    ICE_VALUE_LIST_REQUESTED,
    ICE_VALUE_LIST_RETRIEVED,

    CMFEEFBACK_VALUE_LIST_FAILED,
    CMFEEDBACK_VALUE_LIST_REQUESTED,
    CMFEEFBACK_VALUE_LIST_RETRIEVED,

    RETRAIN_VALUE_LIST_FAILED,
    RETRAIN_VALUE_LIST_REQUESTED,
    RETRAIN_VALUE_LIST_RETRIEVED
} from '../actions/ExplanationActions';

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

const explanation = (state = initialState, action) => {
        switch (action.type) {
            case LIME_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isLimeValuesLoaded: false,

                };
            }

            case LIME_VALUE_LIST_RETRIEVED: {
                const limeValueList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    limeValueList,
                    isLimeValuesLoaded: true
                };
            }

            case LIME_VALUE_LIST_FAILED: {
                const limeValueList = initialState.limeValueList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    limeValueList,
                    isLimeValuesLoaded: true
                };
            }

            case SHAP_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isShapValuesLoaded: false,

                };
            }

            case SHAP_VALUE_LIST_RETRIEVED: {
                const shapValueList = action.payload[1];
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    shapValueList,
                    isShapValuesLoaded: true
                };
            }

            case SHAP_VALUE_LIST_FAILED: {
                const shapValueList = initialState.shapValueList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    shapValueList,
                    isShapValuesLoaded: true
                };
            }

            case SKATER_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isSkaterValuesLoaded: false,

                };
            }

            case SKATER_VALUE_LIST_RETRIEVED: {
                const skaterValueList = action.payload[1];
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    skaterValueList,
                    isSkaterValuesLoaded: true
                };
            }

            case SKATER_VALUE_LIST_FAILED: {
                const skaterValueList = initialState.skaterValueList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    skaterValueList,
                    isSkaterValuesLoaded: true
                };
            }

            case ICE_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isIceValuesLoaded: false,

                };
            }

            case ICE_VALUE_LIST_RETRIEVED: {
                const iceValueList = action.payload[1];
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    iceValueList,
                    isIceValuesLoaded: true
                };
            }

            case ICE_VALUE_LIST_FAILED: {
                const iceValueList = initialState.iceValueList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    iceValueList,
                    isIceValuesLoaded: true
                };
            }

            case CMFEEDBACK_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isCmFeedbackLoaded: false,

                };
            }

            case CMFEEFBACK_VALUE_LIST_RETRIEVED: {
                const cmFeedbackValue = action.payload[1];
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    cmFeedbackValue,
                    isCmFeedbackLoaded: true
                };
            }

            case CMFEEFBACK_VALUE_LIST_FAILED: {
                const cmFeedbackValue = initialState.cmFeedbackValue;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    cmFeedbackValue: cmFeedbackValue,
                    isCmFeedbackLoaded: true
                };
            }

            case RETRAIN_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                    isRetrainLoaded: false,

                };
            }

            case RETRAIN_VALUE_LIST_RETRIEVED: {
                const retrainValue = action.payload[1];
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    retrainValue,
                    isRetrainLoaded: true
                };
            }

            case RETRAIN_VALUE_LIST_FAILED: {
                const retrainValue = initialState.retrainValue;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    retrainValue,
                    isRetrainLoaded: true
                };
            }

            default:
                return state;
        }
    }
;

export default explanation;
