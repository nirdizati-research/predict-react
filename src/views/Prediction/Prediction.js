import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  modelsRequested, REG_MODEL_CHANGED, CLAS_MODEL_CHANGED,
   NA_MODEL_CHANGED, MODEL_CHANGED
} from '../../actions/ModelActions';
import {logListRequested, LOG_CHANGED} from '../../actions/LogActions';
import {jobsRequested} from '../../actions/JobActions';
import {submitPrediction, JOB_RUN_CHANGED,} from '../../actions/RuntimeActions';
import PredictionHeaderCard from '../../components/prediction/PredictionHeaderCard';
import LogSelector from '../../components/prediction/LogSelector';
import ResultTable from '../../components/prediction/ResultTable';
import {jobPropType, modelPropType} from '../../propTypes';
import Button from 'react-md/lib/Buttons/Button';
import {modelsToString} from '../../util/dataReducers';
import {Card, CardText} from 'react-md/lib/Cards/index';

class Prediction extends Component {
  onChangeLog(logId) {
    var log = this.props.logs[logId]
    const p_length = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, p_length);
    this.props.onChangeJRun(logId);
  }

  onRegChangeModel(modelId) {
    this.props.onRegModelChange(modelId);
    const naId=this.props.naModelId;
    const classId=this.props.classModelId;
    const regId=modelId;
    this.props.onModelChange(naId,regId,classId);
  }

  onClasChangeModel(modelId) {
    this.props.onClasModelChange(modelId);
    const naId=this.props.naModelId;
    const classId=modelId;
    const regId=this.props.regModelId;
    this.props.onModelChange(naId,regId,classId);
  }

  onNAChangeModel(modelId) {
    this.props.onNAModelChange(modelId);
    const naId=modelId;
    const classId=this.props.classModelId;
    const regId=this.props.regModelId;
    this.props.onModelChange(naId,regId,classId);
  }

  componentDidMount() {
    if (this.props.models.length === 0 ) {
      this.props.onRequestModels();
      this.props.onRequestLogList();
      this.props.onRequestJobs();
    }
  }

  requestJobsRun() {
    this.props.onRequestJobs();
  }

  onReset() {
    window.location.reload()
  }

  Submit() {
    //const payload={log_id:this.props.logId, model_id:this.props.regModelId}
    const logId = this.props.logId;
    const regId = this.props.regModelId;
    const classId = this.props.classModelId;
    const naId = this.props.naModelId;
    const payload = logId + '&' + regId + '&' + classId + '&' + naId;
    this.props.onSubmitPrediction(payload);
    this.props.onRequestJobs();
  }

  render() {
    // Only unique splits for selector
    const regModelsLabel = modelsToString(this.props.regressionModels);
    const clasModelsLabel = modelsToString(this.props.classificationModels);
    const naModelsLabel = modelsToString(this.props.nextActivityModels);

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
        <LogSelector  logs={this.props.logs} fetchState={this.props.logfetchState}
                      logChange={this.onChangeLog.bind(this)} logId={this.props.logId}/>
        </div>
        <div className="md-cell md-cell--12">
          <PredictionHeaderCard modelsLabel={regModelsLabel}
                                title='Regression Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onRegChangeModel.bind(this)}/>
          <PredictionHeaderCard modelsLabel={clasModelsLabel}
                                title='Outcome Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onClasChangeModel.bind(this)}/>
          <PredictionHeaderCard modelsLabel={naModelsLabel}
                                title='Labelling Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onNAChangeModel.bind(this)}/>
          <Card className="md-full-width">
          <Button raised primary swapTheming onClick={this.Submit.bind(this)}
                  className="buttons__group">Submit</Button>
          <Button raised secondary swapTheming onClick={this.onReset.bind(this)}
                  className="buttons__group">Reset</Button>
          </Card>
        </div>
        <CardText>
          <ResultTable jobs={this.props.jobsrun} onRequestJobs={this.requestJobsRun.bind(this)}/>
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
  onModelChange: PropTypes.func.isRequired,
  onClasModelChange: PropTypes.func.isRequired,
  onNAModelChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitPrediction: PropTypes.func.isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: PropTypes.object.isRequired,
  jobsrun: PropTypes.arrayOf(jobPropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
  nextActivityModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  classModelId: PropTypes.number.isRequired,
  naModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs.byId,
  jobsrun: state.jobs.filteredJobsRun,
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
  nextActivityModels: state.models.nextActivityModels,
  regModelId: state.models.regselected,
  classModelId: state.models.classelected,
  naModelId: state.models.naselected,
  logId: state.models.logId,
  modfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRegModelChange: (modelId) => dispatch({type: REG_MODEL_CHANGED, modelId}),
  onClasModelChange: (modelId) => dispatch({type: CLAS_MODEL_CHANGED, modelId}),
  onNAModelChange: (modelId) => dispatch({type: NA_MODEL_CHANGED, modelId}),
  onModelChange: (naId, regId, classId) => dispatch({type: MODEL_CHANGED, naId, regId, classId}),
  onLogChange: (logId, p_length) => dispatch({type: LOG_CHANGED, logId, p_length}),
  onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
  onSubmitPrediction: (payload) => dispatch(submitPrediction({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
