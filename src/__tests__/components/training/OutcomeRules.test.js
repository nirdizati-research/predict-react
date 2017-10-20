import React from 'react';
import {shallow} from 'enzyme';
import {outcomeRuleControls} from '../../../reference';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import OutcomeRules from '../../../components/training/OutcomeRules';

describe('OutcomeRules', () => {
  it('renders', () => {
    const element = shallow(<OutcomeRules outcomeRuleControls={outcomeRuleControls}
                                          checkboxChange={jest.fn()}
                                          value={outcomeRuleControls[0].value}/>);
    expect(element).toBeDefined();
    expect(element.find(SelectionControlGroup).length).toBe(1);
    expect(element.text()).toMatch(/Choose rule/);
  });
});
