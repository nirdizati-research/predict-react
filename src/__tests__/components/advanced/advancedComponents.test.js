import React from 'react';
import {shallow} from 'enzyme';
import AddColumns from '../../../components/advanced/AddColumns';
import {Checkbox, SelectField, TextField} from 'react-md';
import {label1, traceAttributes} from '../../../../stories/Advanced';
import ClassificationDecisionTree from '../../../components/advanced/ClassificationDecisionTree';
import ClassificationKnn from '../../../components/advanced/ClassificationKnn';
import ClassificationRandomForest from '../../../components/advanced/ClassificationRandomForest';
import HyperOpt from '../../../components/advanced/HyperOpt';
import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  CLASSIFICATION,
  DURATION,
  NEXT_ACTIVITY,
  REGRESSION
} from '../../../reference';
import KMeans from '../../../components/advanced/KMeans';
import RegressionLinear from '../../../components/advanced/RegressionLinear';
import RegressionLasso from '../../../components/advanced/RegressionLasso';
import RegressionRandomForest from '../../../components/advanced/RegressionRandomForest';
import Labelling from '../../../components/advanced/Labelling';
import RegressionXGBoost from '../../../components/advanced/RegressionXGBoost';
import ClassificationXGBoost from '../../../components/advanced/ClassificationXGBoost';

const onChange = jest.fn();

it('AddColumns has 5 checkboxes', () => {
  const element = shallow(<AddColumns label={label1} onChange={onChange}/>);
  expect(element.find(Checkbox).length).toBe(5);
});

it('ClassificationDecisionTree has 3 textfields', () => {
  const element = shallow(<ClassificationDecisionTree onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(3);
});

it('ClassificationKnn', () => {
  const element = shallow(<ClassificationKnn onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(1);
  expect(element.find(SelectField).length).toBe(1);
});

it('ClassificationRandomForest', () => {
  const element = shallow(<ClassificationRandomForest onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(3);
});

it('HyperOpt', () => {
  const element = shallow(<HyperOpt predictionMethod={CLASSIFICATION} onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(1);
  expect(element.find(SelectField).length).toBe(1);
  expect(element.find(Checkbox).length).toBe(1);
});

it('Kmeans', () => {
  const element = shallow(<KMeans onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(2);
  expect(element.find(SelectField).length).toBe(1);
});

it('RegressionLinear', () => {
  const element = shallow(<RegressionLinear onChange={onChange}/>);
  expect(element.find(Checkbox).length).toBe(2);
});

it('RegressionLasso', () => {
  const element = shallow(<RegressionLasso onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(1);
  expect(element.find(Checkbox).length).toBe(2);
});

it('RegressionRandomForest', () => {
  const element = shallow(<RegressionRandomForest onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(3);
});

it('RegressionXGBoost', () => {
  const element = shallow(<RegressionXGBoost onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(2);
});

it('ClassificationXGBoost', () => {
  const element = shallow(<ClassificationXGBoost onChange={onChange}/>);
  expect(element.find(TextField).length).toBe(3);
});


describe('Labelling', () => {
  describe('Regression', () => {
    const method = REGRESSION;
    it('remaining time', () => {
      const element = shallow(<Labelling label={label1} predictionMethod={method} traceAttributes={[]}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(1);
      expect(element.find(SelectField).at(0).props().menuItems.length).toBe(2);
    });

    it('number atr', () => {
      const element = shallow(<Labelling label={{...label1, type: ATTRIBUTE_NUMBER}} predictionMethod={method}
                                         traceAttributes={[]}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(2);
    });
  });

  describe('class or label', () => {
    const method = CLASSIFICATION;
    it('duration', () => {
      const element = shallow(<Labelling label={{...label1, type: DURATION}} predictionMethod={method}
                                         traceAttributes={[]}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(2);
      expect(element.find(TextField).length).toBe(1);
      expect(element.find(SelectField).at(0).props().menuItems.length).toBe(4);
      expect(element.find(TextField).at(0).props().label).toBe('Threshold (seconds)');
    });

    it('number atr', () => {
      const element = shallow(<Labelling label={{...label1, type: ATTRIBUTE_NUMBER}} predictionMethod={method}
                                         traceAttributes={traceAttributes}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(3);
      expect(element.find(TextField).length).toBe(1);
      expect(element.find(SelectField).at(1).props().menuItems.length).toBe(2);
      expect(element.find(TextField).at(0).props().label).toBe('Threshold');
    });

    it('string atr', () => {
      const element = shallow(<Labelling label={{...label1, type: ATTRIBUTE_STRING}} predictionMethod={method}
                                         traceAttributes={traceAttributes}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(2);
      expect(element.find(TextField).length).toBe(0);
      expect(element.find(SelectField).at(1).props().menuItems.length).toBe(2);
    });

    it('next activity', () => {
      const element = shallow(<Labelling label={{...label1, type: NEXT_ACTIVITY}} predictionMethod={method}
                                         traceAttributes={[]}
                                         onChange={onChange}/>);

      expect(element.find(SelectField).length).toBe(1);
    });
  });
});
