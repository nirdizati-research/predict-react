import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';
import ConfigTableCard from '../../components/validation/ConfigTableCard';
import {REGRESSION} from '../../reference';
import {jobResultsRequested} from '../../actions/JobActions';
import ValidationHeaderCard from '../../components/validation/ValidationHeaderCard';
import ResultWrapper from '../../components/validation/ResultWrapper';
import {jobPropType} from '../../helpers';

class Validation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predictionMethod: REGRESSION,
      log: ''
    };
  }

  onChangeLog(logName) {
    this.setState({log: logName});
    this.props.onRequestJobResults(logName);
  }

  componentDidMount() {
    if (this.props.logNames.length === 0) {
      return this.props.onRequestLogList(true);
    } else {
      return this.props.onRequestLogList(false);
    }
  }

  onChangeType(type) {
    this.setState({predictionMethod: type});
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <ValidationHeaderCard logNames={this.props.logNames} fetchState={this.props.fetchState}
                                visibleLogName={this.state.log} methodChange={this.onChangeType.bind(this)}
                                logChange={this.onChangeLog.bind(this)}/>
        </div>
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={this.props.jobs.filter((job) => job.type === this.state.predictionMethod)}
                           predictionMethod={this.state.predictionMethod}/>
        </div>
        <ResultWrapper jobs={this.props.jobs.filter((job) => job.type === this.state.predictionMethod)}
                       predictionMethod={this.state.predictionMethod}/>
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
  onRequestJobResults: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs.filter((job) => job.status === 'completed'),
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.jobs.fetchState
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRequestJobResults: (logName) => dispatch(jobResultsRequested(logName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
