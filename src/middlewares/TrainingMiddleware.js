/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import {JOB_UPDATED, jobsRetrieved, TRAINING_SUCCEEDED} from '../actions/JobActions';

const trainingMiddleware = (store) => (next) => (action) => {
  if (action.type === TRAINING_SUCCEEDED) {
    store.dispatch(jobsRetrieved(action.payload));
  } else if (action.type === JOB_UPDATED) {
    store.dispatch(jobsRetrieved([action.payload]));
  }
  return next(action);
};

export default trainingMiddleware;
