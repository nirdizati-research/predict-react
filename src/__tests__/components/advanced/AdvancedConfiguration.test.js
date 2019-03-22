import React from 'react';
import {shallow} from 'enzyme';
import {CLASSIFICATION, KMEANS, LABELLING, REGRESSION} from '../../../reference';
import {label1} from '../../../../stories/Advanced';
import AdvancedConfiguration from '../../../components/advanced/AdvancedConfiguration';
import HyperOpt from '../../../components/advanced/HyperOpt';
import KMeans from '../../../components/advanced/KMeans';
import RegressionRandomForest from '../../../components/advanced/regression/RegressionRandomForest';
import RegressionLasso from '../../../components/advanced/regression/RegressionLasso';
import RegressionLinear from '../../../components/advanced/regression/RegressionLinear';
import Labelling from '../../../components/advanced/Labelling';
import ClassificationKnn from '../../../components/advanced/classification/ClassificationKnn';
import ClassificationRandomForest from '../../../components/advanced/classification/ClassificationRandomForest';
import ClassificationDecisionTree from '../../../components/advanced/classification/ClassificationDecisionTree';
import RegressionXGBoost from '../../../components/advanced/regression/RegressionXGBoost';
import ClassificationXGBoost from '../../../components/advanced/classification/ClassificationXGBoost';

const onModelChange = jest.fn();

describe('Regression', () => {
    const element = shallow(<AdvancedConfiguration predictionMethod={REGRESSION} classification={[]} labelling={label1}
                                                   traceAttributes={[]} clusterings={[]}
                                                   regression={['randomForest', 'lasso', 'linear', 'xgboost']}
                                                   timeSeriesPrediction={[]}
                                                   onChange={jest.fn()}
                                                   classificationModels={[]}
                                                   regressionModels={[]}
                                                   timeSeriesPredictionModels={[]}
                                                   onModelChange={onModelChange}/>);

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
                                                 labelling={label1}
                                                 traceAttributes={[]} clusterings={[KMEANS]} regression={[]}
                                                 timeSeriesPrediction={[]}
                                                 onChange={jest.fn()}
                                                 classificationModels={[]}
                                                 regressionModels={[]}
                                                 timeSeriesPredictionModels={[]}
                                                 onModelChange={onModelChange}/>);

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


// TODO: add timeSeriesPrediction tests

describe('Labelling', () => {
  const element = shallow(<AdvancedConfiguration predictionMethod={LABELLING}
                                                 classification={[]} labelling={label1}
                                                 traceAttributes={[]} clusterings={[KMEANS]} regression={[]}
                                                 timeSeriesPrediction={[]}
                                                 onChange={jest.fn()}
                                                 classificationModels={[]}
                                                 regressionModels={[]}
                                                 timeSeriesPredictionModels={[]}
                                                 onModelChange={onModelChange}/>);

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
