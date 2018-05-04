import React from 'react';
import JSONTree from 'react-json-tree';
import PropTypes from 'prop-types';

const JsonHolder = (props) => {
  return <JSONTree data={props.data} shouldExpandNode={() => false} theme="bright"/>;
};

JsonHolder.propTypes = {
  data: PropTypes.any.isRequired
};

export default JsonHolder;
