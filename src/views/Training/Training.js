import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrainingFormCard from '../../components/TrainingFormCard';
import {jobsRequested, submitTraining} from '../../actions/JobActions';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {splitsRequested} from '../../actions/SplitActions';
import {fetchStatePropType, jobPropType, modelPropType, selectLabelProptype} from '../../propTypes';
import {getLogProperties} from '../../util/splitStuff';
import {logListRequested} from '../../actions/LogActions';
import {MODEL_CHANGED, modelsRequested} from '../../actions/ModelActions';
import ReactGA from 'react-ga';

class Training extends Component {
  constructor() {
    super();

    this.state = {
      split_id: 0
    };
  }

  componentDidMount() {
    this.props.onRequestModels();
    this.props.onRequestLogList();
    this.props.onRequestSplitList();
    this.props.onRequestJobs();
    ReactGA.initialize('UA-143444044-1');
    ReactGA.pageview(window.location.hash);
  }

  onSplitChange(value) {
    this.setState({split_id: value});
  }

  onModelChange({method}, modelId) {
    this.props.onModelChange({method}, modelId);
  }

  render() {
    const {maxEventsInLog, traceAttributes} = this.props.getLogProperties(this.state.split_id);
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                            jobs={this.props.jobs} maxEventsInLog={maxEventsInLog}
                            traceAttributes={traceAttributes}
                            classificationModels={this.props.classificationModels}
                            regressionModels={this.props.regressionModels}
                            timeSeriesPredictionModels={this.props.timeSeriesPredictionModels}
                            onModelChange={this.onModelChange.bind(this)}
                            onSubmit={this.props.onSubmitTraining} onSplitChange={this.onSplitChange.bind(this)}/>
        </div>
      </div>
    );
  }z
}

Training.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  splitLabels: selectLabelProptype,
  onRequestLogList: PropTypes.func.isRequired,
  getLogProperties: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onRequestModels: PropTypes.func.isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  fetchState: fetchStatePropType,
  classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
  regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
  timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired
};

const mapStateToProps = (state) => ({
  jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
  getLogProperties: getLogProperties(state.splits.byId, state.logs.byId),
  splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
  fetchState: state.training.fetchState,
  classificationModels: state.models.classificationModels,
  regressionModels: state.models.regressionModels,
  timeSeriesPredictionModels: state.models.timeSeriesPredictionModels,
  models: state.models.models
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onRequestLogList: () => dispatch(logListRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload)),
  onRequestModels: () => dispatch(modelsRequested()),
  onModelChange: ({method}, modelId) => dispatch({type: MODEL_CHANGED, method, modelId})
});

export default connect(mapStateToProps, mapDispatchToProps)(Training);
