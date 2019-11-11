import React from 'react';
import {mount} from 'enzyme';
import FrontPage from '../../views/FrontPage';
import WalkThrough from '../../components/WalkThrough';

// Just trying how to test a connected component
// Might not be the best way, but works
const store = {
    getState: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn()
};

it('renders', () => {
    const element = mount(<FrontPage store={store}/>);
    expect(element).toBeDefined();
    expect(element.find(WalkThrough).length).toBe(1);
});
