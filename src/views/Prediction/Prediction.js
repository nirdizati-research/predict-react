import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {PREDICTION_MODEL_CHANGED} from '../../actions/ModelActions';
import {PREDICTION_SPLIT_CHANGED, jobsRequested} from '../../actions/JobActions';
import {JOB_RUN_CHANGED, submitPrediction} from '../../actions/RuntimeActions';
import LogSelector from '../../components/prediction/LogSelector';
import ResultTable from '../../components/prediction/ResultTable';
import {
    fetchStatePropType,
    jobPropType,
    jobRunPropType,
    selectLabelProptype
} from '../../propTypes';
import {splitsRequested} from '../../actions/SplitActions';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {CardText} from 'react-md/lib/Cards/index';
import ModelSelector from '../../components/prediction/ModelSelector';
import {Card} from 'react-md';
import ReactGA from 'react-ga';
import {getLogProperties} from "../../util/splitStuff";
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from "../../reference";

class Prediction extends Component {
    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
    }

    onModelChange({method}, modelId) {
        this.props.onModelChange({method}, modelId);
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
        if (this.props.regJobId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.regJobId,
            }
            this.props.onSubmitPrediction(payload);
        }
        if (this.props.classJobId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.classJobId,
            }
            this.props.onSubmitPrediction(payload);
        }
        if (this.props.timeSeriesPredJobId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.timeSeriesPredJobId,
            }
            this.props.onSubmitPrediction(payload);
        }
        this.props.onRequestJobs();
    }

    render() {
        // Only unique splits for selector
        const filteredJobsRun = this.filterJobRun();
        const regJobsLabel = this.props.jobs.filter(job => job.config.predictive_model.predictive_model === REGRESSION && job.status === 'completed' && job.type === 'prediction');
        const classJobsLabel = this.props.jobs.filter(job => job.config.predictive_model.predictive_model === CLASSIFICATION&& job.status === 'completed' && job.type === 'prediction');
        const timeSeriesPredJobsLabel = this.props.jobs.filter(job => job.config.predictive_model.predictive_model === TIME_SERIES_PREDICTION && job.status === 'completed' && job.type === 'prediction');

        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <LogSelector splitLabels={this.props.splitLabels} fetchState={this.props.logfetchState}
                                 splitChange={this.onChangeSplit.bind(this)} logId={this.props.logId}
                                 maxPLength={this.props.maxPrefixLength}/>
                </div>
                <div className="md-cell md-cell--12">
                    <ModelSelector modelChange={this.onModelChange.bind(this)} onSubmit={this.Submit.bind(this)}
                                   onReset={this.onReset} classJobs={classJobsLabel} regJobs={regJobsLabel}
                                   timeSeriesPredJobs={timeSeriesPredJobsLabel} classJobId={this.props.classJobId}
                                   regJobId={this.props.regJobId} timeSeriesPredJobId={this.props.timeSeriesPredJobId}/>
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
    onModelChange: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onSubmitPrediction: PropTypes.func.isRequired,
    onRequestJobs: PropTypes.func.isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    getLogProperties: PropTypes.func.isRequired,
    regJobId: PropTypes.number.isRequired,
    classJobId: PropTypes.number.isRequired,
    timeSeriesPredJobId: PropTypes.number.isRequired,
    regModelId: PropTypes.number.isRequired,
    classModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired,
    splitId: PropTypes.number.isRequired,
    maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    getLogProperties: getLogProperties(state.splits.byId, state.logs.byId),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
    splitId: state.jobs.predictionSplitId,
    jobsrun: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.runIds),
    regJobId: state.jobs.regId,
    classJobId: state.jobs.classId,
    timeSeriesPredJobId: state.jobs.timeSeriesPredId,
    regModelId: state.models.regmodel,
    classModelId: state.models.classmodel,
    timeSeriesPredModelId: state.models.timeseriespredmodel,
    modfetchState: state.models.fetchState,
    logfetchState: state.logs.fetchState,
    maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
    onRequestJobs: () => dispatch(jobsRequested()),
    onRequestSplitList: () => dispatch(splitsRequested()),
    onModelChange: ({method}, modelId) => dispatch({type: PREDICTION_MODEL_CHANGED, method, modelId}),
    onSplitChange: (splitId) => dispatch({type: PREDICTION_SPLIT_CHANGED, splitId}),
    onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
    onSubmitPrediction: (payload) => dispatch(submitPrediction({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
