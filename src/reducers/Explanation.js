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
    ICE_VALUE_LIST_RETRIEVED
} from '../actions/ExplanationActions';

const initialState = {
    fetchState: {inFlight: false},
    limeValueList: {},
    shapValueList: {},
    iceValueList: {},
    skaterValueList: {},
    isLimeValuesLoaded: true,
    isShapValuesLoaded: true,
    isSkaterValuesLoaded: true,
    isIceValuesLoaded: true,
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
                const skaterValueList = initialState.limeValueList;
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
                const iceValueList = initialState.limeValueList;
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                    iceValueList,
                    isIceValuesLoaded: true
                };
            }

            default:
                return state;
        }
    }
;

export default explanation;
