import React from 'react';
import {mount, shallow} from 'enzyme';
import FetchState from '../../components/FetchState';
import TrainingFormCard from '../../components/TrainingFormCard';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import CheckboxGroup from '../../components/training/CheckboxGroup';
import {SelectField} from 'react-md';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';

const fetchState = {inFlight: false};
const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
const onSubmit = jest.fn();
const onSplitChange = jest.fn();

const regressionPayload = {
  'type': 'regression',
  'split_id': 1,
  'config': {
    'clusterings': ['noCluster'],
    'encodings': ['simpleIndex'],
    'prefix_length': 1,
    'methods': ['linear'],
    'classification.decisionTree': {},
    'classification.knn': {},
    'classification.randomForest': {},
    'nextActivity.decisionTree': {},
    'nextActivity.knn': {},
    'nextActivity.randomForest': {},
    'regression.lasso': {},
    'regression.linear': {},
    'regression.randomForest': {},
  }
};

const classificationPayload = {
  'type': 'classification',
  'split_id': 1,
  'config': {
    'clusterings': ['noCluster'],
    'encodings': ['simpleIndex'],
    'methods': ['knn'],
    'prefix_length': 1,
    'rule': 'elapsed_time',
    'threshold': 'default',
    'classification.decisionTree': {},
    'classification.knn': {},
    'classification.randomForest': {},
    'nextActivity.decisionTree': {},
    'nextActivity.knn': {},
    'nextActivity.randomForest': {},
    'regression.lasso': {},
    'regression.linear': {},
    'regression.randomForest': {},
  }
};

const nextActivityPayload = {
  'type': 'nextActivity',
  'split_id': 1,
  'config': {
    'methods': ['knn'],
    'clusterings': ['noCluster'],
    'encodings': ['simpleIndex'],
    'prefix_length': 1,
    'classification.decisionTree': {},
    'classification.knn': {},
    'classification.randomForest': {},
    'nextActivity.decisionTree': {},
    'nextActivity.knn': {},
    'nextActivity.randomForest': {},
    'regression.lasso': {},
    'regression.linear': {},
    'regression.randomForest': {},
  }
};
const shallowElement = shallow(<TrainingFormCard fetchState={fetchState} splitLabels={splitLabels} maxEventsInLog={10}
                                                 onSubmit={onSubmit} onSplitChange={onSplitChange}/>);
const element = mount(<TrainingFormCard fetchState={fetchState} splitLabels={splitLabels} onSubmit={onSubmit}
                                        onSplitChange={onSplitChange} maxEventsInLog={10}/>);
describe('TrainingFormCard', () => {
  afterEach(() => {
    onSubmit.mockClear();
  });

  it('renders', () => {
    expect(shallowElement).toBeDefined();
    expect(shallowElement.find(FetchState).length).toBe(1);
    expect(shallowElement.find(SelectionControlGroup).length).toBe(3);
    expect(shallowElement.find(Button).length).toBe(2);
  });

  it('default state is regression', () => {
    expect(shallowElement.find(SelectField).props().value).toBe(splitLabels[0].value);

    const selectGroups = shallowElement.find(SelectionControlGroup);
    expect(selectGroups.at(0).props().value).toBe(REGRESSION);
    expect(selectGroups.at(1).props().value).toBe('simpleIndex');
    expect(selectGroups.at(2).props().value).toBe('noCluster');

    expect(shallowElement.find(CheckboxGroup).props().value).toBe('linear');
    // no warning
    expect(shallowElement.find('.md-text--error').length).toBe(0);
  });

  it('changes log name', () => {
    shallowElement.find(SelectField).simulate('change', 'Split #2');
    // In real condition split_id will be 2
    // expect(shallowElement.state().split_id).toBe(2);
    expect(shallowElement.state().split_id).toBe('Split #2');
    expect(onSplitChange.mock.calls[0][0]).toEqual('Split #2');
  });

  describe('submit', () => {
    it('default', () => {
      element.find(Button).at(0).simulate('click');

      expect(onSubmit.mock.calls[0][0]).toEqual(regressionPayload);
    });

    it('Classification with original threshold', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      // Change rule
      element.find(SelectionControlGroup).at(4).simulate('change', {target: {name: 'rule', value: 'elapsed_time'}});
      element.find(Button).at(0).simulate('click');

      expect(onSubmit.mock.calls[0][0]).toEqual(classificationPayload);
    });

    it('Classification with custom threshold', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      // Change threshold
      element.find(SelectionControlGroup).at(7).simulate('change', {target: {name: 'random?', value: 'custom'}});
      element.find(Button).at(0).simulate('click');

      let payload = classificationPayload;
      payload.config.threshold = 0;
      expect(onSubmit.mock.calls[0][0]).toEqual(payload);
    });

    it('NextActivity', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: NEXT_ACTIVITY}});
      element.find(Button).at(0).simulate('click');

      expect(onSubmit.mock.calls[0][0]).toEqual(nextActivityPayload);
    });
  });

  describe('reset', () => {
    it('works for default', () => {
      const encodingGroup = element.find(SelectionControlGroup).at(1);
      encodingGroup.simulate('change', {target: {name: 'encodings[]', value: 'boolean'}});

      element.find(Button).at(1).simulate('click');
      expect(element.state().encodings.length).toBe(1);
    });

    it('works for outcome', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      const group = element.find(SelectionControlGroup).at(4);
      group.simulate('change', {target: {name: 'classification[]', value: 'knn'}});

      element.find(Button).at(1).simulate('click');
      expect(element.state().predictionMethod).toBe(REGRESSION);
      expect(element.state().classification.length).toBe(1);
    });

    it('works for nextActivity', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: NEXT_ACTIVITY}});
      const group = element.find(SelectionControlGroup).at(3);
      group.simulate('change', {target: {name: 'classification[]', value: 'knn'}});

      element.find(Button).at(1).simulate('click');
      expect(element.state().classification.length).toBe(1);
    });
  });

  describe('warning', () => {
    it('warns if no encoding method', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: REGRESSION}});
      const encodingGroup = element.find(SelectionControlGroup).at(1);
      encodingGroup.simulate('change', {target: {name: 'encodings[]', value: 'simpleIndex'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no clustering method', () => {
      const clusteringGroup = element.find(SelectionControlGroup).at(2);
      clusteringGroup.simulate('change', {target: {name: 'clusterings[]', value: 'noCluster'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no regression method', () => {
      const regressionGroup = element.find(SelectionControlGroup).at(3);
      regressionGroup.simulate('change', {target: {name: 'regression[]', value: 'linear'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no classification method', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      const group = element.find(SelectionControlGroup).at(4);
      group.simulate('change', {target: {name: 'classification[]', value: 'knn'}});
      expect(element.find('.md-text--error').length).toBe(1);
    });
  });
});
