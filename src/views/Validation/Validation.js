import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changeVisibleLog, logListRequested} from '../../actions/LogActions';

class Validation extends Component {

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
        </div>
      </div>
    );
  }
}

Validation.propTypes = {
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.logs.logs.filter((log) => log.visible)[0],
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.logs.fetchState
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: true})),
  onChangeVisible: (logName) => dispatch(changeVisibleLog({logName, requestInfo: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
