import {
  CHANGE_VISIBLE_LOG,
  changeVisibleLog,
  LOG_INFO_FAILED,
  LOG_INFO_REQUESTED,
  LOG_INFO_RETRIEVED,
  LOG_LIST_FAILED,
  LOG_LIST_REQUESTED,
  LOG_LIST_RETRIEVED,
  logInfoFailed,
  logInfoRequested,
  logInfoRetrieved,
  logListFailed,
  logListRequested,
  logListsRetrieved
} from '../../actions/LogActions';

describe('LogActions', () => {
  describe('changeVisibleLog', () => {
    it('has correct payload type', () => {
      expect(changeVisibleLog().type).toBe(CHANGE_VISIBLE_LOG);
    });
  });
  describe('logListRequested', () => {
    it('has correct payload type', () => {
      expect(logListRequested().type).toBe(LOG_LIST_REQUESTED);
    });
  });
  describe('logListsRetrieved', () => {
    it('has correct payload type', () => {
      expect(logListsRetrieved().type).toBe(LOG_LIST_RETRIEVED);
    });
  });
  describe('logListFailed', () => {
    it('has correct payload type', () => {
      expect(logListFailed().type).toBe(LOG_LIST_FAILED);
    });
  });
  describe('logInfoRequested', () => {
    it('has correct payload type', () => {
      expect(logInfoRequested().type).toBe(LOG_INFO_REQUESTED);
    });
  });
  describe('logInfoRetrieved', () => {
    it('has correct payload type', () => {
      expect(logInfoRetrieved().type).toBe(LOG_INFO_RETRIEVED);
    });
  });
  describe('logInfoFailed', () => {
    it('has correct payload type', () => {
      expect(logInfoFailed().type).toBe(LOG_INFO_FAILED);
    });
  });
});
