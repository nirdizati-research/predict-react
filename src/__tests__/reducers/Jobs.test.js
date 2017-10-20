/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import jobs from '../../reducers/Jobs';
import {jobsFailed, jobsRequested, jobsRetrieved} from '../../actions/JobActions';

const initState = {fetchState: {inFlight: false}, jobs: []};
describe('JobsReducer', () => {
  it('has nothing initially', () => {
    expect(jobs(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = jobs(undefined, jobsRequested());
    expect(state).toEqual({fetchState: {inFlight: true}, jobs: []});
  });

  it('adds jobs when request completed', () => {
    const jobList = [{log: 'name'}];
    const state = jobs(undefined, jobsRequested());
    const state2 = jobs(state, jobsRetrieved(jobList));
    expect(state2).toEqual({fetchState: {inFlight: false}, jobs: jobList});
  });

  it('stores error message', () => {
    const state = jobs(undefined, jobsRequested());
    const state2 = jobs(state, jobsFailed('error'));
    expect(state2).toEqual({fetchState: {inFlight: false, error: 'error'}, jobs: []});
  });
});
