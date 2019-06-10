import React from 'react';
import {
    ADAPTIVE_TREE,
    CLASSIFICATION,
    DECISION_TREE,
    HOEFFDING_TREE,
    KMEANS,
    KNN,
    LABELLING,
    LASSO,
    LINEAR,
    MULTINOMIAL_NAIVE_BAYES,
    NN,
    PERCEPTRON,
    RANDOM_FOREST,
    REGRESSION,
    RNN,
    SGDCLASSIFIER,
    TIME_SERIES_PREDICTION,
    XGBOOST,
    INCREMENTAL_CLASSIFIERS
} from '../../reference';

import PropTypes from 'prop-types';
import {labelPropType, modelPropType, traceAttributeShape} from '../../propTypes';
import {ExpansionList} from 'react-md';
import GenericConfiguration from './GenericConfiguration';

import KMeans from './KMeans';
import HyperOpt from './HyperOpt';
import Labelling from './Labelling';
import AddColumns from './AddColumns';

import ClassificationKnn from './classification/ClassificationKnn';
import ClassificationDecisionTree from './classification/ClassificationDecisionTree';
import ClassificationRandomForest from './classification/ClassificationRandomForest';
import ClassificationXGBoost from './classification/ClassificationXGBoost';
import ClassificationNaiveBayes from './classification/ClassificationNaiveBayes';
import ClassificationHoeffdingTree from './classification/ClassificationHoeffdingTree';
import ClassificationAdaptiveTree from './classification/ClassificationAdaptiveTree';
import ClassificationSGDClassifier from './classification/ClassificationSGDClassifier';
import ClassificationPerceptronClassifier from './classification/ClassificationPerceptron';
import ClassificationNN from './classification/ClassificationNN';

import RegressionLinear from './regression/RegressionLinear';
import RegressionRandomForest from './regression/RegressionRandomForest';
import RegressionLasso from './regression/RegressionLasso';
import RegressionXGBoost from './regression/RegressionXGBoost';
import RegressionNN from './regression/RegressionNN';

import TimeSeriesPredictionRNN from './timeSeriesPrediction/TimeSeriesPredictionRNN';

import Incremental from './Incremental';

const KMeansUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html';
const HyperOptUrl = 'http://hyperopt.github.io/hyperopt/';

const classificationKnnUrl =
    'http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html';
const classificationDecisionTreeUrl =
    'http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html';
const classificationRandomForestUrl =
    'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html';
const classificationXGBoostUrl =
    'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBClassifier';
const classificationNaiveBayes =
    'http://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.MultinomialNB.html';
const classificationHoeffdingTree =
    'https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.classification.trees.hoeffding_tree.html';
const classificationAdaptiveTree =
    'https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.classification.trees.hoeffding_adaptive_tree.html';
const classificationSGDClassifier =
    'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.' +
    'SGDClassifier.html#sklearn.linear_model.SGDClassifier';
const classificationPerceptron =
    'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.' +
    'Perceptron.html#sklearn.linear_model.Perceptron';
const classificationNNUrl = 'https://keras.io/'; // TODO: put meaningful link

const regressionLinearUrl =
    'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html';
const regressionRandomForestUrl =
    'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html';
const regressionLassoUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.html';
const regressionXGBoostUrl = 'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBRegressor';
const regressionNNUrl = 'https://keras.io/'; // TODO: put meaningful link

const timeSeriesPredictionRNNUrl = 'https://keras.io/'; // TODO: put meaningful link


