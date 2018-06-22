import React from 'react';
import {CLASSIFICATION, KMEANS, LABELLING, REGRESSION} from '../../reference';
import PropTypes from 'prop-types';
import ClassificationKnn from './ClassificationKnn';
import ClassificationDecisionTree from './ClassificationDecisionTree';
import {ExpansionList} from 'react-md';
import GenericConfiguration from './GenericConfiguration';
import ClassificationRandomForest from './ClassificationRandomForest';
import RegressionRandomForest from './RegressionRandomForest';
import RegressionLasso from './RegressionLasso';
import RegressionLinear from './RegressionLinear';
import HyperOpt from './HyperOpt';
import {labelPropType, traceAttributeShape} from '../../propTypes';
import Labelling from './Labelling';
import AddColumns from './AddColumns';
import KMeans from './KMeans';
import RegressionXGBoost from './RegressionXGBoost';
import ClassificationXGBoost from './ClassificationXGBoost';

const knnUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html';
const decisionTreeUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html';
const classRandomForest =
  'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html';

const regressorRF = 'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html';
const regressorLasso = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.html';
const regressorLinear = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html';
const regressorXGboost = 'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBRegressor';
const classificationXGboost = 'https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBClassifier';
const kmeansUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html';
const hyperUrl = 'http://hyperopt.github.io/hyperopt/';
const AdvancedConfiguration = (props) => {
  const makeExpander = (panelLabel, url, component, defaultExpanded) => {
    return <GenericConfiguration key={panelLabel} panelLabel={panelLabel} defaultExpanded={defaultExpanded}
                                 documentationUrl={url}>{component}</GenericConfiguration>;
  };


  const classConfigMap = {
    'classification.knn': makeExpander('K-Neighbors classifier', knnUrl, <ClassificationKnn
      onChange={props.onChange}/>),
    'classification.decisionTree': makeExpander('Decision tree classifier', decisionTreeUrl,
      <ClassificationDecisionTree onChange={props.onChange} {...props}/>),
    'classification.randomForest': makeExpander('Random forest classifier', classRandomForest,
      <ClassificationRandomForest onChange={props.onChange} {...props}/>),
    'classification.xgboost': makeExpander('XGBoost classifier', classificationXGboost,
      <ClassificationXGBoost onChange={props.onChange} {...props}/>)
  };

  const regressionConfigMap = {
    'regression.lasso': makeExpander('Lasso regressor', regressorLasso,
      <RegressionLasso onChange={props.onChange} {...props}/>),
    'regression.linear': makeExpander('Linear regressor', regressorLinear,
      <RegressionLinear onChange={props.onChange} {...props}/>),
    'regression.randomForest': makeExpander('Random forest regressor', regressorRF,
      <RegressionRandomForest onChange={props.onChange} {...props}/>),
    'regression.xgboost': makeExpander('XGBoost tree boost regressor', regressorXGboost,
      <RegressionXGBoost onChange={props.onChange} {...props}/>)
  };


  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;

      return confMap[configName];
    }
  );

  const hyperOpt = () => (makeExpander('Hyperparameter Optimization', hyperUrl,
    <HyperOpt onChange={props.onChange} predictionMethod={props.predictionMethod} {...props}/>));

  const addColumns = () => (makeExpander('Temporal and intercase features', '',
    <AddColumns onChange={props.onChange} label={props.label} {...props}/>));

  const kmeans = () => {
    if (props.clusterings.includes(KMEANS)) {
      return [makeExpander('KMeans', kmeansUrl,
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
