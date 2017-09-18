/**
 * Created by Tõnis Kasekamp on 06.05.2017.
 */

const DEV_SERVER = 'http://localhost:8080';
const HEROKU_SERVER = '';
export let SERVER_URL = DEV_SERVER;

export const chooseServer = () => {
  if (process.env.NODE_ENV === 'production') {
    SERVER_URL = HEROKU_SERVER;
  }
};

