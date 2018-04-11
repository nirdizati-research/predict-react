import React from 'react';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import PropTypes from 'prop-types';
import ClassificationKnn from './ClassificationKnn';


const AdvancedConfiguration = (props) => {
  const classKnn = () => <ClassificationKnn key='knn' onChange={props.onChange} predictionMethod={CLASSIFICATION}/>;

  const classConfigMap = {
    'classification.knn': classKnn
  };

  const regressionConfigMap = {
    'regression.knn': classKnn
  };

  const configMapper = (methods, confMap) => methods.map((method) => {
      const configName = `${props.predictionMethod}.${method}`;

      return confMap[configName]();
    }
  );

  const configs = () => {
    if (props.predictionMethod === REGRESSION) {
      return configMapper(props.regression, regressionConfigMap);
    } else {
      return configMapper(props.classification, classConfigMap);
    }
  };

  return <div className="md-cell md-cell--12">
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
