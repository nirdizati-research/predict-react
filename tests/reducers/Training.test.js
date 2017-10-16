/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import training from '../../src/reducers/Training';
import {submitTraining, trainingFailed, trainingSucceeded} from '../../src/actions/JobActions';

const initState = {fetchState: {inFlight: false}};
describe('TrainingReducer', () => {
  it('has nothing initially', () => {
    expect(training(undefined, {})).toEqual(initState);
  });

  it('changes fetchState when submitted', () => {
    const state = training(undefined, submitTraining());
    expect(state).toEqual({fetchState: {inFlight: true}});
  });

  it('changes state when completed', () => {
    const state = training(undefined, submitTraining());
    const state2 = training(state, trainingSucceeded());
    expect(state2).toEqual({fetchState: {inFlight: false}});
  });

  it('stores error message', () => {
    const state = training(undefined, submitTraining());
    const state2 = training(state, trainingFailed('error'));
    expect(state2).toEqual({fetchState: {inFlight: false, error: 'error'}});
  });
});
