import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {submitReplay} from '../../actions/RuntimeActions';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import LogSelector from '../../components/prediction/LogSelector';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import ModelSelector from '../../components/prediction/ModelSelector';
import ReactGA from 'react-ga';
import {REPLAY_JOB_CHANGED, jobsRequested, REPLAY_SPLIT_CHANGED} from '../../actions/JobActions';
import {splitsRequested} from '../../actions/SplitActions';
import ResultTable from '../../components/prediction/ResultTable';

const compare = (a, b) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

class Runtime extends Component {
    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
    }

    onChangeJob(jobId) {
        this.props.onJobChange(jobId);
    }

    requestJobsRun() {
    this.props.onRequestJobs();
    }

    componentDidMount() {
        if (this.props.jobs.length === 0) {
            this.props.onRequestSplitList();
            this.props.onRequestJobs();
        }
        ReactGA.initialize('UA-143444044-1');
        ReactGA.pageview(window.location.hash);
    }

    onReset() {
        window.location.reload();
    }

    filterJobRun() {
        return this.props.jobs.filter((job) =>
            (job.type === 'replay_predict' && job.config.split.id === this.props.splitId));
    }

     Submit() {
        if (this.props.jobId > 0) {
            const payload = {
                splitId: this.props.splitId,
                jobId: this.props.jobId,
            };
            this.props.onSubmitReplay(payload);
        }
     }

    render() {
    // Only unique splits for selector
        const filteredJobsRun = this.filterJobRun();
        let jobs = this.props.jobs.filter(job => (job.type === 'prediction' && job.status === 'completed' &&
            (job.config.predictive_model.model_path !== '' || job.config.predictive_model.model_path != null)));

        return (
          <div className="md-grid">
            <div className="md-cell md-cell--12">
              <LogSelector splitLabels={this.props.splitLabels} fetchState={this.props.logfetchState}
                                     splitChange={this.onChangeSplit.bind(this)} splitId={this.props.splitId}
                                     maxPLength={this.props.maxPrefixLength}/>
            </div>
            <div className="md-cell md-cell--12">
              <ModelSelector jobChange={this.onChangeJob.bind(this)} onSubmit={this.Submit.bind(this)}
                             onReset={this.onReset} jobs={jobs}
                             jobId={this.props.jobId}/>
            </div>
            <div className="md-cell md-cell--12">
                <ResultTable jobs={filteredJobsRun.sort(compare)} onRequestJobs={this.requestJobsRun.bind(this)}/>
            </div>
        </div>
);
    }
}

Runtime.propTypes = {
    splitLabels: selectLabelProptype,
    logfetchState: fetchStatePropType,
    modfetchState: fetchStatePropType,
    onRequestJobs: PropTypes.func.isRequired,
    onJobChange: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onSubmitReplay: PropTypes.func.isRequired,
    onRequestSplitList: PropTypes.func.isRequired,
    jobId: PropTypes.number.isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    splitId: PropTypes.number.isRequired,
    changed: PropTypes.number.isRequired,
    maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
    jobId: state.models.jobSelected,
    splitId: state.jobs.replaySplitId,
    modfetchState: state.models.fetchState,
    logfetchState: state.logs.fetchState,
    changed: state.traces.changed,
    maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
    onRequestJobs: () => dispatch(jobsRequested()),
    onRequestSplitList: () => dispatch(splitsRequested()),
    onJobChange: (jobId) => dispatch({type: REPLAY_JOB_CHANGED, jobId}),
    onSplitChange: (splitId) => dispatch({type: REPLAY_SPLIT_CHANGED, splitId}),
    onSubmitReplay: (payload) => dispatch(submitReplay({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
