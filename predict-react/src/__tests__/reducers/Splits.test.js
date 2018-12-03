/**
 * Created by tonis.kasekamp on 02/07/18.
 */

import splits from '../../reducers/Splits';
import {
  splitFailed,
  splitsFailed,
  splitsRequested,
  splitsRetrieved,
  splitSucceeded,
  submitSplit
} from '../../actions/SplitActions';

const initState = {fetchState: {inFlight: false}, allIds: [], byId: {}};
describe('SplitList', () => {
  it('has nothing initially', () => {
    expect(splits(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = splits(undefined, splitsRequested());
    expect(state).toEqual({fetchState: {inFlight: true}, allIds: [], byId: {}});
  });

  it('adds splits when request completed', () => {
    const splitList = [{id: 1, type: 'single'}];
    const state = splits(undefined, splitsRequested());
    const state2 = splits(state, splitsRetrieved(splitList));
    expect(state2.fetchState).toEqual({inFlight: false});

    const {allIds, byId} = state2;

    expect(allIds).toEqual([1]);
    expect(Object.keys(byId).length).toEqual(1);
    expect(byId[1].type).toBe('single');
  });

  it('stores error message', () => {
    const state = splits(undefined, splitsRequested());
    const state2 = splits(state, splitsFailed('error'));
    expect(state2).toEqual({fetchState: {inFlight: false, error: 'error'}, allIds: [], byId: {}});
  });
});

describe('Split submitting', () => {
  it('changes fetchState when submitted', () => {
    const state = splits(undefined, submitSplit());
    expect(state).toEqual({allIds: [], byId: {}, fetchState: {inFlight: true}});
  });

  it('adds to state when submit success', () => {
    const splitList = [{id: 1, type: 'single'}];
    const state = splits(splits(undefined, splitsRetrieved(splitList)), submitSplit());
    const state2 = splits(state, splitSucceeded({id: 2, type: 'double'}));
    expect(state2.fetchState).toEqual({inFlight: false});

    const {allIds, byId} = state2;

    expect(allIds).toEqual([1, 2]);
    expect(Object.keys(byId).length).toEqual(2);
    expect(byId[2].type).toBe('double');
  });

  it('stores error message', () => {
    const state = splits(undefined, submitSplit());
    const state2 = splits(state, splitFailed('error'));
    expect(state2).toEqual({allIds: [], byId: {}, fetchState: {inFlight: false, error: 'error'}});
  });
});
