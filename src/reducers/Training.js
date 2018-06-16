/**
 * Created by tonis.kasekamp on 9/29/17.
 */

import {JOB_UPDATED, TRAINING_FAILED, TRAINING_SUBMITTED, TRAINING_SUCCEEDED} from '../actions/JobActions';

const initialState = {
  fetchState: {inFlight: false},
  haveRunning: false,
  totalCount: 0,
  runningIds: []
};

const training = (state = initialState, action) => {
  switch (action.type) {
    case TRAINING_SUBMITTED: {
      return {...state, fetchState: {inFlight: true}};
    }

    case TRAINING_SUCCEEDED: {
      const totalCount = action.payload.length;
      const runningIds = action.payload.map(({id}) => id);
      return {...state, haveRunning: true, totalCount, runningIds, fetchState: {inFlight: false}};
    }

    case TRAINING_FAILED: {
      return {...state, haveRunning: false, fetchState: {inFlight: false, error: action.payload}};
    }

    case JOB_UPDATED: {
      const runningIds = state.runningIds.filter(id => id !== action.payload.id);
      return {...state, runningIds};
    }
    default:
      return state;
  }
};

export default training;
