import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  modelsRequested, REG_MODEL_CHANGED, CLAS_MODEL_CHANGED, MODEL_CHANGED
} from '../../actions/ModelActions';
import {logListRequested, LOG_CHANGED} from '../../actions/LogActions';
import {traceListRequested} from '../../actions/TraceActions';
import {submitRuntime} from '../../actions/RuntimeActions';
import PredictionHeaderCard from '../../components/prediction/PredictionHeaderCard';
import LogSelector from '../../components/prediction/LogSelector';
import RuntimeTable from '../../components/Runtime/RuntimeTable';
import {tracePropType, modelPropType, logsStore} from '../../propTypes';
import Button from 'react-md/lib/Buttons/Button';
import {modelsToString} from '../../util/dataReducers';
import {Card, CardText} from 'react-md/lib/Cards/index';

class Runtime extends Component {
  onChangeLog(logId) {
    const log = this.props.logs.byId[logId];
    const pLength = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, pLength);
  }

  onRegChangeModel(modelId) {
    this.props.onRegModelChange(modelId);
    const classId = this.props.classModelId;
    this.props.onModelChange(modelId, classId);
  }

  onClasChangeModel(modelId) {
    this.props.onClasModelChange(modelId);
    const classId = modelId;
    const regId = this.props.regModelId;
    this.props.onModelChange(regId, classId);
  }

  componentDidMount() {
    if (this.props.models.length === 0) {
      this.props.onRequestModels();
      this.props.onRequestLogList();
      this.props.onRequestTraces();
    }
  }

  requestTraces() {
    this.props.onRequestTraces();
  }

  onReset() {
    window.location.reload();
  }

  filterTrace(byId) {
    const arTraces = [];
    for (const key in byId) {
      if (byId[key].real_log === this.props.logId) arTraces.push(byId[key]);
    }
    return arTraces;
  }

  Submit() {
    const logId = this.props.logId;
    const regId = this.props.regModelId;
    const classId = this.props.classModelId;
    const payload = logId + '&' + regId + '&' + classId;
    this.props.onSubmitRuntime(payload);
    this.props.onRequestTraces();
  }

  render() {
    // Only unique splits for selector
    const filteredTraces = this.filterTrace(this.props.traces);
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
          <RuntimeTable traces={filteredTraces} onRequestTraces={this.requestTraces.bind(this)}/>
        </CardText>
      </div>
    );
  }
}

Runtime.propTypes = {
  logfetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  modfetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onRequestModels: PropTypes.func.isRequired,
  onRegModelChange: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onClasModelChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitRuntime: PropTypes.func.isRequired,
  onRequestTraces: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: logsStore,
  traces: PropTypes.arrayOf(tracePropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  classModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs,
  traces: state.traces.byId,
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
  regModelId: state.models.regselected,
  classModelId: state.models.classelected,
  logId: state.models.logId,
  modfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestTraces: () => dispatch(traceListRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRegModelChange: (modelId) => dispatch({type: REG_MODEL_CHANGED, modelId}),
  onClasModelChange: (modelId) => dispatch({type: CLAS_MODEL_CHANGED, modelId}),
  onModelChange: (naId, regId, classId) => dispatch({type: MODEL_CHANGED, naId, regId, classId}),
  onLogChange: (logId, pLength) => dispatch({type: LOG_CHANGED, logId, pLength}),
  onSubmitRuntime: (payload) => dispatch(submitRuntime({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
