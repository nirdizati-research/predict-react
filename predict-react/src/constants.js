/* eslint-disable max-len */
/**
 * Created by Tõnis Kasekamp on 06.05.2017.
 */

export let SERVER_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
export let WEBSOCKET_URL = `ws://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/ws/default?subscribe-broadcast`;

// const DEV_SERVER = 'http://localhost:8000';
// const PROD_SERVER = 'http://193.40.11.46';
// const DEV_WEBSOCKET = {
//   port: 8000,
//   host: 'localhost'
// };
// const PROD_WEBSOCKET = {
//   host: '193.40.11.46'
// };
//
// export const chooseServer = () => {
//     SERVER_URL = PROD_SERVER;
//     WEBSOCKET_URL = `ws://${PROD_WEBSOCKET.host}/ws/default?subscribe-broadcast`;
// };
