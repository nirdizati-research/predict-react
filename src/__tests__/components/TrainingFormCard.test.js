import React from 'react';
import {mount, shallow} from 'enzyme';
import FetchState from '../../components/FetchState';
import TrainingFormCard from '../../components/TrainingFormCard';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import CheckboxGroup from '../../components/training/CheckboxGroup';
import {SelectField} from 'react-md';
import {CLASSIFICATION, REGRESSION} from '../../reference';
import AdvancedConfiguration from '../../components/advanced/AdvancedConfiguration';
import PrefixSelector from '../../components/training/PrefixSelector';

const fetchState = {inFlight: false};
const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
const onSubmit = jest.fn();
const onSplitChange = jest.fn();
const onModelChange = jest.fn();

// const label = {
//   type: REMAINING_TIME,
//   attribute_name: '',
//   threshold_type: THRESHOLD_MEAN,
//   threshold: 0,
// };
// const regressionPayload = {
//   'type': 'regression',
//   'split_id': 1,
//   'config': {
//     'clusterings': ['noCluster'],
//     'encodings': ['simpleIndex'],
//     'encoding': {
//       'padding': 'no_padding',
//       'prefix_length': 2,
//       'generation_type': 'only',
//       'add_remaining_time': false,
//       'add_elapsed_time': false,
//       'add_executed_events': false,
//       'add_resources_used': false,
//       'add_new_traces': false,
//       'features': [],
//     },
//     'create_models': false,
//     'methods': ['linear'],
//     'kmeans': {},
//     'incremental_train': [],
//     'hyperparameter_optimizer': {
//       'algorithm_type': 'tpe',
//       'max_evaluations': 10,
//       'performance_metric': 'rmse',
//       'type': 'none',
//     },
//       'labelling': label,
//     'classification.decisionTree': {},
//     'classification.knn': {},
//     'classification.randomForest': {},
//     'classification.adaptiveTree': {},
//     'classification.hoeffdingTree': {},
//     'classification.multinomialNB': {},
//     'classification.perceptron': {},
//     'classification.SGDClassifier': {},
//     'classification.xgboost': {},
//     'classification.nn': {},
//     'regression.lasso': {},
//     'regression.linear': {},
//     'regression.randomForest': {},
//     'regression.xgboost': {},
//     'regression.nn': {},
//     'time_series_prediction.rnn': {}
//   }
// };


const labelPayload = {
  'config': {
      'labelling': {
      'attribute_name': '',
      'threshold': 0,
      'threshold_type': 'threshold_mean',
      'type': 'duration'
    },
    'encoding': {
      'padding': 'no_padding',
      'prefix_length': 2,
      'generation_type': 'only',
      'add_remaining_time': false,
      'add_elapsed_time': false,
      'add_executed_events': false,
      'add_resources_used': false,
      'add_new_traces': false,
      'features': []}
  },
  'split_id': 1,
  'type': 'labelling'
};
const shallowElement = shallow(<TrainingFormCard fetchState={fetchState} splitLabels={splitLabels} maxEventsInLog={10}
                                                 onSubmit={onSubmit} onSplitChange={onSplitChange}
                                                 traceAttributes={[]} classificationModels={[]} regressionModels={[]}
                                                 timeSeriesPredictionModels={[]} onModelChange={onModelChange}/>);

const element = mount(<TrainingFormCard fetchState={fetchState} splitLabels={splitLabels} onSubmit={onSubmit}
                                        onSplitChange={onSplitChange} maxEventsInLog={10} traceAttributes={[]}
                                        classificationModels={[]} regressionModels={[]}
                                        timeSeriesPredictionModels={[]} onModelChange={onModelChange}/>);
