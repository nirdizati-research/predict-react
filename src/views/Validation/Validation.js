import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfigTableCard from '../../components/validation/ConfigTableCard';
import {REGRESSION} from '../../reference';
import {jobsRequested} from '../../actions/JobActions';
import ValidationHeaderCard from '../../components/validation/ValidationHeaderCard';
import ResultWrapper from '../../components/validation/ResultWrapper';
import {jobPropType} from '../../helpers';
import {splitsToString} from '../../util/dataReducers';

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
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) {
      this.props.onRequestJobs();
    }
  }

  onChangeType(type) {
    this.setState({predictionMethod: type});
  }

  render() {
    // Only unique splits for selector
    const splitLabels = splitsToString(filterUnique(this.props.jobs.reduce(reducer, [])));

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <ValidationHeaderCard splitLabels={splitLabels} fetchState={this.props.fetchState}
                                visibleLogName={this.state.log} methodChange={this.onChangeType.bind(this)}
                                splitChange={this.onChangeLog.bind(this)}/>
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

const reducer = (acc, job) => {
  acc.push(job.split);
  return acc;
};
const filterUnique = (splits) => {
  const resArr = [];
  splits.filter(function (item) {
    const i = resArr.findIndex((split) => split.id === item.id);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
  return resArr;
};

Validation.propTypes = {
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs.filter((job) => job.status === 'completed'),
  fetchState: state.jobs.fetchState
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
