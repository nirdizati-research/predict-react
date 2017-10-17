import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';
import LogListCard from '../../components/LogListCard';
import ConfigTableCard from '../../components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {jobResultsRequested} from '../../actions/JobActions';
import ResultTableCard from '../../components/validation/ResultTableCard';
import {regColumns} from '../../components/validation/ColumnHelper';

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

  getDataTable() {
    const jobs = this.props.jobs.filter((job) => job.type === this.state.predictionMethod);
    const data = jobs.map((job) => [job.uuid, job.result.mae, job.result.rmse, job.run, job.result.rscore]);
    switch (this.state.predictionMethod) {
      case REGRESSION:
        return <ResultTableCard data={data} columns={regColumns} cardTitle="Regression data"/>;
      case CLASSIFICATION:
        return null;
      case NEXT_ACTIVITY:
        return null;
    }
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logNames={this.props.logNames} fetchState={this.props.fetchState}
                       visibleLogName={this.state.log}
                       selectChange={this.onChangeLog.bind(this)}/>
        </div>
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={this.props.jobs}
                           selectChange={this.onChangeType.bind(this)}/>
        </div>
        <div className="md-cell md-cell--12">
          {this.getDataTable()}
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
  onRequestJobResults: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    prefix: PropTypes.number.isRequired,
    rule: PropTypes.string,
    threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired,
    result: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      mae: PropTypes.number,
      rmse: PropTypes.number,
      rscore: PropTypes.number,
      fmeasure: PropTypes.number,
      acc: PropTypes.number,
      auc: PropTypes.number,
    }).isRequired
  })).isRequired,
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
