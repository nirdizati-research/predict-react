import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {
  FILTER_METHOD_CHANGED, modelsRequested, REG_MODEL_CHANGED, CLAS_MODEL_CHANGED, NA_MODEL_CHANGED,
} from '../../actions/ModelActions';
import {logListRequested, LOG_CHANGED} from '../../actions/LogActions';
import {PREDICTION_SUBMITTED, JOB_RUN_CHANGED, jobsRequested} from '../../actions/JobActions';
import PredictionHeaderCard from '../../components/prediction/PredictionHeaderCard';
import UploadCard from '../../components/upload/UploadCard';
import LogSelector from '../../components/prediction/LogSelector'
import ResultWrapper from '../../components/prediction/ResultWrapper';
import {jobPropType, modelPropType} from '../../helpers';
import Button from 'react-md/lib/Buttons/Button';
import {modelsToString} from '../../util/dataReducers';
import Card from 'react-md/lib/Cards/index';

class Prediction extends Component {
  onChangeLog(logId) {
    this.props.onLogChange(logId);
    this.props.onChangeJRun(logId);
  }

  onRegChangeModel(modelId) {
    this.props.onRegModelChange(modelId);
  }

  onClasChangeModel(modelId) {
    this.props.onClasModelChange(modelId);
  }

  onNAChangeModel(modelId) {
    this.props.onNAModelChange(modelId);
  }

  componentDidMount() {
    if (this.props.models.length === 0 ) {
      this.props.onRequestModels();
      this.props.onRequestLogList();
    }
  }

  onChangeMethod(method) {
    this.props.onMethodChange(method);
  }

  render() {
    // Only unique splits for selector
    const regmodelsLabel = modelsToString(this.props.regressionModels);
    const clasmodelsLabel = modelsToString(this.props.classificationModels);
    const namodelsLabel = modelsToString(this.props.nextActivityModels);

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
        <UploadCard/>
        <LogSelector  logs={this.props.logs} fetchState={this.props.logfetchState}
                      logChange={this.onChangeLog.bind(this)}/>
        </div>
        <div className="md-cell md-cell--12">
          <PredictionHeaderCard modelsLabel={regmodelsLabel}
                                title='Regression Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onRegChangeModel.bind(this)}/>
          <PredictionHeaderCard modelsLabel={clasmodelsLabel}
                                title='Classification Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onClasChangeModel.bind(this)}/>
          <PredictionHeaderCard modelsLabel={namodelsLabel}
                                title='Next Activity Model Selection'
                                fetchState={this.props.modfetchState}
                                modelChange={this.onNAChangeModel.bind(this)}/>
          <Card className="md-full-width">
            <Button type="submit" flat primary onClick={this.props.onSubmitPrediction}>Calculate</Button>
          </Card>
        </div>
        <div>
          <ResultWrapper jobsrun={this.props.jobsrun} predictionMethod={REGRESSION}/>
        </div>

      </div>
    );
  }
}

//<ResultWrapper jobs={this.props.jobs} predictionMethod={this.props.predictionMethod}/>

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
  onClasModelChange: PropTypes.func.isRequired,
  onNAModelChange: PropTypes.func.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitPrediction: PropTypes.func.isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: PropTypes.arrayOf(PropTypes.any).isRequired,
  jobsrun: PropTypes.arrayOf(jobPropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
  nextActivityModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  clasModelId: PropTypes.number.isRequired,
  naModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs.logs,
  jobsrun: state.jobs.filteredJobsRun,
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
  nextActivityModels: state.models.nextActivityModels,
  regModelId: state.models.regselected,
  clasModelId: state.models.classelected,
  naModelId: state.models.naselected,
  logId: state.models.logId,
  logfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRegModelChange: (modelId) => dispatch({type: REG_MODEL_CHANGED, modelId}),
  onClasModelChange: (modelId) => dispatch({type: CLAS_MODEL_CHANGED, modelId}),
  onNAModelChange: (modelId) => dispatch({type: NA_MODEL_CHANGED, modelId}),
  onLogChange: (logId) => dispatch({type: LOG_CHANGED, logId}),
  onChangeJRun: (logId) => dispatch({type: JOB_RUN_CHANGED, logId}),
  onSubmitPrediction: (payload) => dispatch({type: PREDICTION_SUBMITTED, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
