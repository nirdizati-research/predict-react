import {SERVER_URL} from '../constants';
import jsonAjax from '../JSONAjaxRequest';
import {jobsFailed, jobsRetrieved} from './JobActions';
import {logListFailed, logListsRetrieved, logInfoRetrieved, logInfoFailed} from './LogActions';

export const getJobs = () => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/core_services/getConfStatus',
    'GET',
    null,
    (jobs) => dispatch(jobsRetrieved(jobs)),
    ({error} = {}) => dispatch(jobsFailed(error))
  );
};

export const getLogList = () => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/logs/list',
    'GET',
    null,
    (logList) => dispatch(logListsRetrieved(logList)),
    ({error} = {}) => dispatch(logListFailed(error))
  );
};

export const getLogInfo = ({logName, infoType}) => (dispatch) => {
  jsonAjax(
    SERVER_URL + `/logs/${infoType}?log=${logName}`,
    'GET',
    null,
    (data) => dispatch(logInfoRetrieved({logName, infoType, data})),
    ({error} = {}) => dispatch(logInfoFailed({logName, error}))
  );
};
