import React from 'react';
import JSONTree from 'react-json-tree';
import PropTypes from 'prop-types';

// Can be used to costumize appearance. Empty at the moment
const getItemString = (type, data, itemType, itemString) => ('');

const JsonHolder = (props) => {
  return <JSONTree data={props.data} shouldExpandNode={() => false} theme="bright" getItemString={getItemString}/>;
};

JsonHolder.propTypes = {
  data: PropTypes.any.isRequired
};

export default JsonHolder;
