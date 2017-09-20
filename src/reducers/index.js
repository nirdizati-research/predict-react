import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import jobs from './Jobs';

export default combineReducers({
  routing: routerReducer,
  jobs
});
