import {
    MODELS_FAILED,
    MODELS_REQUESTED,
    MODELS_RETRIEVED,
    modelsFailed,
    modelsRequested,
    modelsRetrieved,
} from '../../actions/ModelActions';

describe('ModelActions', () => {
    describe('modelsRequested', () => {
        it('has correct payload type', () => {
            expect(modelsRequested().type).toBe(MODELS_REQUESTED);
        });
    });
    describe('modelsRetrieved', () => {
        it('has correct payload type', () => {
            expect(modelsRetrieved().type).toBe(MODELS_RETRIEVED);
        });
    });
    describe('modelsFailed', () => {
        it('has correct payload type', () => {
            expect(modelsFailed().type).toBe(MODELS_FAILED);
        });
    });
});
