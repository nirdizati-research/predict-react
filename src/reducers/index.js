import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import jobs from './Jobs';
import logs from './Logs';
import training from './Training';
import splits from './Splits';
import models from './Models';
import traces from './Traces';
import explanation from './Explanation';
import predictions from './Predictions';


export default combineReducers({
    routing: routerReducer,
    jobs,
    logs,
    models,
    training,
    splits,
    traces,
    explanation,
    predictions
});
