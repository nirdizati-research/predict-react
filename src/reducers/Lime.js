import {
    LIME_VALUE_LIST_FAILED,
    LIME_VALUE_LIST_REQUESTED,
    LIME_VALUE_LIST_RETRIEVED,
} from '../actions/LimeActions';

const initialState = {
    fetchState: {inFlight: false},
    changed: 0,
    byId: [],
    interResults: [],
    finalDiff: [],
    limeValueList: {}
};

const lime = (state = initialState, action) => {
        switch (action.type) {
            case LIME_VALUE_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},

                };
            }

            case LIME_VALUE_LIST_RETRIEVED: {
                const limeValueList = action.payload;
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    limeValueList
                };
            }

            case LIME_VALUE_LIST_FAILED: {
                return {
                    ...state,
                    fetchState: {inFlight: false, error: action.payload},
                };
            }
            default:
                return state;
        }
    }
;

export default lime;
