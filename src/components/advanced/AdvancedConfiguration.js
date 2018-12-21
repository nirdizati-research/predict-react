import React from 'react';
import {CLASSIFICATION, KMEANS, LABELLING, REGRESSION} from '../../reference';
import PropTypes from 'prop-types';
import {ExpansionList} from 'react-md';
import GenericConfiguration from './GenericConfiguration';
import {labelPropType, traceAttributeShape} from '../../propTypes';


import KMeans from './KMeans';
import HyperOpt from './HyperOpt';
import Labelling from './Labelling';
import AddColumns from './AddColumns';

import ClassificationKnn from './ClassificationKnn';
import ClassificationDecisionTree from './ClassificationDecisionTree';
import ClassificationRandomForest from './ClassificationRandomForest';
import ClassificationXGBoost from './ClassificationXGBoost';
import ClassificationNN from './ClassificationNN';

import RegressionLinear from './RegressionLinear';
import RegressionRandomForest from './RegressionRandomForest';
import RegressionLasso from './RegressionLasso';
import RegressionXGBoost from './RegressionXGBoost';
import RegressionNN from './RegressionNN';


import RegressionRNN from './RegressionRNN';


const KMeansUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html';
const HyperOptUrl = 'http://hyperopt.github.io/hyperopt/';

const classificationKnnUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html';
const classificationDecisionTreeUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html';
const classificationRandomForestUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html';
const classificationXGBoostUrl = 'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBClassifier';
const classificationNNUrl = 'https://keras.io/';  // TODO: put meaningful link

const regressionLinearUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html';
const regressionRandomForestUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html';
const regressionLassoUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.html';
const regressionXGBoostUrl = 'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBRegressor';
const regressionNNUrl = 'https://keras.io/';  // TODO: put meaningful link


// const regressionRNNUrl = 'https://keras.io/';  // TODO: put meaningful link


const AdvancedConfiguration = (props) => {
  const makeExpander = (panelLabel, url, component, defaultExpanded) => {
    return <GenericConfiguration key={panelLabel} panelLabel={panelLabel} defaultExpanded={defaultExpanded}
                                 documentationUrl={url}>{component}</GenericConfiguration>;
  };


  const classConfigMap = {
    'classification.knn': makeExpander('K-Neighbors classifier', classificationKnnUrl, <ClassificationKnn
      onChange={props.onChange}/>),
    'classification.decisionTree': makeExpander('Decision tree classifier', classificationDecisionTreeUrl,
      <ClassificationDecisionTree onChange={props.onChange} {...props}/>),
    'classification.randomForest': makeExpander('Random forest classifier', classificationRandomForestUrl,
      <ClassificationRandomForest onChange={props.onChange} {...props}/>),
    'classification.xgboost': makeExpander('XGBoost classifier', classificationXGBoostUrl,
      <ClassificationXGBoost onChange={props.onChange} {...props}/>),
    'classification.nn': makeExpander('NN classifier', classificationNNUrl,
      <ClassificationNN onChange={props.onChange} {...props}/>)
  };

  const regressionConfigMap = {
    'regression.linear': makeExpander('Linear regressor', regressionLinearUrl,
        <RegressionLinear onChange={props.onChange} {...props}/>),
    'regression.randomForest': makeExpander('Random forest regressor', regressionRandomForestUrl,
        <RegressionRandomForest onChange={props.onChange} {...props}/>),
    'regression.lasso': makeExpander('Lasso regressor', regressionLassoUrl,
      <RegressionLasso onChange={props.onChange} {...props}/>),
    'regression.xgboost': makeExpander('XGBoost tree boost regressor', regressionXGBoostUrl,
      <RegressionXGBoost onChange={props.onChange} {...props}/>),
    'regression.nn': makeExpander('NN regressor', regressionNNUrl,
        <RegressionNN onChange={props.onChange} {...props}/>)
    // 'regression.rnn': makeExpander('RNN regressor', regressorRNN,
    //     <RegressionRNN onChange={props.onChange} {...props}/>),
  };


  // const regressionRNNConfigMap = {
  //   // 'regression.rnn': makeExpander('RNN regressor', regressorRNN,
  //   //     <RegressionRNN onChange={props.onChange} {...props}/>)
  // };


  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;

      return confMap[configName];
    }
  );

  const hyperOpt = () => (makeExpander('Hyperparameter Optimization', HyperOptUrl,
    <HyperOpt onChange={props.onChange} predictionMethod={props.predictionMethod} {...props}/>));

  const addColumns = () => (makeExpander('Temporal and intercase features', '',
    <AddColumns onChange={props.onChange} label={props.label} {...props}/>));

  const kmeans = () => {
    if (props.clusterings.includes(KMEANS)) {
      return [makeExpander('KMeans', KMeansUrl,
        <KMeans onChange={props.onChange} {...props}/>)];
    }
    return [];
  };

  const label = makeExpander('Labeling', '',
    <Labelling onChange={props.onChange} label={props.label}
               predictionMethod={props.predictionMethod} {...props}/>, true);


  const configs = () => {
    if (props.predictionMethod === REGRESSION) {
      return [addColumns(), ...kmeans(), hyperOpt(), ...configMapper(props.regression, regressionConfigMap)];
    } else if (props.predictionMethod === CLASSIFICATION) {
      return [addColumns(), ...kmeans(), hyperOpt(), ...configMapper(props.classification, classConfigMap)];
    } else {
      return [];
    }
  };

  return <ExpansionList>{[label, ...configs()]}</ExpansionList>;
};

AdvancedConfiguration.propTypes = {
  classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  clusterings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.shape(labelPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};
export default AdvancedConfiguration;
