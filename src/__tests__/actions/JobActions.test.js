import {
    JOBS_FAILED,
    JOBS_REQUESTED,
    JOBS_RETRIEVED,
    jobsFailed,
    jobsRequested,
    jobsRetrieved,
    submitTraining,
    TRAINING_FAILED,
    TRAINING_SUBMITTED,
    TRAINING_SUCCEEDED,
    trainingFailed,
    trainingSucceeded
} from '../../actions/JobActions';

describe('JobActions', () => {
    describe('jobsRequested', () => {
        it('has correct payload type', () => {
            expect(jobsRequested().type).toBe(JOBS_REQUESTED);
        });
    });
    describe('jobsRetrieved', () => {
        it('has correct payload type', () => {
            expect(jobsRetrieved().type).toBe(JOBS_RETRIEVED);
        });
    });
    describe('jobsFailed', () => {
        it('has correct payload type', () => {
            expect(jobsFailed().type).toBe(JOBS_FAILED);
        });
    });
});

describe('TrainingActions', () => {
    describe('submitTraining', () => {
        it('has correct payload type', () => {
            expect(submitTraining().type).toBe(TRAINING_SUBMITTED);
        });
    });
    describe('trainingSucceeded', () => {
        it('has correct payload type', () => {
            expect(trainingSucceeded().type).toBe(TRAINING_SUCCEEDED);
        });
    });
    describe('trainingSucceeded', () => {
        it('has correct payload type', () => {
            expect(trainingFailed().type).toBe(TRAINING_FAILED);
        });
    });
});
