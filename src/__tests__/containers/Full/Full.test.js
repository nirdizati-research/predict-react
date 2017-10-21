import React from 'react';
import {shallow} from 'enzyme';
import Full from '../../../containers/Full/Full';

describe('Full', () => {
  it('renders', () => {
    const element = shallow(<Full location={{pathname: '/'}}>{{}}</Full>);
    expect(element).toBeDefined();
  });
});
