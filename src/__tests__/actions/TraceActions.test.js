import {
    TRACE_LIST_FAILED,
    TRACE_LIST_REQUESTED,
    TRACE_LIST_RETRIEVED,
    traceListFailed,
    traceListRequested,
    traceListRetrieved
} from '../../actions/TraceActions';

describe('TraceActions', () => {
    describe('traceListRequested', () => {
        it('has correct payload type', () => {
            expect(traceListRequested().type).toBe(TRACE_LIST_REQUESTED);
        });
    });
    describe('traceListRetrieved', () => {
        it('has correct payload type', () => {
            expect(traceListRetrieved().type).toBe(TRACE_LIST_RETRIEVED);
        });
    });
    describe('traceListFailed', () => {
        it('has correct payload type', () => {
            expect(traceListFailed().type).toBe(TRACE_LIST_FAILED);
        });
    });
});
