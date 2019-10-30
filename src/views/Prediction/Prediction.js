import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {PREDICTION_JOB_CHANGED, PREDICTION_SPLIT_CHANGED, jobsRequested} from '../../actions/JobActions';
import {JOB_RUN_CHANGED, submitPrediction} from '../../actions/RuntimeActions';
import LogSelector from '../../components/prediction/LogSelector';
import ResultTable from '../../components/prediction/ResultTable';
import {
    fetchStatePropType,
    jobPropType,
    selectLabelProptype
} from '../../propTypes';
import {splitsRequested} from '../../actions/SplitActions';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {CardText} from 'react-md/lib/Cards/index';
import ModelSelector from '../../components/prediction/ModelSelector';
import {Card} from 'react-md';
import ReactGA from 'react-ga';
import {getLogProperties} from '../../util/splitStuff';

class Prediction extends Component {
    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
    }

    onClickCheckbox(id) {
        let incJobs = this.props.jobId;
        let index = incJobs.indexOf(id);
        if (index !== -1) {
            incJobs.splice(index, 1);
            this.setState({...this.state, jobSelected: incJobs});
        } else {
            this.props.jobId.push(id);
        }
    }

    componentDidMount() {
        if (this.props.jobs.length === 0) {
            this.props.onRequestSplitList();
            this.props.onRequestJobs();
        }
        ReactGA.initialize('UA-143444044-1');
        ReactGA.pageview(window.location.hash);
    }

    requestJobsRun() {
        this.props.onRequestJobs();
    }

    onReset() {
        window.location.reload();
    }

    filterJobRun() {
        return this.props.jobs.filter((job) =>
            (job.config.split.id === this.props.splitId) && job.type === 'runtime');
    }

     Submit() {
        if (this.props.jobId !== []) {
            this.props.jobId.forEach((item) =>{
                this.submitRequest(item);
            });
        }
     }

     submitRequest(item) {
        const payload = {
                splitId: this.props.splitId,
                jobId: item,
            };
            this.props.onSubmitPrediction(payload);
     }

    render() {
        // Only unique splits for selector
        const filteredJobsRun = this.filterJobRun();
        let jobs = this.props.jobs.filter(job => (job.type === 'prediction' && job.status === 'completed'));

        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <LogSelector splitLabels={this.props.splitLabels} fetchState={this.props.logfetchState}
                                 splitChange={this.onChangeSplit.bind(this)} splitId={this.props.splitId}
                                 maxPLength={this.props.maxPrefixLength}/>
                </div>
                <div className="md-cell md-cell--12">
                    <ModelSelector onClickCheckbox={this.onClickCheckbox.bind(this)} onSubmit={this.Submit.bind(this)}
                             onReset={this.onReset} jobs={jobs}/>
                </div>
                <div className="md-cell md-cell--12">
                    <Card>
                        <CardText>
                            <ResultTable jobs={filteredJobsRun} onRequestJobs={this.requestJobsRun.bind(this)}/>
                        </CardText>
                    </Card></div>
            </div>
        );
    }
}

Prediction.propTypes = {
    splitLabels: selectLabelProptype,
    logfetchState: fetchStatePropType,
    modfetchState: fetchStatePropType,
    onChangeJRun: PropTypes.func.isRequired,
    onRequestModels: PropTypes.func.isRequired,
    onRequestSplitList: PropTypes.func.isRequired,
    onJobChange: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onSubmitPrediction: PropTypes.func.isRequired,
    onRequestJobs: PropTypes.func.isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    getLogProperties: PropTypes.func.isRequired,
    jobId: PropTypes.arrayOf(PropTypes.number).isRequired,
    splitId: PropTypes.number.isRequired,
    maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    getLogProperties: getLogProperties(state.splits.byId, state.logs.byId),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
    splitId: state.jobs.predictionSplitId,
    jobsrun: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.runIds),
    jobId: state.jobs.predictionJobId,
    modfetchState: state.models.fetchState,
    logfetchState: state.logs.fetchState,
    maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
    onRequestJobs: () => dispatch(jobsRequested()),
    onRequestSplitList: () => dispatch(splitsRequested()),
    onJobChange: (jobId) => dispatch({type: PREDICTION_JOB_CHANGED, jobId}),
    onSplitChange: (splitId) => dispatch({type: PREDICTION_SPLIT_CHANGED, splitId}),
    onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
    onSubmitPrediction: (payload) => dispatch(submitPrediction({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
