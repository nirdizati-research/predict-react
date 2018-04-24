import React from 'react';
import {CLASSIFICATION, REGRESSION} from '../../reference';
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
import {labelPropType, traceAttributeShape} from '../../helpers';
import Labelling from './Labelling';

const knnUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html';
const decisionTreeUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html';
const classRandomForest =
  'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html';

const regressorRF = 'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html';
const regressorLasso = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.html';
const regressorLinear = 'http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html';
const hyperUrl = 'http://hyperopt.github.io/hyperopt/';
const AdvancedConfiguration = (props) => {
  const makeExpander = (panelLabel, url, component, defaultExpanded) => {
    return <GenericConfiguration key={panelLabel} panelLabel={panelLabel} defaultExpanded={defaultExpanded}
                                 documentationUrl={url}>{component}</GenericConfiguration>;
  };


  const classConfigMap = {
    'classification.knn': makeExpander('KNeighborsClassifier', knnUrl, <ClassificationKnn
      onChange={props.onChange}
      predictionMethod={CLASSIFICATION}/>),
    'classification.decisionTree': makeExpander('DecisionTreeClassifier', decisionTreeUrl,
      <ClassificationDecisionTree onChange={props.onChange}
                                  predictionMethod={CLASSIFICATION} {...props}/>),
    'classification.randomForest': makeExpander('RandomForestClassifier', classRandomForest,
      <ClassificationRandomForest onChange={props.onChange}
                                  predictionMethod={CLASSIFICATION} {...props}/>)
  };

  const regressionConfigMap = {
    'regression.lasso': makeExpander('Lasso', regressorLasso,
      <RegressionLasso onChange={props.onChange} {...props}/>),
    'regression.linear': makeExpander('LinearRegression', regressorLinear,
      <RegressionLinear onChange={props.onChange} {...props}/>),
    'regression.randomForest': makeExpander('RandomForestRegressor', regressorRF,
      <RegressionRandomForest onChange={props.onChange} {...props}/>)
  };


  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;

      return confMap[configName];
    }
  );

  const hyperOpt = makeExpander('Hyperparameter Optimization', hyperUrl,
    <HyperOpt onChange={props.onChange} predictionMethod={props.predictionMethod} {...props}/>);


  const label = makeExpander('Labelling', '',
    <Labelling onChange={props.onChange} label={props.label} {...props}/>, true);


  const configs = () => {
    if (props.predictionMethod === REGRESSION) {
      return configMapper(props.regression, regressionConfigMap);
    } else {
      return configMapper(props.classification, classConfigMap);
    }
  };

  return <ExpansionList>{[label, hyperOpt, ...configs()]}</ExpansionList>;
};

AdvancedConfiguration.propTypes = {
  classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.shape(labelPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION]).isRequired,
  traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};
export default AdvancedConfiguration;
