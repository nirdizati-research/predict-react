/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import jobs from '../../reducers/Jobs';
import {
  FILTER_LABEL_CHANGED,
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  JOB_DELETED,
  jobsFailed,
  jobsRequested,
  jobsRetrieved
} from '../../actions/JobActions';
import {
  ATTRIBUTE_NUMBER,
  CLASSIFICATION,
  DURATION,
  NO_CLUSTER,
  NO_PADDING,
  RANDOM_FOREST,
  REGRESSION,
  REMAINING_TIME,
  SIMPLE_INDEX,
  THRESHOLD_CUSTOM,
  THRESHOLD_MEAN,
  ZERO_PADDING
} from '../../reference';

const jobList = [
  {
    id: 1,
    status: 'created',
    type: CLASSIFICATION,
    config: {
      prefix_length: 2,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: DURATION, threshold_type: THRESHOLD_MEAN, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
  {
    id: 2,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 2,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: DURATION, threshold_type: THRESHOLD_MEAN, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
  {
    id: 3,
    status: 'completed',
    type: REGRESSION,
    config: {
      prefix_length: 1,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: REMAINING_TIME, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 2
  },
  {
    id: 4,
    status: 'created',
    type: CLASSIFICATION,
    config: {
      prefix_length: 5,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: DURATION, threshold_type: THRESHOLD_MEAN, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 4
  },
  {
    id: 5,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 4,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: DURATION, threshold_type: THRESHOLD_MEAN, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
  {
    id: 6,
    status: 'completed',
    type: REGRESSION,
    config: {
      prefix_length: 2,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: REMAINING_TIME, threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
  {
    id: 75,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 4,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: DURATION, threshold_type: THRESHOLD_CUSTOM, threshold: 100},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
  {
    id: 76,
    status: 'completed',
    type: CLASSIFICATION,
    config: {
      prefix_length: 4,
      encoding: SIMPLE_INDEX,
      method: RANDOM_FOREST,
      padding: NO_PADDING,
      label: {type: ATTRIBUTE_NUMBER, threshold_type: THRESHOLD_MEAN, attribute_name: 'name', threshold: 0},
      clustering: NO_CLUSTER
    },
    split_id: 1
  },
];

const changedJob = {
  id: 1,
  status: 'completed',
  type: CLASSIFICATION,
  config: {
    prefix_length: 2,
    encoding: SIMPLE_INDEX,
    method: RANDOM_FOREST,
    padding: NO_PADDING,
    label: {type: DURATION, threshold_type: THRESHOLD_MEAN, threshold: 0},
    clustering: NO_CLUSTER
  },
  split_id: 1
};

const initState = {fetchState: {inFlight: false}, byId: {}, allIds: [], filteredIds: []};
describe('JobsReducer', () => {
  let state;

  beforeEach(() => {
    state = jobs(undefined, jobsRequested());
  });

  it('has nothing initially', () => {
    expect(jobs(undefined, {})).toMatchObject(initState);
  });

  it('changes fetchState when requesting', () => {
    expect(state).toMatchObject({fetchState: {inFlight: true}});
  });

  it('adds jobs when request completed', () => {
    const state2 = jobs(state, jobsRetrieved(jobList));
    expect(state2.fetchState).toMatchObject({inFlight: false});
    expect(state2.attributeNames).toEqual(['name']);
    expect(state2.thresholds).toEqual([0, 100]);
    expect(state2.uniqueSplits).toEqual([1, 2]);

    const {allIds, byId} = state2;
    expect(allIds).toEqual([1, 2, 3, 4, 5, 6, 75, 76]);
    expect(Object.keys(byId).length).toEqual(8);
    expect(byId[1].split_id).toBe(1);
  });

  it('updates job list by id', () => {
    const state2 = jobs(jobs(undefined, jobsRetrieved(jobList)), jobsRetrieved([changedJob]));

    const {byId} = state2;
    expect(byId[1].status).toBe('completed');
  });

  it('stores error message', () => {
    const state2 = jobs(state, jobsFailed('error'));
    expect(state2).toMatchObject({fetchState: {inFlight: false, error: 'error'}});
  });

  it('removes from list on delete', () => {
    const state2 = jobs(jobs(undefined, jobsRetrieved(jobList)), {type: JOB_DELETED, id: 75});
    const state3 = jobs(state2, {type: JOB_DELETED, id: 76});
    expect(state3.attributeNames).toEqual([]);
    expect(state3.thresholds).toEqual([0]);

    const {allIds, byId} = state3;
    expect(allIds).toEqual([1, 2, 3, 4, 5, 6]);
    expect(Object.keys(byId).length).toEqual(6);
  });
});

describe('Validation filter', () => {
  let state;
  let state2;
  let stateClass;

  beforeEach(() => {
    state = jobs(undefined, jobsRetrieved(jobList));
    state2 = jobs(state, {type: FILTER_SPLIT_CHANGED, splitId: 1});
    stateClass = jobs(state2, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
  });

  describe('initial state', () => {
    it('has no filtered jobs initially', () => {
      expect(state).toMatchObject({filteredIds: []});
    });

    it('has unique list of split ids', () => {
      expect(state).toMatchObject({uniqueSplits: [1, 2]});
    });

    it('has REGRESSION method', () => {
      expect(state).toMatchObject({predictionMethod: REGRESSION});
    });

    it('has no prefix lengths', () => {
      expect(state).toMatchObject({prefixLengths: []});
    });
  });

  describe('when FILTER_SPLIT_CHANGED', () => {
    it('adds to filtered job list', () => {
      expect(state2.filteredIds).toEqual([6]);
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
      expect(state3.filteredIds).toEqual([3]);
    });

    it('populates prefix list', () => {
      let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      expect(state3.prefixLengths).toEqual([1]);
      expect(state3.selectedPrefixes).toEqual([1]);
    });

    it('resets filter options', () => {
      let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
      expect(state3.classification.length).toEqual(3);
      expect(state3.regression.length).toEqual(3);
      expect(state3.clusterings.length).toEqual(2);
      expect(state3.encodings.length).toEqual(5);
    });

    it('has label remaining type for regression', () => {
      let state3 = jobs(state2, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: REGRESSION});
      expect(state3.label).toEqual({type: REMAINING_TIME});
    });

    it('has label duration for classification', () => {
      let state3 = jobs(stateClass, {type: FILTER_SPLIT_CHANGED, splitId: 2});
      expect(state3.label).toEqual({type: DURATION, threshold_type: THRESHOLD_MEAN});
    });
  });

  describe('when FILTER_PREFIX_LENGTH_CHANGED', () => {
    it('removes from jobs', () => {
      const state3 = jobs(stateClass, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      expect(state3.prefixLengths).toEqual([2, 4]);
      expect(state3.selectedPrefixes).toEqual([2]);
      expect(state3.filteredIds).toEqual([2]);
    });

    it('removes and adds back to jobs', () => {
      const state3 = jobs(stateClass, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      const state4 = jobs(state3, {type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength: '4'});
      expect(state4.filteredIds).toEqual([2, 5]);
      expect(state4.selectedPrefixes).toEqual([2, 4]);
    });
  });

  describe('when FILTER_OPTION_CHANGED', () => {
    it('changes for encoding method', () => {
      let state3 = jobs(state2, {
        type: FILTER_OPTION_CHANGED,
        payload: {value: SIMPLE_INDEX, name: 'encodings[]'}
      });
      expect(state3.filteredIds).toEqual([]);
      expect(state3.encodings.length).toEqual(4);
    });

    it('changes for padding', () => {
      let state3 = jobs(state2, {
        type: FILTER_OPTION_CHANGED,
        payload: {value: ZERO_PADDING, name: 'padding-filter'}
      });
      expect(state3.filteredIds).toEqual([]);
      expect(state3.padding).toEqual(ZERO_PADDING);
    });

    it('resets when prediction method changes', () => {
      let state3 = jobs(state2, {
        type: FILTER_OPTION_CHANGED,
        payload: {value: SIMPLE_INDEX, name: 'encodings[]'}
      });
      state3 = jobs(state3, {type: FILTER_PREDICTION_METHOD_CHANGED, method: CLASSIFICATION});
      expect(state3.filteredIds).toEqual([2, 5]);
      expect(state3.encodings.length).toEqual(5);
    });
  });

  describe('when FILTER_LABEL_CHANGED', () => {
    it('changes the label', () => {
      const state3 = jobs(stateClass, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'type'}, value: DURATION}
      });
      expect(state3.label).toEqual({type: DURATION, threshold_type: THRESHOLD_MEAN});
      expect(state3.filteredIds).toEqual([2, 5]);
    });

    it('filters for custom threshold', () => {
      let state3 = jobs(stateClass, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'type'}, value: DURATION}
      });
      state3 = jobs(state3, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'threshold_type'}, value: THRESHOLD_CUSTOM}
      });
      state3 = jobs(state3, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'threshold', isNumber: true}, value: '100'}
      });
      expect(state3.label).toEqual({type: DURATION, threshold_type: THRESHOLD_CUSTOM, threshold: 100});
      expect(state3.filteredIds).toEqual([75]);
      expect(state3.thresholds).toEqual([0, 100]);
    });

    it('filters for attribute names', () => {
      let state34 = jobs(stateClass, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'type'}, value: ATTRIBUTE_NUMBER}
      });
      state34 = jobs(state34, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'threshold_type'}, value: THRESHOLD_MEAN}
      });
      state34 = jobs(state34, {
        type: FILTER_LABEL_CHANGED,
        payload: {config: {methodConfig: 'label', key: 'attribute_name'}, value: 'name'}
      });
      expect(state34.label).toMatchObject({
        type: ATTRIBUTE_NUMBER,
        threshold_type: THRESHOLD_MEAN,
        attribute_name: 'name'
      });
      expect(state34.filteredIds).toEqual([76]);
      expect(state34.attributeNames).toEqual(['name']);
    });
  });
});
