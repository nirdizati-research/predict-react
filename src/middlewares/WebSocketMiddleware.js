import {connect} from '../WebSocket';
import {
  CONNECT_REFUSED,
  CONNECT_REQUESTED,
  CONNECTED,
  DISCONNECT_REQUESTED,
  MESSAGE_RECEIVED
} from '../actions/WebSocket';
import {JOB_UPDATED} from '../actions/JobActions';
import {TRACE_UPDATED, TRACE_COMPLETED} from '../actions/TraceActions';

// Using WebSocket abstraction from basic websocket example
const webSocketMiddleware = (store) => (next) => {
  let connection = null;
  return (action) => {
    if (action.type === CONNECT_REQUESTED) {
      connection = connect({
        onOpen: () => store.dispatch({type: CONNECTED}),
        onClose: ({code, reason}) => store.dispatch({type: CONNECT_REFUSED, payload: {code, reason}}),
        parameters: {},
        onMessage: (message) => store.dispatch({type: MESSAGE_RECEIVED, payload: message})
      });
    } else if (action.type === DISCONNECT_REQUESTED) {
      connection.close();
    } else if (action.type === MESSAGE_RECEIVED) {
      switch (action.payload.type) {
        case 'Job': {
          store.dispatch({type: JOB_UPDATED, payload: action.payload.data});
          break;
        }
        case 'XTrace':
        {
          if (action.payload.data.completed) {
            store.dispatch({type: TRACE_COMPLETED, payload: action.payload.data});
            break;
          } else {
            store.dispatch({type: TRACE_UPDATED, payload: action.payload.data});
            break;
          }
        }
        default:
          return;
      }
    }

    return next(action);
  };
};
export default webSocketMiddleware;
