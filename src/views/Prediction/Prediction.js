import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CLAS_MODEL_CHANGED, MODEL_CHANGED, modelsRequested, REG_MODEL_CHANGED} from '../../actions/ModelActions';
import {LOG_CHANGED, logListRequested} from '../../actions/LogActions';
import {jobsRequested} from '../../actions/JobActions';
import {JOB_RUN_CHANGED, submitPrediction} from '../../actions/RuntimeActions';
import PredictionHeaderCard from '../../components/prediction/PredictionHeaderCard';
import LogSelector from '../../components/prediction/LogSelector';
import ResultTable from '../../components/prediction/ResultTable';
import {jobRunPropType, logsStore, modelPropType} from '../../propTypes';
import Button from 'react-md/lib/Buttons/Button';
import {modelsToString} from '../../util/dataReducers';
import {splitsRequested} from '../../actions/SplitActions';
import {mapJobs} from '../../util/unNormalize';
import {Card, CardText} from 'react-md/lib/Cards/index';

class Prediction extends Component {
  onChangeLog(logId) {
    const log = this.props.logs.byId[logId];
    const pLength = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, pLength);
    this.props.onChangeJRun(logId);
  }

  onRegChangeModel(modelId) {
    this.props.onRegModelChange(modelId);
    const classId = this.props.classModelId;
    this.props.onModelChange(modelId, classId);
  }

  onClasChangeModel(modelId) {
    this.props.onClasModelChange(modelId);
    const regId = this.props.regModelId;
    this.props.onModelChange(regId, modelId);
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
        (job.config.model_id === this.props.classModelId)));
  }

  Submit() {
    const logId = this.props.logId;
    const regId = this.props.regModelId;
    const classId = this.props.classModelId;
    const payload = logId + '&' + regId + '&' + classId;
    this.props.onSubmitPrediction(payload);
    this.props.onRequestJobs();
  }

  render() {
    // Only unique splits for selector
    const filteredJobsRun = this.filterJobRun();
    const regModelsLabel = modelsToString(this.props.regressionModels);
    const clasModelsLabel = modelsToString(this.props.classificationModels);

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogSelector logs={this.props.logs} fetchState={this.props.logfetchState}
                       logChange={this.onChangeLog.bind(this)} logId={this.props.logId}/>
        </div>
        <div className="md-cell md-cell--12">
          <PredictionHeaderCard modelsLabel={regModelsLabel}
                                title='Regression Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onRegChangeModel.bind(this)}
                                modelId={this.props.regModelId}/>
          <PredictionHeaderCard modelsLabel={clasModelsLabel}
                                title='Classification Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onClasChangeModel.bind(this)}
                                modelId={this.props.classModelId}/>
          <Card className="md-full-width">
            <Button raised primary swapTheming onClick={this.Submit.bind(this)}
                    className="buttons__group">Submit</Button>
            <Button raised secondary swapTheming onClick={this.onReset.bind(this)}
                    className="buttons__group">Reset</Button>
          </Card>
        </div>
        <CardText>
          <ResultTable jobs={filteredJobsRun} onRequestJobs={this.requestJobsRun.bind(this)}/>
        </CardText>
      </div>
    );
  }
}

Prediction.propTypes = {
  logfetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  modfetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onChangeJRun: PropTypes.func.isRequired,
  onRequestModels: PropTypes.func.isRequired,
  onRegModelChange: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onClasModelChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitPrediction: PropTypes.func.isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: logsStore,
  jobsrun: PropTypes.arrayOf(jobRunPropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  classModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs,
  jobsrun: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.runIds),
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
  regModelId: state.models.regselected,
  classModelId: state.models.classelected,
  logId: state.models.logId,
  modfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRegModelChange: (modelId) => dispatch({type: REG_MODEL_CHANGED, modelId}),
  onClasModelChange: (modelId) => dispatch({type: CLAS_MODEL_CHANGED, modelId}),
  onModelChange: (regId, classId) => dispatch({type: MODEL_CHANGED, regId, classId}),
  onLogChange: (logId, pLength) => dispatch({type: LOG_CHANGED, logId, pLength}),
  onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
  onSubmitPrediction: (payload) => dispatch(submitPrediction({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
