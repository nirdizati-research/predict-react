import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import jobs from './Jobs';
import logs from './Logs';
import training from './Training';
import splits from './Splits';

export default combineReducers({
  routing: routerReducer,
  jobs,
  logs,
  training,
  splits
});
