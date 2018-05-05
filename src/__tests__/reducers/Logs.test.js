/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import logs from '../../reducers/Logs';
import {logListFailed, logListRequested, logListsRetrieved} from '../../actions/LogActions';
import {logList} from '../../../stories/Split';

const initState = {fetchState: {inFlight: false}, logs: {allIds: [], byId: {}}};
describe('LogsReducer', () => {
  it('has nothing initially', () => {
    expect(logs(undefined, {})).toEqual(initState);
  });

  describe('logList', () => {
    const stateWithRequest = logs(undefined, logListRequested());

    it('changes fetchState when requesting', () => {
      expect(stateWithRequest).toEqual({fetchState: {inFlight: true}, logs: {allIds: [], byId: {}}});
    });

    it('changes fetchState when request completed', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logList));
      expect(state2.fetchState).toEqual({inFlight: false});
    });

    it('changes fetchState when request failed', () => {
      const state2 = logs(stateWithRequest, logListFailed('error'));
      expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
    });

    it('puts logs into store', () => {
      const state2 = logs(stateWithRequest, logListsRetrieved(logList));
      const {allIds, byId} = state2.logs;

      expect(allIds).toEqual([1, 4, 123]);
      expect(Object.keys(allIds).length).toEqual(3);
      expect(byId[1].name).toBe(logList[0].name);
    });
  });
});
