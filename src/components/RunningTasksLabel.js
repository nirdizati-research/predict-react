import React from 'react';
import PropTypes from 'prop-types';

const RunningTasksLabel = (props) => {
  if (props.haveRunning) {
    return <span className="md-text-uppercase">{props.runningCount} / {props.totalCount} tasks completed</span>;
  }
  return null;
};

RunningTasksLabel.propTypes = {
  totalCount: PropTypes.number.isRequired,
  runningCount: PropTypes.number.isRequired,
  haveRunning: PropTypes.bool.isRequired
};
export default RunningTasksLabel;
