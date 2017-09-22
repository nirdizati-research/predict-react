import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import jobs from './Jobs';
import logs from './Logs';

export default combineReducers({
  routing: routerReducer,
  jobs,
  logs
});
