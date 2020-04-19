import React from 'react';
import {shallow} from 'enzyme';
import WalkThrough from '../../components/WalkThrough';
import {List} from 'react-md';
import GuideItem from '../../components/static/GuideItem';

it('renders', () => {
    const element = shallow(<WalkThrough/>);
    expect(element).toBeDefined();
    expect(element.find(List).length).toBe(1);
    expect(element.find(GuideItem).length).toBeGreaterThanOrEqual(7);
});

