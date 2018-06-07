import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CLAS_MODEL_CHANGED, MODEL_CHANGED, modelsRequested, REG_MODEL_CHANGED} from '../../actions/ModelActions';
import {LOG_CHANGED, logListRequested} from '../../actions/LogActions';
import {traceListRequested} from '../../actions/TraceActions';
import {submitRuntime} from '../../actions/RuntimeActions';
import LogSelector from '../../components/prediction/LogSelector';
import RuntimeTable from '../../components/Runtime/RuntimeTable';
import {fetchStatePropType, logsStore, modelPropType, tracePropType} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';
import {CardText} from 'react-md/lib/Cards/index';
import ModelSelector from '../../components/prediction/ModelSelector';
import {REGRESSION} from '../../reference';
import {Card} from 'react-md';

class Runtime extends Component {
  onChangeLog(logId) {
    const log = this.props.logs.byId[logId];
    const pLength = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, pLength);
  }

  onModelChange({method}, modelId) {
    if (method === REGRESSION) {
      this.props.onRegModelChange(modelId);
      const classId = this.props.classModelId;
      this.props.onModelChange(modelId, classId);
    } else {
      const regId = this.props.regModelId;
      this.props.onModelChange(regId, modelId);
    }
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
          <ModelSelector modelChange={this.onModelChange.bind(this)} onSubmit={this.Submit.bind(this)}
                         onReset={this.onReset} classModelsLabel={clasModelsLabel} regModelsLabel={regModelsLabel}
                         classModelId={this.props.classModelId} regModelId={this.props.regModelId}/>
        </div>
        <div className="md-cell md-cell--12">
          <Card>
            <CardText>
              <RuntimeTable traces={filteredTraces} onRequestTraces={this.requestTraces.bind(this)}/>
            </CardText>
          </Card></div>
      </div>
    );
  }
}

Runtime.propTypes = {
  logfetchState: fetchStatePropType,
  modfetchState: fetchStatePropType,
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
