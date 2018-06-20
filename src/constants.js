/**
 * Created by Tõnis Kasekamp on 06.05.2017.
 */

const DEV_SERVER = 'http://192.168.28.82:8000';
const PROD_SERVER = 'http://193.40.11.46';
const DEV_WEBSOCKET = {
  port: 8000,
  host: '192.168.28.82'
};
const PROD_WEBSOCKET = {
  host: '193.40.11.46'
};
export let SERVER_URL = DEV_SERVER;
export let WEBSOCKET_URL = `ws://${DEV_WEBSOCKET.host}:${DEV_WEBSOCKET.port}/ws/default?subscribe-broadcast`;

export const chooseServer = () => {
  if (process.env.NODE_ENV === 'production') {
    SERVER_URL = PROD_SERVER;
    WEBSOCKET_URL = `ws://${PROD_WEBSOCKET.host}/ws/default?subscribe-broadcast`;
  }
  // SERVER_URL = PROD_SERVER;
};
