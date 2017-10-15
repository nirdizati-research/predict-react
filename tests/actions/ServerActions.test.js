import {getJobs} from '../../src/actions/ServerActions';
import {jobsFailed, jobsRetrieved} from '../../src/actions/JobActions';

// https://www.jstwister.com/post/unit-testing-beginners-guide-mock-http-and-files/

const error = {error: 'big error message'};

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
      const logs = [{log: 'name'}];
      mockXHR.responseText = JSON.stringify(logs);

      getJobs()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(jobsRetrieved(logs));
    });

    it('dispatches jobsFailed on error', () => {
      mockXHR.status = 500;
      mockXHR.responseText = JSON.stringify(error);

      getJobs()(dispatch);
      mockXHR.onreadystatechange();

      expect(dispatch.mock.calls[0][0]).toEqual(jobsFailed(error.error));
    });
  });
});