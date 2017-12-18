/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import logs from '../../reducers/Logs';
import {
  changeVisibleLog,
  logInfoFailed,
  logInfoRequested,
  logInfoRetrieved,
  logListFailed,
  logListRequested,
  logListsRetrieved
} from '../../actions/LogActions';
import {logList} from '../../../stories/Split';

const initState = {fetchState: {inFlight: false}, logs: []};
describe('LogsReducer', () => {
  it('has nothing initially', () => {
    expect(logs(undefined, {})).toEqual(initState);
  });

  describe('logList', () => {
    const stateWithRequest = logs(undefined, logListRequested());

    it('changes fetchState when requesting', () => {
      expect(stateWithRequest).toEqual({fetchState: {inFlight: true}, logs: []});
    });

    it('changes fetchState when request completed', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logList));
      expect(state2.fetchState).toEqual({inFlight: false});
    });

    it('changes fetchState when request failed', () => {
      const state2 = logs(stateWithRequest, logListFailed('error'));
      expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
    });

    it('creates dummy when log not in store', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logList));
      const storeLogs = state2.logs;

      expect(storeLogs.length).toBe(3);
      expect(storeLogs[0].name).toBe(logList[0].name);
      expect(storeLogs[0].visible).toBe(false);
    });

    it('keeps original log if in store', () => {
      const state = {fetchState: {inFlight: false}, logs: [{id: 1, name: 'general_example.xes', visible: true}]};
      const state2 = logs(state, logListsRetrieved(logList));
      const storeLogs = state2.logs;

      expect(storeLogs.length).toBe(3);
      expect(storeLogs[0].name).toBe(logList[0].name);
      expect(storeLogs[0].visible).toBe(true);
    });
  });

  describe('logInfo', () => {
    const data = {key: 'value'};
    const payload = {logId: 1, data, infoType: 'events'};
    const stateWithLog = logs(undefined, logListsRetrieved(logList));

    it('does nothing when requesting', () => {
      const state = logs(undefined, logInfoRequested());
      expect(state).toEqual(initState);
    });

    it('changes fetchState when request completed', () => {
      const state2 = logs(stateWithLog, logInfoRetrieved(logList));
      expect(state2.logs[0].fetchState).toEqual({inFlight: false});
    });

    it('changes fetchState when request failed', () => {
      const state2 = logs(stateWithLog, logInfoFailed({logId: 1, error: 'error'}));
      expect(state2.logs[0].fetchState).toEqual({inFlight: false, error: 'error'});
    });

    it('adds events to log', () => {
      const state2 = logs(stateWithLog, logInfoRetrieved(payload));
      expect(state2.logs[0].events).toEqual(data);
    });

    it('adds resources to log', () => {
      payload.infoType = 'resources';
      const state2 = logs(stateWithLog, logInfoRetrieved(payload));
      expect(state2.logs[0].resources).toEqual(data);
    });

    it('adds traces to log', () => {
      payload.infoType = 'traces';
      const state2 = logs(stateWithLog, logInfoRetrieved(payload));
      expect(state2.logs[0].traces).toEqual(data);
    });
  });

  describe('changeVisible', () => {
    const stateWithLog = logs(undefined, logListsRetrieved(logList));
    it('changes for specified log', () => {
      const state = logs(stateWithLog, changeVisibleLog({logId: 1}));
      expect(state.logs[0].visible).toBe(true);
      expect(state.logs[1].visible).toBe(false);
    });
  });
});
