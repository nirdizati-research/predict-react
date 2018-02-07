import {SERVER_URL} from '../constants';
import jsonAjax from '../JSONAjaxRequest';
import {
  jobsFailed,
  jobsRetrieved,
  trainingFailed,
  trainingSucceeded
} from './JobActions';
import {changeVisibleLog, logInfoFailed, logInfoRetrieved, logListFailed, logListsRetrieved} from './LogActions';
import {splitsFailed, splitsRetrieved} from './SplitActions';

export const getJobs = () => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/core_services/getConfStatus',
    'GET',
    null,
    (jobs) => dispatch(jobsRetrieved(jobs)),
    ({error}) => dispatch(jobsFailed(error))
  );
};

export const getJobResults = (log) => (dispatch) => {
  jsonAjax(
    SERVER_URL + `/core_services/jobs?log=${log}&status=completed`,
    'GET',
    null,
    (jobs) => dispatch(jobsRetrieved(jobs)),
    ({error}) => dispatch(jobsFailed(error))
  );
};

const checkIfChangeVisible = (dispatch, changeVisible, requestInfo, logList) => {
  if (changeVisible && logList[0]) {
    dispatch(changeVisibleLog({logId: logList[0].id, requestInfo}));
  }
};

export const getLogList = ({changeVisible, requestInfo}) => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/logs/',
    'GET',
    null,
    (logList) => {
      dispatch(logListsRetrieved(logList));
      checkIfChangeVisible(dispatch, changeVisible, requestInfo, logList);
    },
    ({error}) => dispatch(logListFailed(error))
  );
};

export const getLogInfo = ({logId, infoType}) => (dispatch) => {
  jsonAjax(
    SERVER_URL + `/logs/${logId}/${infoType}`,
    'GET',
    null,
    (data) => dispatch(logInfoRetrieved({logId, infoType, data})),
    ({error}) => dispatch(logInfoFailed({logId, error}))
  );
};

export const postTraining = (payload) => (dispatch) => {
  jsonAjax(
    SERVER_URL + `/core_services/training`,
    'POST',
    payload,
    () => dispatch(trainingSucceeded()),
    ({error}) => dispatch(trainingFailed(error))
  );
};

export const getSplits = () => (dispatch) => {
  jsonAjax(
    SERVER_URL + '/splits/',
    'GET',
    null,
    (splits) => dispatch(splitsRetrieved(splits)),
    ({error}) => dispatch(splitsFailed(error))
  );
};
