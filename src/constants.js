/**
 * Created by Tõnis Kasekamp on 06.05.2017.
 */

const DEV_SERVER = 'http://localhost:8080';
const PROD_SERVER = 'http://193.40.11.46';
export let SERVER_URL = DEV_SERVER;

export const chooseServer = () => {
/*  if (process.env.NODE_ENV === 'production') {
    SERVER_URL = PROD_SERVER;
  }*/
  SERVER_URL = PROD_SERVER;
};

// POST endpoints
export const REG_TRAINING = 'configer';
export const REMAINING_TIME_TRAINING = 'classConfiger';
