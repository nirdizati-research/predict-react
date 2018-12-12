/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import serverMiddleware from '../../middlewares/ServerMiddleware';

const store = {
  dispatch: jest.fn()
};
const next = jest.fn();

describe('ServerMiddleware', () => {
  afterEach(() => {
    store.dispatch.mockClear();
  });

  // Can't test other actions as it requires mocking HTTP requests

  it('does nothing for other actions', () => {
    serverMiddleware(store)(next)({type: 'AA'});

    expect(store.dispatch.mock.calls.length).toEqual(0);
  });
});
