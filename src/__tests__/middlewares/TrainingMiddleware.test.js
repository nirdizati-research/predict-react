/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import {JOB_UPDATED, jobsRetrieved, trainingSucceeded} from '../../actions/JobActions';
import trainingMiddleware from '../../middlewares/TrainingMiddleware';

const store = {
    dispatch: jest.fn()
};
const next = jest.fn();

const log = {id: 1};
describe('TrainingMiddleware', () => {
    afterEach(() => {
        store.dispatch.mockClear();
    });

    it('dispatches jobs retrieved when training succeeded', () => {
        trainingMiddleware(store)(next)(trainingSucceeded([log]));

        expect(store.dispatch.mock.calls[0][0]).toEqual(jobsRetrieved([log]));
    });

    it('dispatches jobs retrieved when training succeeded', () => {
        trainingMiddleware(store)(next)({type: JOB_UPDATED, payload: log});

        expect(store.dispatch.mock.calls[0][0]).toEqual(jobsRetrieved([log]));
    });

    it('does nothing for other actions', () => {
        trainingMiddleware(store)(next)({type: 'AA'});

        expect(store.dispatch.mock.calls.length).toEqual(0);
    });
});
