import React from 'react';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import PropTypes from 'prop-types';
import ClassificationKnn from './ClassificationKnn';
import ClassificationDecisionTree from './ClassificationDecisionTree';
import {ExpansionList} from 'react-md';
import GenericConfiguration from './GenericConfiguration';
import ClassificationRandomForest from './ClassificationRandomForest';

const knnUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html';
const decisionTreeUrl = 'http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html';
const classRandomForest = 'http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html';

const AdvancedConfiguration = (props) => {
  const makeExpander = (panelLabel, url, component) => {
    return <GenericConfiguration key={panelLabel} panelLabel={panelLabel}
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
                                  predictionMethod={CLASSIFICATION} {...props}/>),
    'nextActivity.knn': makeExpander('KNeighborsClassifier', knnUrl, <ClassificationKnn
      onChange={props.onChange}
      predictionMethod={NEXT_ACTIVITY}/>),
    'nextActivity.decisionTree': makeExpander('DecisionTreeClassifier', decisionTreeUrl,
      <ClassificationDecisionTree onChange={props.onChange}
                                  predictionMethod={NEXT_ACTIVITY} {...props}/>),
    'nextActivity.randomForest': makeExpander('RandomForestClassifier', classRandomForest,
      <ClassificationRandomForest onChange={props.onChange}
                                  predictionMethod={NEXT_ACTIVITY} {...props}/>)
  };

  const regressionConfigMap = {
    'regression.knn': null
  };


  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;

      return confMap[configName];
    }
  );

  const configs = () => {
    if (props.predictionMethod === REGRESSION) {
      return [];
      // return configMapper(props.regression, regressionConfigMap);
    } else {
      return configMapper(props.classification, classConfigMap);
    }
  };

  return <ExpansionList>{configs()}</ExpansionList>;
};

AdvancedConfiguration.propTypes = {
  classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired
};
export default AdvancedConfiguration;
