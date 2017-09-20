import {SERVER_URL} from '../constants';
import jsonAjax from '../JSONAjaxRequest';

export const getJobs = () => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/core_services/getConfStatus',
    'GET',
    null,
    (jobs) => dispatch(jobsRetrieved(jobs)),
    ({error} = {}) => dispatch(jobsFailed(error))
  );
};