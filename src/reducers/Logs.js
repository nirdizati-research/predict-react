/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {LOG_LIST_FAILED, LOG_LIST_REQUESTED, LOG_LIST_RETRIEVED} from '../actions/LogActions';
import {logListRetrieved} from './genericHelpers';

const initialState = {
    fetchState: {inFlight: false},
    byId: {},
    allIds: []
};

const logs = (state = initialState, action) => {
        switch (action.type) {
            case LOG_LIST_REQUESTED: {
                return {
                    ...state,
                    fetchState: {inFlight: true},
                };
            }

            case LOG_LIST_RETRIEVED: {
                return {
                    ...state,
                    fetchState: {inFlight: false},
                    ...logListRetrieved(action.payload)
                };
            }

            case LOG_LIST_FAILED: {
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

export default logs;
