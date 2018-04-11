import React from 'react';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import PropTypes from 'prop-types';
import ClassificationKnn from './ClassificationKnn';
import ClassificationDecisionTree from './ClassificationDecisionTree';


const AdvancedConfiguration = (props) => {
  const classConfigMap = {
    'classification.knn': <ClassificationKnn key='knn' onChange={props.onChange} predictionMethod={CLASSIFICATION}/>,
    'classification.decisionTree': <ClassificationDecisionTree onChange={props.onChange}
                                                               predictionMethod={CLASSIFICATION}/>
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
      return configMapper(props.regression, regressionConfigMap);
    } else {
      return configMapper(props.classification, classConfigMap);
    }
  };

  return <div className="md-grid md-grid--no-spacing">
    {configs()}
  </div>;
};

AdvancedConfiguration.propTypes = {
  classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired
};
export default AdvancedConfiguration;
