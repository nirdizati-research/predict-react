import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {REPLAY_MODEL_CHANGED} from '../../actions/ModelActions';
import {submitReplay} from '../../actions/RuntimeActions';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import LogSelector from '../../components/prediction/LogSelector';
import {fetchStatePropType, jobPropType, modelPropType, selectLabelProptype} from '../../propTypes';
import ModelSelector from '../../components/prediction/ModelSelector';
import ReactGA from 'react-ga';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from "../../reference";
import {jobsRequested, REPLAY_SPLIT_CHANGED} from "../../actions/JobActions";
import {splitsRequested} from "../../actions/SplitActions";
import ResultTable from '../../components/prediction/ResultTable';

class Runtime extends Component {
    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
    }

    onModelChange({method}, modelId) {
        this.props.onModelChange({method}, modelId);
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

    requestTraces() {
        this.props.onRequestTraces();
    }

    onReset() {
        window.location.reload();
    }

    filterJobRun() {
        return this.props.jobs.filter((job) =>
            (job.type === 'replay_predict' && job.config.split.id === this.props.splitId));
    }

  /*filterTrace() {
    return this.props.traces.filter((trace) => (trace.real_log === this.props.logId));
  }*/

     Submit() {
        if (this.props.regModelId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.regModelId,
            };
            this.props.onSubmitReplay(payload);
        }
        if (this.props.classModelId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.classModelId,
            };
            this.props.onSubmitReplay(payload);
        }
        if (this.props.timeSeriesPredModelId > 0) {
            const payload = {
                splitId : this.props.splitId,
                modelId : this.props.timeSeriesPredModelId,
            };
            this.props.onSubmitReplay(payload);
        }
        this.props.onRequestJobs();
     }

    render() {
    // Only unique splits for selector
        const filteredJobsRun = this.filterJobRun()
        let jobsModel = this.props.jobs.filter(job => (job.type === 'prediction' && job.status === 'completed'));
        const regJobsLabel = jobsModel.filter(job => job.config.predictive_model.predictive_model === REGRESSION );
        const classJobsLabel = jobsModel.filter(job => job.config.predictive_model.predictive_model === CLASSIFICATION);
        const timeSeriesPredJobsLabel = jobsModel.filter(job => job.config.predictive_model.predictive_model === TIME_SERIES_PREDICTION);

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
                                       timeSeriesPredJobs={timeSeriesPredJobsLabel} classModelId={this.props.classModelId}
                                       regModelId={this.props.regModelId} timeSeriesPredModelId={this.props.timeSeriesPredModelId}/>
            </div>
            <div className="md-cell md-cell--12">
                <ResultTable jobs={filteredJobsRun} onRequestJobs={this.requestJobsRun.bind(this)}/>
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
    onModelChange: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onSubmitReplay: PropTypes.func.isRequired,
    onRequestSplitList: PropTypes.func.isRequired,
    models: PropTypes.arrayOf(modelPropType).isRequired,
    regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
    classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
    timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired,
    regModelId: PropTypes.number.isRequired,
    classModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    logId: PropTypes.number.isRequired,
    splitId: PropTypes.number.isRequired,
    changed: PropTypes.number.isRequired,
    maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
    regressionModels: state.models.regressionModels,
    classificationModels: state.models.classificationModels,
    timeSeriesPredictionModels: state.models.timeSeriesPredictionModels,
    regModelId: state.models.regselected,
    classModelId: state.models.classelected,
    timeSeriesPredModelId: state.models.timeseriespredselected,
    splitId: state.jobs.replaySplitId,
    logId: state.models.logId,
    modfetchState: state.models.fetchState,
    logfetchState: state.logs.fetchState,
    changed: state.traces.changed,
    maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
    onRequestJobs: () => dispatch(jobsRequested()),
    onRequestSplitList: () => dispatch(splitsRequested()),
    onModelChange: ({method}, modelId) => dispatch({type: REPLAY_MODEL_CHANGED, method, modelId}),
    onSplitChange: (splitId) => dispatch({type: REPLAY_SPLIT_CHANGED, splitId}),
    onSubmitReplay: (payload) => dispatch(submitReplay({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Runtime);


        /*<div className="md-cell md-cell--12">
          <Card>
            <CardText>
              <h2> Predictive monitoring </h2>
              <RuntimeTable traces={this.filterTrace()} onRequestTraces={this.requestTraces.bind(this)}/>
            </CardText>
          </Card>
          <Card>
            <CardText>
              <h2> Prediction report </h2>
              <InterResultTable traces={this.filterTrace()} onRequestTraces={this.requestTraces.bind(this)}/>
            </CardText>
          </Card>
        </div>*/
