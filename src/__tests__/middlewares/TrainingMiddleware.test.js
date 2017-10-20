/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import {push} from 'react-router-redux';
import {trainingSucceeded} from '../../actions/JobActions';
import trainingMiddleware from '../../middlewares/TrainingMiddleware';

const store = {
  dispatch: jest.fn()
};
const next = jest.fn();

describe('TrainingMiddleware', () => {
  afterEach(() => {
    store.dispatch.mockClear();
  });

  it('navigates to jobStatuswhen training succeeded', () => {
    trainingMiddleware(store)(next)(trainingSucceeded());

    expect(store.dispatch.mock.calls[0][0]).toEqual(push('/jobStatus'));
  });

  it('does nothing for other actions', () => {
    trainingMiddleware(store)(next)({type: 'AA'});

    expect(store.dispatch.mock.calls.length).toEqual(0);
  });
});
