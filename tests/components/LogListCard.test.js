import React from 'react';
import {shallow} from 'enzyme';
import LogListCard from '../../src/components/LogListCard';
import FetchState from '../../src/components/FetchState';
import SelectField from 'react-md/lib/SelectFields';

const fetchState = {
  inFlight: false
};
const selectChange = jest.fn();
const logNames = [
  'Log1',
  'Log2'
];

describe('LogListCard', () => {
  it('renders', () => {
    const element = shallow(<LogListCard fetchState={fetchState} logNames={logNames} selectChange={selectChange}
                                         visibleLogName=''/>);
    expect(element).toBeDefined();
    expect(element.find(FetchState)).toBeDefined();
    expect(element.find(SelectField)).toBeDefined();
  });

  it('calls selectChange', () => {
    const element = shallow(<LogListCard fetchState={fetchState} logNames={logNames} selectChange={selectChange}
                                         visibleLogName=''/>);
    element.find(SelectField).simulate('change', 'Log2');
    expect(selectChange).toHaveBeenCalledWith('Log2');
  });
});
