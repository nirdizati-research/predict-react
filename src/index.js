import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, Router} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import serverMiddleware from './middlewares/ServerMiddleware';
import WebFontLoader from 'webfontloader';
import trainingMiddleware from './middlewares/TrainingMiddleware';
import {CONNECT_REQUESTED} from './actions/WebSocket';
import webSocketMiddleware from './middlewares/WebSocketMiddleware';
import './scss/style.scss';

WebFontLoader.load({
    google: {
        families: ['Roboto:400', 'Material Icons'],
    },
});

const composeStoreEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routerMiddle = routerMiddleware(hashHistory);
let store = createStore(
    reducers,
    composeStoreEnhancers(
        applyMiddleware(
            routerMiddle,
            thunk,
            serverMiddleware,
            webSocketMiddleware,
            trainingMiddleware
        )
    )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

// WS connection
store.dispatch({type: CONNECT_REQUESTED});

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={history}/>
    </Provider>,
    document.getElementById('root')
);