const AdvancedConfiguration = (props) => {
  const makeExpander = (panelLabel, url, component, defaultExpanded) => {
    return <GenericConfiguration key={panelLabel} panelLabel={panelLabel} defaultExpanded={defaultExpanded}
                                 documentationUrl={url}>{component}</GenericConfiguration>;
  };


    const classificationConfigMap = {
      [`${CLASSIFICATION}.${KNN}`]: makeExpander('K-Neighbors classifier', classificationKnnUrl,
          <ClassificationKnn onChange={props.onChange}/>),
      [`${CLASSIFICATION}.${DECISION_TREE}`]: makeExpander('Decision tree classifier', classificationDecisionTreeUrl,
      <ClassificationDecisionTree onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${RANDOM_FOREST}`]: makeExpander('Random forest classifier', classificationRandomForestUrl,
      <ClassificationRandomForest onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${XGBOOST}`]: makeExpander('XGBoost classifier', classificationXGBoostUrl,
      <ClassificationXGBoost onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${NN}`]: makeExpander('NN classifier', classificationNNUrl,
          <ClassificationNN onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${MULTINOMIAL_NAIVE_BAYES}`]: makeExpander('Naive Bayes classifier', classificationNaiveBayes,
          <ClassificationNaiveBayes onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${HOEFFDING_TREE}`]: makeExpander('Hoeffding Tree classifier', classificationHoeffdingTree,
          <ClassificationHoeffdingTree onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${ADAPTIVE_TREE}`]: makeExpander('Adaptive Tree classifier', classificationAdaptiveTree,
          <ClassificationAdaptiveTree onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${SGDCLASSIFIER}`]: makeExpander('SGD Classifier', classificationSGDClassifier,
          <ClassificationSGDClassifier onChange={props.onChange} {...props}/>),
      [`${CLASSIFICATION}.${PERCEPTRON}`]: makeExpander('Perceptron', classificationPerceptron,
          <ClassificationPerceptronClassifier onChange={props.onChange} {...props}/>),
  };

  const regressionConfigMap = {
    [`${REGRESSION}.${LINEAR}`]: makeExpander('Linear regressor', regressionLinearUrl,
        <RegressionLinear onChange={props.onChange} {...props}/>),
    [`${REGRESSION}.${RANDOM_FOREST}`]: makeExpander('Random forest regressor', regressionRandomForestUrl,
        <RegressionRandomForest onChange={props.onChange} {...props}/>),
    [`${REGRESSION}.${LASSO}`]: makeExpander('Lasso regressor', regressionLassoUrl,
      <RegressionLasso onChange={props.onChange} {...props}/>),
    [`${REGRESSION}.${XGBOOST}`]: makeExpander('XGBoost tree boost regressor', regressionXGBoostUrl,
      <RegressionXGBoost onChange={props.onChange} {...props}/>),
    [`${REGRESSION}.${NN}`]: makeExpander('NN regressor', regressionNNUrl,
        <RegressionNN onChange={props.onChange} {...props}/>),
  };


    const timeSeriesPredictionConfigMap = {
      [`${TIME_SERIES_PREDICTION}.${RNN}`]: makeExpander('RNN time series predictor', timeSeriesPredictionRNNUrl,
            <TimeSeriesPredictionRNN onChange={props.onChange} {...props}/>),
    };


  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;
      return confMap[configName];
    }
  );

  const hyperOpt = () => (makeExpander('Hyperparameter Optimization', HyperOptUrl,
    <HyperOpt onChange={props.onChange} predictionMethod={props.predictionMethod} {...props}/>));

  const addColumns = () => (makeExpander('Temporal and intercase features', '',
      <AddColumns onChange={props.onChange} label={props.labelling} {...props}/>));

  const kmeans = () => {
    if (props.clusterings.includes(KMEANS)) {
      return [makeExpander('KMeans', KMeansUrl,
        <KMeans onChange={props.onChange} {...props}/>)];
    }
    return [];
  };

  const label = makeExpander('Labeling', '',
      <Labelling onChange={props.onChange} label={props.labelling}
                 predictionMethod={props.predictionMethod} {...props}/>, true);


  const incremental = () => {
    if (props.classification.concat(props.regression)
        .some(element => INCREMENTAL_CLASSIFIERS.includes(element))) {
      return [makeExpander('Increments', '',
          <Incremental onChange={props.onChange}
                       classificationModels={props.classificationModels}
                       regressionModels={props.regressionModels}
                       timeSeriesPredictionModels={props.timeSeriesPredictionModels}
                       {...props}/>)];
    } else {
      return [];
    }
  };

  const configs = () => {
    if (props.predictionMethod === REGRESSION) {
      return [addColumns(), ...kmeans(), hyperOpt(), incremental(),
          ...configMapper(props.regression, regressionConfigMap)];
    } else if (props.predictionMethod === CLASSIFICATION) {
      return [addColumns(), ...kmeans(), hyperOpt(), incremental(),
          ...configMapper(props.classification, classificationConfigMap)];
    } else if (props.predictionMethod === TIME_SERIES_PREDICTION) {
        return [...kmeans(), incremental(),
            ...configMapper(props.timeSeriesPrediction, timeSeriesPredictionConfigMap)];
    } else {
      return [];
    }
  };

    if (props.predictionMethod === TIME_SERIES_PREDICTION) {
        return <ExpansionList>{[...configs()]}</ExpansionList>;
    } else {
        return <ExpansionList>{[label, ...configs()]}</ExpansionList>;
    }
};

AdvancedConfiguration.propTypes = {
    classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    clusterings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
    labelling: PropTypes.shape(labelPropType).isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION, LABELLING]).isRequired,
    classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
    regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
    timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired,
    traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired,
    onModelChange: PropTypes.func.isRequired
};
export default AdvancedConfiguration;
