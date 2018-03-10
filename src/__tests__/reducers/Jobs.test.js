/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import jobs from '../../reducers/Jobs';
import {
  FILTER_PREDICTION_METHOD_CHANGED, FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED, jobResultsRequested, jobsFailed, jobsRequested,
  jobsRetrieved
} from '../../actions/JobActions';
import {CLASSIFICATION, REGRESSION} from '../../reference';

const jobList = [
  {
    id: 1,
    status: 'created',
    type: CLASSIFICATION,
    config: {
      prefix_length: 2,
    },
    split: {
      id: 1
    }
  },
  {
    id: 2,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 2,
    },
    split: {
      id: 1
    }
  },
  {
    id: 3,
    status: 'completed',
    type: REGRESSION,
    config: {
      prefix_length: 1,
    },
    split: {
      id: 2
    }
  },
  {
    id: 4,
    status: 'created',
    type: CLASSIFICATION,
    config: {
      prefix_length: 5,
    },
    split: {
      id: 4
    }
  },
  {
    id: 5,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 4,
    },
    split: {
      id: 1
    }
  },
  {
    id: 6,
    status: 'completed',
    type: REGRESSION,
    config: {
      prefix_length: 2,
    },
    split: {
      id: 1
    }
  },
];

const initState = {fetchState: {inFlight: false}, jobs: []};
describe('JobsReducer', () => {
  it('has nothing initially', () => {
    expect(jobs(undefined, {})).toMatchObject(initState);
  });

  it('changes fetchState when requesting', () => {
    const state = jobs(undefined, jobsRequested());
    expect(state).toMatchObject({fetchState: {inFlight: true}});
  });

  it('adds jobs when request completed', () => {
    const jobList = [{id: 1, log: 'name'}];
    const state = jobs(undefined, jobsRequested());
    const state2 = jobs(state, jobsRetrieved(jobList));
    expect(state2).toMatchObject({fetchState: {inFlight: false}, jobs: jobList});
  });

  it('updates job list by uuid', () => {
    const jobList = [{id: 1, log: 'name1', status: 'running'},
      {id: 2, log: 'name2', status: 'running'},
      {id: 3, log: 'name2', status: 'running'}];
    const incoming = [{id: 2, log: 'name2', status: 'completed'}];
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
    expect(state2).toMatchObject({fetchState: {inFlight: false, error: 'error'}, jobs: []});
  });
});

describe('Validation filter', () => {
  let state;
  let state2;

  beforeEach(() => {
    state = jobs(undefined, jobsRetrieved(jobList));
    state2 = jobs(state, {type: FILTER_SPLIT_CHANGED, splitId: 1});
  });

  describe('initial state', () => {
    it('has no filtered jobs initially', () => {
      expect(state).toMatchObject({filteredJobs: []});
    });

    it('has unique list of split ids', () => {
      expect(state).toMatchObject({uniqueSplits: [{id: 1}, {id: 2}]});
    });

    it('has CLASSIFICATION method', () => {
      expect(state).toMatchObject({predictionMethod: REGRESSION});
    });

    it('has no prefix lengths', () => {
      expect(state).toMatchObject({prefixLengths: []});
    });
  });

  describe('when FILTER_SPLIT_CHANGED', () => {
    it('adds to filtered job list', () => {
      expect(state2.filteredJobs.length).toEqual(1);
    });

    it('populates prefix list', () => {
      expect(state2.prefixLengths).toEqual([2]);
    });

    it('sets splitId', () => {
      expect(state2.splitId).toEqual(1);
    });
  });

  describe('when FILTER_PREDICTION_METHOD_CHANGED', () => {
    it('adds to filtered job list', () => {
      let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: REGRESSION});
      expect(state3.filteredJobs.length).toEqual(1);
    });

    it('populates prefix list', () => {
      let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: REGRESSION});
      expect(state3.prefixLengths).toEqual([1]);
      expect(state3.selectedPrefixes).toEqual([1]);
    });
  });

  describe('when FILTER_PREFIX_LENGTH_CHANGED', () => {
    it('removes from jobs', () => {
      let state3 = jobs(state2, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
      state3 = jobs(state3, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      expect(state3.prefixLengths).toEqual([2, 4]);
      expect(state3.selectedPrefixes).toEqual([2]);
      expect(state3.filteredJobs.length).toEqual(1);
      expect(state3.filteredJobs[0].id).toEqual(2);
    });

    it('removes and adds back to jobs', () => {
      let state3 = jobs(state2, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
      state3 = jobs(state3, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      const state4 = jobs(state3, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      expect(state4.filteredJobs.length).toEqual(2);
      expect(state4.selectedPrefixes).toEqual([2, 4]);
    });
  });
});
