import React from 'react';
import {shallow} from 'enzyme';
import FetchState from '../../../components/FetchState';
import SelectField from 'react-md/lib/SelectFields';
import {SelectionControlGroup} from 'react-md';
import {NO_PADDING} from '../../../reference';
import LabellingHeaderCard from '../../../components/Labelling/LabellingHeaderCard';
import LabelControls from '../../../components/Labelling/LabelControls';

const fetchState = {
  inFlight: false
};
const splitChange = jest.fn();
const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];

const filterOptions = {
  label: {type: 'remaining_time'},
  thresholds: [],
  attributeNames: [],
  padding: NO_PADDING
};

describe('LabellingHeaderCard', () => {
  it('renders', () => {
    const element = shallow(<LabellingHeaderCard fetchState={fetchState} splitLabels={splitLabels}
                                                 splitChange={splitChange} prefixLengths={[]} selectedPrefixes={[]}
                                                 filterOptionChange={jest.fn()} labelChange={jest.fn()}
                                                 prefixChange={jest.fn()} filterOptions={filterOptions}
                                                 selectedSplitId={1}/>);
    expect(element).toBeDefined();
    expect(element.find(LabelControls).length).toBe(1);
    expect(element.find(FetchState).length).toBe(1);
    expect(element.find(SelectField).length).toBe(1);
    expect(element.find(SelectionControlGroup).length).toBe(1);
  });

  it('calls selectChange', () => {
    const element = shallow(<LabellingHeaderCard fetchState={fetchState} splitLabels={splitLabels}
                                                 splitChange={splitChange} prefixLengths={['1', '2']}
                                                 selectedPrefixes={[]} filterOptionChange={jest.fn()}
                                                 labelChange={jest.fn()} prefixChange={jest.fn()}
                                                 filterOptions={filterOptions} selectedSplitId={1}/>);
    expect(element.find(SelectionControlGroup).length).toBe(2);

    element.find(SelectField).at(0).simulate('change', 'Log2');
    expect(splitChange).toHaveBeenCalledWith('Log2');
  });
});
