import React from 'react';
import {shallow} from 'enzyme';
import AddColumns from '../../../components/advanced/AddColumns';
import {Checkbox, SelectField, TextField} from 'react-md';
import {label1} from '../../../../stories/Advanced';
import ClassificationDecisionTree from '../../../components/advanced/ClassificationDecisionTree';
import ClassificationKnn from '../../../components/advanced/ClassificationKnn';
import ClassificationRandomForest from '../../../components/advanced/ClassificationRandomForest';
import HyperOpt from '../../../components/advanced/HyperOpt';
import {CLASSIFICATION} from '../../../reference';

const onChange = jest.fn();

it('AddColumns has 5 checkboxes', () => {
  const element = shallow(<AddColumns label={label1} onChange={onChange}/>).first();
  expect(element.find(Checkbox).length).toBe(5);
});

it('ClassificationDecisionTree has 3 textfields', () => {
  const element = shallow(<ClassificationDecisionTree onChange={onChange}/>).first();
  expect(element.find(TextField).length).toBe(3);
});

it('ClassificationKnn', () => {
  const element = shallow(<ClassificationKnn onChange={onChange}/>).first();
  expect(element.find(TextField).length).toBe(1);
  expect(element.find(SelectField).length).toBe(1);
});

it('ClassificationRandomForest', () => {
  const element = shallow(<ClassificationRandomForest onChange={onChange}/>).first();
  expect(element.find(TextField).length).toBe(3);
});

it('HyperOpt', () => {
  const element = shallow(<HyperOpt predictionMethod={CLASSIFICATION} onChange={onChange}/>).first();
  expect(element.find(TextField).length).toBe(1);
  expect(element.find(SelectField).length).toBe(1);
  expect(element.find(Checkbox).length).toBe(1);
});

