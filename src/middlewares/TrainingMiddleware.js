/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import {TRAINING_SUCCEEDED} from '../actions/JobActions';
import {push} from 'react-router-redux';

const trainingMiddleware = (store) => (next) => (action) => {
  if (action.type === TRAINING_SUCCEEDED) {
    store.dispatch(push('/jobs'));
  }
  return next(action);
};

export default trainingMiddleware;
