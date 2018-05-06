import {
  deleteJob,
  getJobs,
  getLogInfo,
  getLogList,
  getSplits,
  postSplit,
  postTraining
} from '../../actions/ServerActions';
import {JOB_DELETED, jobsFailed, jobsRetrieved, trainingFailed, trainingSucceeded} from '../../actions/JobActions';
import {logInfoFailed, logInfoRetrieved, logListFailed, logListsRetrieved} from '../../actions/LogActions';
import {splitFailed, splitsFailed, splitsRetrieved, splitSucceeded} from '../../actions/SplitActions';

// https://www.jstwister.com/post/unit-testing-beginners-guide-mock-http-and-files/

const error = {error: 'big error message'};
const standardError = (mockXHR) => {
  mockXHR.status = 500;
  mockXHR.responseText = JSON.stringify(error);
};

const logs = [{log: 'name'}];
const splits = [{type: 'single', config: 'like me'}];
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
const splitBody = {
  config: {},
  original_log: 4
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

      getLogInfo({logId: 1, infoType: 'events'})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logInfoRetrieved({logId: 1, infoType: 'events', data: logs}));
    });

    it('dispatches logInfoFailed on error', () => {
      standardError(mockXHR);

      getLogInfo({logId: 1, infoType: 'events'})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logInfoFailed({logId: 1, error: error.error}));
    });
  });

  describe('delete job', () => {
    it('dispatches jobDeleted on success', () => {
      mockXHR.responseText = JSON.stringify(logs);

      deleteJob({id: 1})(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual({type: JOB_DELETED, id: 1});
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
    describe('on success', () => {
      const logList = [
        {
          'id': 1,
          'name': 'general_example.xes'
        },
        {
          'id': 4,
          'name': 'nonlocal.mxml.gz'
        }
      ];

      beforeEach(() => {
        mockXHR.responseText = JSON.stringify(logList);
      });

      it('dispatches logListsRetrieved', () => {
        getLogList()(dispatch);
        mockXHR.onreadystatechange();
        expect(dispatch.mock.calls[0][0]).toEqual(logListsRetrieved(logList));
      });
    });

    it('dispatches trainingFailed on error', () => {
      standardError(mockXHR);

      getLogList()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(logListFailed(error.error));
    });
  });

  describe('getSplits', () => {
    it('dispatches splitsRetrieved on success', () => {
      mockXHR.responseText = JSON.stringify(splits);

      getSplits()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(splitsRetrieved(splits));
    });

    it('dispatches splitsFailed on error', () => {
      standardError(mockXHR);

      getSplits()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(splitsFailed(error.error));
    });
  });

  describe('postSplit', () => {
    it('dispatches splitSucceeded on success', () => {
      mockXHR.responseText = JSON.stringify({any: 'response'});

      postSplit(splitBody)(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(splitSucceeded({any: 'response'}));
    });

    it('dispatches splitFailed on error', () => {
      standardError(mockXHR);

      postSplit(splitBody)(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(splitFailed(error.error));
    });
  });
});
