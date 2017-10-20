import React from 'react';
import {shallow} from 'enzyme';
import {thresholdControls} from '../../../src/reference';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import Threshold from '../../../src/components/training/Threshold';
import {TextField} from 'react-md/lib/TextFields/index';

const threshold = {
  threshold: 0,
  value: thresholdControls[0].value
};
const onChange = jest.fn();
let element = null;

describe('Threshold', () => {
  beforeEach(() => {
    element = shallow(<Threshold thresholdControls={thresholdControls}
                                 onChange={onChange}
                                 threshold={threshold}/>);
  });

  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(SelectionControlGroup).length).toBe(1);
  });

  describe('default', () => {
    it('renders no textfield', () => {
      expect(element.find(TextField).length).toBe(0);
    });

    it('submits on checkbox change', () => {
      element.find(SelectionControlGroup).simulate('change', thresholdControls[0].value);
      expect(onChange).toHaveBeenCalledWith({value: 'default', threshold: 0});
    });
  });

  describe('custom', () => {
    beforeEach(() => {
      element.find(SelectionControlGroup).simulate('change', thresholdControls[1].value);
    });

    it('renders textfield', () => {
      expect(element.find(TextField).length).toBe(1);
    });

    it('submits on checkbox change', () => {
      element.find(TextField).simulate('change', '23');
      expect(onChange).toHaveBeenCalledWith({value: 'custom', threshold: 23});
    });

    it('does not submit empty values', () => {
      element.find(TextField).simulate('change', '');
      expect(onChange).not.toHaveBeenCalledWith({value: 'custom', threshold: ''});
    });
  });
});
