import React from 'react';
import {shallow} from 'enzyme';
import FetchState from '../../components/FetchState';
import {CircularProgress} from 'react-md/lib/Progress/index';

describe('FetchState', () => {
    it('renders empty by default', () => {
        const fetchState = {
            inFlight: false
        };
        const element = shallow(<FetchState fetchState={fetchState}/>);
        expect(element).toBeDefined();
        expect(element.get(0)).toBeNull();
    });

    it('renders spinner when in flight', () => {
        const fetchState = {
            inFlight: true
        };
        const element = shallow(<FetchState fetchState={fetchState}/>);
        expect(element.contains(<CircularProgress id="query-indeterminate-progress"/>)).toBe(true);
    });

    it('renders error', () => {
        const fetchState = {
            inFlight: false,
            error: 'This is error'
        };
        const element = shallow(<FetchState fetchState={fetchState}/>);
        expect(element.text()).toMatch(fetchState.error);
    });
});
