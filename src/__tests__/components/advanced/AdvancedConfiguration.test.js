import React from 'react';
import {shallow} from 'enzyme';
import {CLASSIFICATION, KMEANS, LABELLING, REGRESSION} from '../../../reference';
import {label1} from '../../../../stories/Advanced';
import AdvancedConfiguration from '../../../components/advanced/AdvancedConfiguration';
import HyperOpt from '../../../components/advanced/HyperOpt';
import KMeans from '../../../components/advanced/KMeans';
import RegressionRandomForest from '../../../components/advanced/RegressionRandomForest';
import RegressionLasso from '../../../components/advanced/RegressionLasso';
import RegressionLinear from '../../../components/advanced/RegressionLinear';
import Labelling from '../../../components/advanced/Labelling';
import ClassificationKnn from '../../../components/advanced/ClassificationKnn';
import ClassificationRandomForest from '../../../components/advanced/ClassificationRandomForest';
import ClassificationDecisionTree from '../../../components/advanced/ClassificationDecisionTree';
import RegressionXGBoost from '../../../components/advanced/RegressionXGBoost';
import ClassificationXGBoost from '../../../components/advanced/ClassificationXGBoost';


describe('Regression', () => {
  const element = shallow(<AdvancedConfiguration predictionMethod={REGRESSION} classification={[]} label={label1}
                                                 traceAttributes={[]} clusterings={[]}
                                                 regression={['randomForest', 'lasso', 'linear', 'xgboost']}
                                                 onChange={jest.fn()}/>);

  it('standard items', () => {
    expect(element.find(HyperOpt).length).toBe(1);
    expect(element.find(Labelling).length).toBe(1);
  });

  it('has no clustering', () => {
    expect(element.find(KMeans).length).toBe(0);
  });

  it('has all regression methods', () => {
    expect(element.find(RegressionRandomForest).length).toBe(1);
    expect(element.find(RegressionLasso).length).toBe(1);
    expect(element.find(RegressionLinear).length).toBe(1);
    expect(element.find(RegressionXGBoost).length).toBe(1);
  });
});


describe('Classification', () => {
  const element = shallow(<AdvancedConfiguration predictionMethod={CLASSIFICATION}
                                                 classification={['knn', 'decisionTree', 'randomForest', 'xgboost']}
                                                 label={label1}
                                                 traceAttributes={[]} clusterings={[KMEANS]} regression={[]}
                                                 onChange={jest.fn()}/>);

  it('standard items', () => {
    expect(element.find(HyperOpt).length).toBe(1);
    expect(element.find(Labelling).length).toBe(1);
  });

  it('has clustering', () => {
    expect(element.find(KMeans).length).toBe(1);
  });

  it('has all classification methods', () => {
    expect(element.find(ClassificationKnn).length).toBe(1);
    expect(element.find(ClassificationRandomForest).length).toBe(1);
    expect(element.find(ClassificationDecisionTree).length).toBe(1);
    expect(element.find(ClassificationXGBoost).length).toBe(1);
  });
});


describe('Labelling', () => {
  const element = shallow(<AdvancedConfiguration predictionMethod={LABELLING}
                                                 classification={[]} label={label1}
                                                 traceAttributes={[]} clusterings={[KMEANS]} regression={[]}
                                                 onChange={jest.fn()}/>);

  it('has no hyperopt', () => {
    expect(element.find(HyperOpt).length).toBe(0);
  });

  it('has label', () => {
    expect(element.find(Labelling).length).toBe(1);
  });

  it('has no clustering', () => {
    expect(element.find(KMeans).length).toBe(0);
  });
});
