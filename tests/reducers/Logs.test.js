/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import logs from '../../src/reducers/Logs';
import {
  changeVisibleLog,
  logInfoFailed,
  logInfoRequested,
  logInfoRetrieved,
  logListFailed,
  logListRequested,
  logListsRetrieved
} from '../../src/actions/LogActions';

const initState = {fetchState: {inFlight: false}, logs: []};
describe('LogsReducer', () => {
  const logNames = ['log1', 'log2'];

  it('has nothing initially', () => {
    expect(logs(undefined, {})).toEqual(initState);
  });

  describe('logList', () => {
    const stateWithRequest = logs(undefined, logListRequested());

    it('changes fetchState when requesting', () => {
      expect(stateWithRequest).toEqual({fetchState: {inFlight: true}, logs: []});
    });

    it('changes fetchState when request completed', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logNames));
      expect(state2.fetchState).toEqual({inFlight: false});
    });

    it('changes fetchState when request failed', () => {
      const state2 = logs(stateWithRequest, logListFailed('error'));
      expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
    });

    it('creates dummy when log not in store', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logNames));
      const storeLogs = state2.logs;

      expect(storeLogs.length).toBe(2);
      expect(storeLogs[0].name).toBe(logNames[0]);
      expect(storeLogs[0].visible).toBe(false);
    });

    it('keeps original log if in store', () => {
      const state = {fetchState: {inFlight: false}, logs: [{name: 'log1', visible: true}]};
      const state2 = logs(state, logListsRetrieved(logNames));
      const storeLogs = state2.logs;

      expect(storeLogs.length).toBe(2);
      expect(storeLogs[0].name).toBe(logNames[0]);
      expect(storeLogs[0].visible).toBe(true);
    });
  });

  describe('logInfo', () => {
    const data = {key: 'value'};
    const payload = {logName: 'log1', data, infoType: 'events'};
    const stateWithLog = logs(undefined, logListsRetrieved(logNames));

    it('does nothing when requesting', () => {
      const state = logs(undefined, logInfoRequested());
      expect(state).toEqual(initState);
    });

    it('changes fetchState when request completed', () => {
      const state2 = logs(stateWithLog, logInfoRetrieved(logNames));
      expect(state2.logs[0].fetchState).toEqual({inFlight: false});
    });

    it('changes fetchState when request failed', () => {
      const state2 = logs(stateWithLog, logInfoFailed({logName: 'log1', error: 'error'}));
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
    const stateWithLog = logs(undefined, logListsRetrieved(logNames));
    it('changes for specified log', () => {
      const state = logs(stateWithLog, changeVisibleLog({logName: 'log1'}));
      expect(state.logs[0].visible).toBe(true);
      expect(state.logs[1].visible).toBe(false);
    });
  });
});
