import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MODEL_CHANGED, modelsRequested} from '../../actions/ModelActions';
import {LOG_CHANGED, logListRequested} from '../../actions/LogActions';
import {traceListRequested} from '../../actions/TraceActions';
import {submitRuntime} from '../../actions/RuntimeActions';
import {mapTraces} from '../../util/unNormalize';
import LogSelector from '../../components/prediction/LogSelector';
import RuntimeTable from '../../components/runtime/RuntimeTable';
import InterResultTable from '../../components/runtime/InterResultTable';
import {fetchStatePropType, logsStore, modelPropType, tracePropType} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';
import {CardText} from 'react-md/lib/Cards/index';
import ModelSelector from '../../components/prediction/ModelSelector';
import {Card} from 'react-md';

class Runtime extends Component {
  onChangeLog(logId) {
    const log = this.props.logs.byId[logId];
    const pLength = log.properties.maxEventsInLog;
    this.props.onLogChange(logId, pLength);
  }

  onModelChange({method}, modelId) {
    this.props.onModelChange({method}, modelId);
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

  filterTrace() {
    return this.props.traces.filter((trace) => (trace.real_log === this.props.logId));
  }

  Submit() {
    const logId = this.props.logId;
    const regId = this.props.regModelId;
    const classId = this.props.classModelId;
      const timeSeriesPredId = this.props.timeSeriesPredModelId;
      const payload = logId + '&' + regId + '&' + classId + '&' + timeSeriesPredId;
    this.props.onSubmitRuntime(payload);
    this.props.onRequestTraces();
  }

  render() {
    // Only unique splits for selector
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
                         timeSeriesPredModelsLabel={timeSeriesPredModelsLabel}
                         classModelId={this.props.classModelId} regModelId={this.props.regModelId}
                         timeSeriesPredModelId={this.props.timeSeriesPredModelId}/>
        </div>
        <div className="md-cell md-cell--12">
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
        </div>
      </div>
    );
  }
}

Runtime.propTypes = {
  logfetchState: fetchStatePropType,
  modfetchState: fetchStatePropType,
  onRequestModels: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmitRuntime: PropTypes.func.isRequired,
  onRequestTraces: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(modelPropType).isRequired,
  logs: logsStore,
  traces: PropTypes.arrayOf(tracePropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
    timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired,
  regModelId: PropTypes.number.isRequired,
  classModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired,
  logId: PropTypes.number.isRequired,
  changed: PropTypes.number.isRequired,
  maxPrefixLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  models: state.models.models,
  logs: state.logs,
  traces: mapTraces(state.traces.byId, state.traces.interResults, state.traces.finalDiff),
  regressionModels: state.models.regressionModels,
  classificationModels: state.models.classificationModels,
    timeSeriesPredictionModels: state.models.timeSeriesPredictionModels,
  regModelId: state.models.regselected,
  classModelId: state.models.classelected,
    timeSeriesPredModelId: state.models.timeseriesclasselected,
  logId: state.models.logId,
  modfetchState: state.models.fetchState,
  logfetchState: state.logs.fetchState,
  changed: state.traces.changed,
  maxPrefixLength: state.models.pLength,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestTraces: () => dispatch(traceListRequested()),
  onRequestModels: () => dispatch(modelsRequested()),
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onModelChange: ({method}, modelId) => dispatch({type: MODEL_CHANGED, method, modelId}),
  onLogChange: (logId, pLength) => dispatch({type: LOG_CHANGED, logId, pLength}),
  onSubmitRuntime: (payload) => dispatch(submitRuntime({payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
