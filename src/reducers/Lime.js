import {
    LIME_VALUE_LIST_FAILED,
    LIME_VALUE_LIST_REQUESTED,
    LIME_VALUE_LIST_RETRIEVED,
} from '../actions/LimeActions';

const initialState = {
    fetchState: {inFlight: false},
    limeValueList: {},
    isLimeValuesLoaded: true
};

const lime = (state = initialState, action) => {
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
            default:
                return state;
        }
    }
;

export default lime;
