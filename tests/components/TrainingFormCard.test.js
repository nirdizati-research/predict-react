import React from 'react';
import {shallow, mount} from 'enzyme';
import FetchState from '../../src/components/FetchState';
import TrainingFormCard from '../../src/components/TrainingFormCard';
import SelectField from 'react-md/lib/SelectFields';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import CheckboxGroup from '../../src/components/training/CheckboxGroup';

const fetchState = {inFlight: false};
const logNames = ['Log1', 'Log2'];
const onSubmit = jest.fn();

describe('TrainingFormCard', () => {
  afterEach(() => {
    onSubmit.mockClear();
  });

  it('renders', () => {
    const element = shallow(<TrainingFormCard fetchState={fetchState} logNames={logNames} onSubmit={onSubmit}/>);
    expect(element).toBeDefined();
    expect(element.find(FetchState).length).toBe(1);
    expect(element.find(SelectionControlGroup).length).toBe(3);
    expect(element.find(Button).length).toBe(2);
  });

  it('default state is regression', () => {
    const element = shallow(<TrainingFormCard fetchState={fetchState} logNames={logNames} onSubmit={onSubmit}/>);
    expect(element.find(SelectField).props().value).toBe(logNames[0]);

    const selectGroups = element.find(SelectionControlGroup);
    expect(selectGroups.at(0).props().value).toBe('time');
    expect(selectGroups.at(1).props().value).toBe('simpleIndex');
    expect(selectGroups.at(2).props().value).toBe('None');

    expect(element.find(CheckboxGroup).props().value).toBe('linear');
    // no warning
    expect(element.find('.md-text--error').length).toBe(0);
  });

  describe('warning', () => {
    it('warns if no encoding method', () => {
      // const element = mount(<TrainingFormCard fetchState={fetchState} logNames={logNames} onSubmit={onSubmit}/>);
      // console.log(element.find('input[type="checkbox"]').at(0).props());
      // // element.find(SelectionControlGroup).get(1).setProps({value: ''});
      //
      // element.find('input[type="checkbox"]').at(0).simulate('change', {target: {checked: false}});
      // element.find('input[type="checkbox"]').at(0).simulate('change',  {checked: false});
      // element.find('input[type="checkbox"]').at(0).simulate('click');
      // console.log(element.find('input[type="checkbox"]').at(0).props());
      // console.log(element.state());
      // expect(element.find('.md-text--error').length).toBe(1);
    });
  });

});