describe('TrainingFormCard', () => {
  afterEach(() => {
    onSubmit.mockClear();
  });

  it('renders', () => {
    expect(shallowElement).toBeDefined();
    expect(shallowElement.find(FetchState).length).toBe(1);
    expect(shallowElement.find(SelectionControlGroup).length).toBe(3);
    expect(shallowElement.find(Button).length).toBe(2);
    expect(shallowElement.find(AdvancedConfiguration).length).toBe(1);
    expect(shallowElement.find(PrefixSelector).length).toBe(1);
  });

  it('default state is regression', () => {
    expect(shallowElement.find(SelectField).props().value).toBe(splitLabels[0].value);

    const selectGroups = shallowElement.find(SelectionControlGroup);
    expect(selectGroups.at(0).props().value).toBe(REGRESSION);
    expect(selectGroups.at(2).props().value).toBe('simpleIndex');
    expect(selectGroups.at(1).props().value).toBe('noCluster');

    expect(shallowElement.find(CheckboxGroup).props().value).toBe('linear');
    // no warning
    expect(shallowElement.find('.md-text--error').length).toBe(0);
  });

  it('changes log name', () => {
    // constructor call
    expect(onSplitChange.mock.calls[0][0]).toEqual(1);
    shallowElement.find(SelectField).simulate('change', 'Split #2');
    // In real condition split_id will be 2
    // expect(shallowElement.state().split_id).toBe(2);
    expect(shallowElement.state().split_id).toBe('Split #2');
    // props updated
    expect(onSplitChange.mock.calls[1][0]).toEqual(1);
    // actual simulate change call
    expect(onSplitChange.mock.calls[3][0]).toEqual('Split #2');
  });

  // describe('submit', () => {
  //   it('default', () => {
  //     element.find(Button).at(0).simulate('click');
  //
  //     expect(onSubmit.mock.calls[0][0]).toEqual(regressionPayload);
  //   });
  // });

  describe('reset', () => {
    it('works for default', () => {
      const encodingGroup = element.find(SelectionControlGroup).at(3);
      encodingGroup.simulate('change', {target: {name: 'encodings[]', value: 'boolean'}});

      element.find(Button).at(1).simulate('click');
      expect(element.state().encodings.length).toBe(1);
    });

    it('works for classification', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      const group = element.find(SelectionControlGroup).at(1);
      group.simulate('change', {target: {name: 'classification[]', value: 'knn'}});

      element.find(Button).at(1).simulate('click');
      expect(element.state().predictionMethod).toBe(REGRESSION);
      expect(element.state().classification.length).toBe(1);
    });
  });

  describe('warning', () => {
    it('warns if no encoding method', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: REGRESSION}});
      const encodingGroup = element.find(SelectionControlGroup).at(3);
      encodingGroup.simulate('change', {target: {name: 'encodings[]', value: 'simpleIndex'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no clustering method', () => {
      const clusteringGroup = element.find(SelectionControlGroup).at(2);
      clusteringGroup.simulate('change', {target: {name: 'clusterings[]', value: 'noCluster'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no regression method', () => {
      const regressionGroup = element.find(SelectionControlGroup).at(1);
      regressionGroup.simulate('change', {target: {name: 'regression[]', value: 'linear'}});

      expect(element.find('.md-text--error').length).toBe(1);
    });

    it('warns if no classification method', () => {
      element.find(SelectionControlGroup).at(0).simulate('change', {target: {name: 'rule', value: CLASSIFICATION}});
      const group = element.find(SelectionControlGroup).at(1);
      group.simulate('change', {target: {name: 'classification[]', value: 'knn'}});
      expect(element.find('.md-text--error').length).toBe(1);
    });
  });
});

describe('labelForm', () => {
  const labelEl = mount(<TrainingFormCard fetchState={fetchState} splitLabels={splitLabels} maxEventsInLog={10}
                                          onSubmit={onSubmit} onSplitChange={onSplitChange} isLabelForm={true}
                                          traceAttributes={[]} classificationModels={[]} regressionModels={[]}
                                          timeSeriesPredictionModels={[]} onModelChange={onModelChange}/>);

  afterEach(() => {
    onSubmit.mockClear();
  });
  it('shows less elements', () => {
    expect(labelEl).toBeDefined();
    expect(labelEl.find(FetchState).length).toBe(1);
    expect(labelEl.find(SelectionControlGroup).length).toBe(2);
    expect(labelEl.find(CheckboxGroup).length).toBe(0);
    expect(labelEl.find(Button).length).toBe(2);
    expect(labelEl.find(AdvancedConfiguration).length).toBe(1);
    expect(labelEl.find(PrefixSelector).length).toBe(1);
  });

  describe('submit', () => {
    it('default', () => {
      labelEl.find(Button).at(0).simulate('click');

      expect(onSubmit.mock.calls[0][0]).toEqual(labelPayload);
    });
  });
});
