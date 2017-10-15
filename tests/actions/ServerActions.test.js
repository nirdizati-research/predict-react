import {getJobs, getLogInfo, getLogList, postTraining} from '../../src/actions/ServerActions';
import {jobsFailed, jobsRetrieved, trainingFailed, trainingSucceeded} from '../../src/actions/JobActions';
import {
  changeVisibleLog,
  logInfoFailed,
  logInfoRetrieved,
  logListFailed,
  logListsRetrieved
} from '../../src/actions/LogActions';

// https://www.jstwister.com/post/unit-testing-beginners-guide-mock-http-and-files/

const error = {error: 'big error message'};
const standardError = (mockXHR) => {
  mockXHR.status = 500;
  mockXHR.responseText = JSON.stringify(error);
};

const logs = [{log: 'name'}];
const createMockXHR = (responseJSON, status) => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status: status || 200,
    responseText: JSON.stringify(
      responseJSON || {}
    )
  };
  return mockXHR;
};

describe('ServerActions', function () {
  const dispatch = jest.fn();
  const oldXMLHttpRequest = global.XMLHttpRequest;
  let mockXHR = null;

  beforeEach(() => {
    mockXHR = createMockXHR();
    global.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    global.XMLHttpRequest = oldXMLHttpRequest;
    dispatch.mockClear();
  });

  it('handles unknown error', () => {
    mockXHR.status = 500;
    mockXHR.responseText = 'Clearly not JSON';

    getJobs()(dispatch);
    mockXHR.onreadystatechange();

    expect(dispatch.mock.calls[0][0]).toEqual(jobsFailed('Unknown error'));
  });

  describe('getJobs', () => {
    it('dispatches jobsRetrieved on success', () => {
      mockXHR.responseText = JSON.stringify(logs);

      getJobs()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(jobsRetrieved(logs));
    });

    it('dispatches jobsFailed on error', () => {
      standardError(mockXHR);

      getJobs()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(jobsFailed(error.error));
    });
  });

  describe('getLogInfo', () => {
    it('dispatches logInfoRetrieved on success', () => {
      mockXHR.responseText = JSON.stringify(logs);

      getLogInfo({logName: 'name', infoType: 'events'})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logInfoRetrieved({logName: 'name', infoType: 'events', data: logs}));
    });

    it('dispatches logInfoFailed on error', () => {
      standardError(mockXHR);

      getLogInfo({logName: 'name', infoType: 'events'})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logInfoFailed({logName: 'name', error: error.error}));
    });
  });

  describe('postTraining', () => {
    it('dispatches trainingSucceeded on success', () => {
      mockXHR.responseText = JSON.stringify(logs);

      postTraining({})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(trainingSucceeded());
    });

    it('dispatches trainingFailed on error', () => {
      standardError(mockXHR);

      postTraining({})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(trainingFailed(error.error));
    });
  });

  describe('getLogList', () => {
    const callParams = {changeVisible: true, requestInfo: true};
    describe('on success', () => {
      const logNames = ['log1', 'log2'];

      beforeEach(() => {
        mockXHR.responseText = JSON.stringify(logNames);
      });

      it('dispatches logListsRetrieved and changeVisibleLog', () => {
        getLogList(callParams)(dispatch);
        mockXHR.onreadystatechange();
        expect(dispatch.mock.calls[0][0]).toEqual(logListsRetrieved(logNames));
        expect(dispatch.mock.calls[1][0]).toEqual(changeVisibleLog({logName: 'log1', requestInfo: true}));
      });

      it('doesnt dispatch changeVisibleLog if not changeVisible', () => {
        getLogList({changeVisible: false, requestInfo: true})(dispatch);
        mockXHR.onreadystatechange();
        expect(dispatch.mock.calls[1]).toBeUndefined();
      });

      it('doesnt dispatch changeVisibleLog if no logs', () => {
        mockXHR.responseText = JSON.stringify([]);

        getLogList(callParams)(dispatch);
        mockXHR.onreadystatechange();
        expect(dispatch.mock.calls[1]).toBeUndefined();
      });
    });

    it('dispatches trainingFailed on error', () => {
      standardError(mockXHR);

      getLogList(callParams)(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logListFailed(error.error));
    });
  });
});
