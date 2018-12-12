import React from 'react';
import {shallow} from 'enzyme';
import WalkThrough from '../../components/WalkThrough';

it('renders', () => {
  const element = shallow(<WalkThrough/>);
  expect(element).toBeDefined();
});

