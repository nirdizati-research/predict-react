import React from 'react';
import PropTypes from 'prop-types';

const RunningTasksLabel = (props) => {
    if (props.haveRunning) {
        return <div className="md-btn--text" style={{display: 'inline-block'}}>
            <span className="md-text-uppercase">{props.completedCount} / {props.totalCount} tasks completed</span>
        </div>;
    }
    return null;
};

RunningTasksLabel.propTypes = {
    totalCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    haveRunning: PropTypes.bool.isRequired
};
export default RunningTasksLabel;
