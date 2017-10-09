import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changeVisibleLog, logListRequested} from '../../actions/LogActions';
import LogListCard from '../../components/LogListCard';

class Validation extends Component {
  componentDidMount() {
    if (this.props.logNames.length === 0) {
      return this.props.onRequestLogList(true);
    } else {
      return this.props.onRequestLogList(false);
    }
  }
  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logNames={this.props.logNames} fetchState={this.props.fetchState}
                       visibleLogName={''}
                       selectChange={this.props.onChangeVisible}/>
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
  jobs: state.jobs.jobs.filter((job) => job.name === 'Production.xes'),
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.logs.fetchState
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: true})),
  onChangeVisible: (logName) => dispatch(changeVisibleLog({logName, requestInfo: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
