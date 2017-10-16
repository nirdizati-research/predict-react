import React from 'react';
import {shallow} from 'enzyme';
import Full from '../../../src/containers/Full/Full';

describe('Full', () => {
  it('renders', () => {
    const element = shallow(<Full location={{pathname: '/'}} children={{}}/>);
    expect(element).toBeDefined();
  });
});
