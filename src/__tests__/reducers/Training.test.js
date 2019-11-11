/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import training from '../../reducers/Training';
import {JOB_UPDATED, submitTraining, trainingFailed, trainingSucceeded} from '../../actions/JobActions';

const initState = {
    fetchState: {inFlight: false},
    haveRunning: false,
    totalCount: 0,
    runningIds: []
};

describe('TrainingReducer', () => {
    it('has nothing initially', () => {
        expect(training(undefined, {})).toEqual(initState);
    });

    it('changes fetchState when submitted', () => {
        const state = training(undefined, submitTraining());
        expect(state).toMatchObject({fetchState: {inFlight: true}});
    });

    it('sets running true when succeeded', () => {
        const state = training(undefined, submitTraining());
        const state2 = training(state, trainingSucceeded([{id: 1}, {id: 2}]));
        expect(state2).toMatchObject({
            fetchState: {inFlight: false},
            haveRunning: true,
            runningIds: [1, 2],
            totalCount: 2
        });
    });

    it('removes job from running when JOB_UPDATED', () => {
        const state = training(undefined, trainingSucceeded([{id: 1}, {id: 2}]));
        const state2 = training(state, {type: JOB_UPDATED, payload: {id: 2}});
        expect(state2).toMatchObject({haveRunning: true, runningIds: [1], totalCount: 2});
    });


    it('stores error message', () => {
        const state = training(undefined, submitTraining());
        const state2 = training(state, trainingFailed('error'));
        expect(state2).toMatchObject({fetchState: {inFlight: false, error: 'error'}, haveRunning: false});
    });
});
