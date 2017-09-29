/**
 * Created by tonis.kasekamp on 9/29/17.
 */

import {TRAINING_SUBMITTED, TRAINING_SUCCEEDED, TRAINING_FAILED} from '../actions/JobActions';

const initialState = {
  fetchState: {inFlight: false}
};

const training = (state = initialState, action) => {
  switch (action.type) {
    case TRAINING_SUBMITTED: {
      return {fetchState: {inFlight: true}};
    }

    case TRAINING_SUCCEEDED: {
      return {
        fetchState: {inFlight: false}
      };
    }

    case TRAINING_FAILED: {
      return {fetchState: {inFlight: false, error: action.payload}};
    }
    default:
      return state;
  }
};

export default training;