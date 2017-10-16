import React from 'react';
import {shallow} from 'enzyme';
import FetchState from '../../../src/components/FetchState';
import {CircularProgress} from 'react-md/lib/Progress/index';
import Full from '../../../src/containers/Full/Full';

describe('Full', () => {
  it('renders', () => {
    const element = shallow(<Full location={{pathname: '/'}} children={{}}/>);
    expect(element).toBeDefined();
  });
});
