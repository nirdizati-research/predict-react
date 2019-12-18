import lime from '../../reducers/Lime';
import {limeValueListRequested, limeValueListRetrieved, limeValueListFailed} from '../../actions/LimeActions';
import {limeList} from '../../../stories/Explanation';


const initialState = {
    fetchState: {inFlight: false},
    limeValueList: {}
};
describe('LimeReducer', () => {
    it('has nothing initially', () => {
        expect(lime(undefined, {})).toEqual(initialState);
    });

    describe('limeList', () => {
        const stateWithRequest = lime(undefined, limeValueListRequested());

        it('changes fetchState when requesting', () => {
            expect(stateWithRequest.fetchState).toEqual({inFlight: true});
        });

        it('changes fetchState when request completed', () => {
            const state2 = lime(stateWithRequest, limeValueListRetrieved(limeList));
            expect(state2.fetchState).toEqual({inFlight: false});
        });

        it('changes fetchState when request failed', () => {
            const state2 = lime(stateWithRequest, limeValueListFailed('error'));
            expect(state2.fetchState).toEqual({inFlight: false, error: 'error'});
        });

        it('puts lime into store', () => {
            const state2 = lime(stateWithRequest, limeValueListRetrieved(limeList));
            const {limeValueList} = state2;
            expect(limeValueList).toEqual(limeList);
        });
    });
});
