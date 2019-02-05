import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MODEL_CHANGED, modelsRequested} from '../../actions/ModelActions';
import {LOG_CHANGED, logListRequested} from '../../actions/LogActions';
import {jobsRequested} from '../../actions/JobActions';
import {JOB_RUN_CHANGED, submitPrediction} from '../../actions/RuntimeActions';
import LogSelector from '../../components/prediction/LogSelector';
import ResultTable from '../../components/prediction/ResultTable';
import {fetchStatePropType, jobRunPropType, logsStore, modelPropType} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';
import {splitsRequested} from '../../actions/SplitActions';
import {mapJobs} from '../../util/unNormalize';
import {CardText} from 'react-md/lib/Cards/index';
import ModelSelector from '../../components/prediction/ModelSelector';
import {Card} from 'react-md';

class Prediction extends Component {
  onChangeLog(logId) {
    const log = this.props.logs.byId[logId];
    const pLength = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, pLength);
    this.props.onChangeJRun(logId);
  }

  onModelChange({method}, modelId) {
    this.props.onModelChange({method}, modelId);
  }

  componentDidMount() {
    if (this.props.models.length === 0) {
      this.props.onRequestModels();
      this.props.onRequestSplitList();
      this.props.onRequestLogList();
      this.props.onRequestJobs();
    }
  }

  requestJobsRun() {
    this.props.onRequestJobs();
  }

  onReset() {
    window.location.reload();
  }

  filterJobRun() {
    return this.props.jobsrun.filter((job) => (job.config.log_id === this.props.logId) &&
      ((job.config.model_id === this.props.regModelId) ||
          (job.config.model_id === this.props.classModelId) || (job.config.model_id === this.props.timeSeriesPredModelId)));
  }

  Submit() {
    const logId = this.props.logId;
    const regId = this.props.regModelId;
    const classId = this.props.classModelId;
      const timeSeriesPredId = this.props.timeSeriesPredModelId;
      const payload = logId + '&' + regId + '&' + classId + '&' + timeSeriesPredId;
    this.props.onSubmitPrediction(payload);
    this.props.onRequestJobs();
  }

  render() {
    // Only unique splits for selector
    const filteredJobsRun = this.filterJobRun();
    const regModelsLabel = modelsToString(this.props.regressionModels);
    const classModelsLabel = modelsToString(this.props.classificationModels);
    const timeSeriesPredModelsLabel = modelsToString(this.props.timeSeriesPredictionModels);

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogSelector logs={this.props.logs} fetchState={this.props.logfetchState}
                       logChange={this.onChangeLog.bind(this)} logId={this.props.logId}
                       maxPLength={this.props.maxPrefixLength}/>
        </div>
        <div className="md-cell md-cell--12">
          <ModelSelector modelChange={this.onModelChange.bind(this)} onSubmit={this.Submit.bind(this)}
                         onReset={this.onReset} classModelsLabel={classModelsLabel} regModelsLabel={regModelsLabel}
                         timeSeriesPredModelsLabel={timeSeriesPredModelsLabel} classModelId={this.props.classModelId}
                         regModelId={this.props.regModelId} timeSeriesPredModelId={this.props.timeSeriesPredModelId}/>
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
  logfetchState: fetchStatePropType,
  modfetchState: fetchStatePropType,
  onChangeJRun: PropTypes.func.isRequired,
  onRequestModels: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitPrediction: PropTypes.func.isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: logsStore,
  jobsrun: PropTypes.arrayOf(jobRunPropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
    timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  classModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
  maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs,
  jobsrun: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.runIds),
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
    timeSeriesPredictionModels: state.models.timeSeriesPredictionModels,
  regModelId: state.models.regselected,
  classModelId: state.models.classelected,
    timeSeriesPredModelId: state.models.timeseriespredselected,
  logId: state.models.logId,
  modfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
  maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onModelChange: ({method}, modelId) => dispatch({type: MODEL_CHANGED, method, modelId}),
  onLogChange: (logId, pLength) => dispatch({type: LOG_CHANGED, logId, pLength}),
  onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
  onSubmitPrediction: (payload) => dispatch(submitPrediction({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
