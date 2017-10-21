/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import jobs from '../../reducers/Jobs';
import {jobResultsRequested, jobsFailed, jobsRequested, jobsRetrieved} from '../../actions/JobActions';

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
    const jobList = [{uuid: 'uuid', log: 'name'}];
    const state = jobs(undefined, jobsRequested());
    const state2 = jobs(state, jobsRetrieved(jobList));
    expect(state2).toEqual({fetchState: {inFlight: false}, jobs: jobList});
  });

  it('updates job list by uuid', () => {
    const jobList = [{uuid: 'uuid1', log: 'name1', status: 'running'},
      {uuid: 'uuid2', log: 'name2', status: 'running'},
      {uuid: 'uuid3', log: 'name2', status: 'running'}];
    const incoming = [{uuid: 'uuid2', log: 'name2', status: 'completed'}];
    const state = jobs(undefined, jobResultsRequested());
    state.jobs = jobList;
    const state2 = jobs(state, jobsRetrieved(incoming));
    expect(state2.jobs.length).toEqual(3);
    expect(state2.jobs).toContainEqual(jobList[0]);
    expect(state2.jobs).toContainEqual(jobList[2]);
    expect(state2.jobs).toContainEqual(incoming[0]);
  });

  it('stores error message', () => {
    const state = jobs(undefined, jobsRequested());
    const state2 = jobs(state, jobsFailed('error'));
    expect(state2).toEqual({fetchState: {inFlight: false, error: 'error'}, jobs: []});
  });
});
