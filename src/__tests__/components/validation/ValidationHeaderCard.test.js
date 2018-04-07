import React from 'react';
import {shallow} from 'enzyme';
import FetchState from '../../../components/FetchState';
import SelectField from 'react-md/lib/SelectFields';
import ValidationHeaderCard from '../../../components/validation/ValidationHeaderCard';
import {SelectionControlGroup} from 'react-md';
import {CLASSIFICATION} from '../../../reference';

const fetchState = {
  inFlight: false
};
const splitChange = jest.fn();
const methodChange = jest.fn();
const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];

describe('ValidationHeaderCard', () => {
  it('renders', () => {
    const element = shallow(<ValidationHeaderCard fetchState={fetchState} splitLabels={splitLabels}
                                                  splitChange={splitChange} methodChange={methodChange}
                                                  prefixLengths={[]} selectedPrefixes={[]}
                                                  prefixChange={jest.fn()}
                                                  selectedSplitId={1}/>);
    expect(element).toBeDefined();
    expect(element.find(FetchState).length).toBe(1);
    expect(element.find(SelectField).length).toBe(1);
    expect(element.find(SelectionControlGroup).length).toBe(1);
  });

  it('calls selectChange', () => {
    const element = shallow(<ValidationHeaderCard fetchState={fetchState} splitLabels={splitLabels}
                                                  splitChange={splitChange} methodChange={methodChange}
                                                  prefixLengths={[]} selectedPrefixes={[]}
                                                  prefixChange={jest.fn()}
                                                  selectedSplitId={1}/>);
    element.find(SelectField).simulate('change', 'Log2');
    expect(splitChange).toHaveBeenCalledWith('Log2');
  });

  it('calls methodChange', () => {
    const element = shallow(<ValidationHeaderCard fetchState={fetchState} splitLabels={splitLabels}
                                                  splitChange={splitChange} methodChange={methodChange}
                                                  prefixLengths={[]} selectedPrefixes={[]}
                                                  prefixChange={jest.fn()}
                                                  selectedSplitId={1}/>);
    element.find(SelectionControlGroup).at(0).simulate('change', CLASSIFICATION);
    expect(methodChange).toHaveBeenCalledWith(CLASSIFICATION);
  });
});
