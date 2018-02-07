/**
 * Created by tonis.kasekamp on 02/07/18.
 */

import splits from '../../reducers/Splits';
import {
  splitFailed, splitsFailed, splitsRequested, splitsRetrieved, splitSucceeded,
  submitSplit
} from '../../actions/SplitActions';

const initState = {fetchState: {inFlight: false}, splits: []};
describe('SplitList', () => {
  it('has nothing initially', () => {
    expect(splits(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = splits(undefined, splitsRequested());
    expect(state).toEqual({fetchState: {inFlight: true}, splits: []});
  });

  it('adds splits when request completed', () => {
    const splitList = [{id: 1, type: 'single'}];
    const state = splits(undefined, splitsRequested());
    const state2 = splits(state, splitsRetrieved(splitList));
    expect(state2).toEqual({fetchState: {inFlight: false}, splits: splitList});
  });

  it('updates splits list by id', () => {
    const splitList = [{id: 1, type: 'single', config: {}},
      {id: 2, type: 'double', config: {}},
      {id: 3, type: 'single', config: {}}];
    const incoming = [{id: 2, type: 'double', config: {}}];
    const state = splits(undefined, splitsRequested());
    state.splits = splitList;
    const state2 = splits(state, splitsRetrieved(incoming));
    expect(state2.splits.length).toEqual(3);
    expect(state2.splits).toContainEqual(splitList[0]);
    expect(state2.splits).toContainEqual(splitList[2]);
    expect(state2.splits).toContainEqual(incoming[0]);
  });

  it('stores error message', () => {
    const state = splits(undefined, splitsRequested());
    const state2 = splits(state, splitsFailed('error'));
    expect(state2).toEqual({fetchState: {inFlight: false, error: 'error'}, splits: []});
  });
});

describe('Split submitting', () => {
  it('changes fetchState when submitted', () => {
    const state = splits(undefined, submitSplit());
    expect(state).toEqual({splits: [], fetchState: {inFlight: true}});
  });

  it('changes state when completed', () => {
    const state = splits(undefined, submitSplit());
    const state2 = splits(state, splitSucceeded({id: 1}));
    expect(state2).toEqual({splits: [{id: 1}], fetchState: {inFlight: false}});
  });

  it('stores error message', () => {
    const state = splits(undefined, submitSplit());
    const state2 = splits(state, splitFailed('error'));
    expect(state2).toEqual({splits: [], fetchState: {inFlight: false, error: 'error'}});
  });
});
