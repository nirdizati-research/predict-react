import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfigTableCard from '../components/validation/ConfigTableCard';
import {CLASSIFICATION, LABELLING, REGRESSION} from '../reference';
import {
  FILTER_LABEL_CHANGED,
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  jobsRequested,
  submitTraining
} from '../actions/JobActions';
import {fetchStatePropType, jobPropType, splitLabelPropType} from '../propTypes';
import BarChartCard from '../components/chart/BarChartCard';
import LabellingHeaderCard from '../components/Labelling/LabellingHeaderCard';
import TrainingFormCard from '../components/TrainingFormCard';
import {splitsRequested} from '../actions/SplitActions';
import {getLogProperties} from '../util/splitStuff';
import PrefixLineChart from '../components/chart/PrefixLineChart';
import {mapJobs, splitsToLabel} from '../util/unNormalize';
import {logListRequested} from '../actions/LogActions';

class Labelling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      split_id: 0
    };
  }

  componentWillReceiveProps(_) {
    if (this.props.predictionMethod !== LABELLING) {
      this.props.onMethodChange(LABELLING);
    }
  }

  onChangePrefix(prefixLength) {
    this.props.onPrefixChange(prefixLength);
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) {
      this.props.onRequestLogList();
      this.props.onRequestSplitList();
      this.props.onRequestJobs();
    }
  }

  onJobClick(id) {
    this.setState({clickedJobId: id});
  }

  onSplitChange(splitId) {
    this.props.onSplitChange(splitId);
    this.setState({split_id: splitId});
  }

  render() {
    // Only unique splits for selector
    const prefixStrings = this.props.prefixLengths.map((p) => p + '');
    const {maxEventsInLog, traceAttributes} = this.props.getLogProperties(this.state.split_id);

    const validationChart = () => {
      if (this.props.jobs.length === 0) {
        return;
      }
      const job = this.state.clickedJobId ?
        this.props.jobs.filter((job) => job.id === this.state.clickedJobId)[0] : this.props.jobs[0];
      const a = job ? job.id : '';
      const prefix = job ? job.config.encoding.prefix_length : '';
      return <div className="md-cell md-cell--4">
        <BarChartCard data={job ? job.result : {}}
                      cardTitle={`Labels for task ${a}, prefix length ${prefix}`}
                      hTitle="Label count"
                      chartTitle="Label"/></div>;
    };

    // Dont render before componentWillReceiveProps has finished dispatch
    if (this.props.predictionMethod !== LABELLING) {
      return null;
    }
    let prefixChart;
    if (this.props.jobs.length > 0) {
      prefixChart = <div className="md-cell md-cell--8" key="023">
        <PrefixLineChart jobs={this.props.jobs}/>
      </div>;
    }
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard fetchState={this.props.fetchState} onSubmit={this.props.onSubmitTraining}
                            onSplitChange={this.onSplitChange.bind(this)} maxEventsInLog={maxEventsInLog}
                            traceAttributes={traceAttributes} splitLabels={this.props.splitLabels}
                            isLabelForm={true}/>
        </div>
        <div className="md-cell md-cell--12">
          <LabellingHeaderCard splitLabels={this.props.usedSplitLabels} fetchState={this.props.fetchState}
                               splitChange={this.onSplitChange.bind(this)}
                               prefixLengths={prefixStrings} filterOptionChange={this.props.filterOptionChange}
                               selectedPrefixes={this.props.selectedPrefixes}
                               prefixChange={this.onChangePrefix.bind(this)}
                               selectedSplitId={this.props.splitId}
                               filterOptions={this.props.filterOptions}
                               labelChange={this.props.labelTypeChange}/>
        </div>
        {prefixChart}
        {validationChart()}
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={this.props.jobs} onClick={this.onJobClick.bind(this)}
                           predictionMethod={this.props.predictionMethod}/>
        </div>

      </div>
    );
  }
}

Labelling.propTypes = {
  fetchState: fetchStatePropType,
  onRequestJobs: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  getLogProperties: PropTypes.func.isRequired,
  splitLabels: splitLabelPropType,
  usedSplitLabels: splitLabelPropType,
  onRequestSplitList: PropTypes.func.isRequired,
  onPrefixChange: PropTypes.func.isRequired,
  labelTypeChange: PropTypes.func.isRequired,
  filterOptionChange: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  splitId: PropTypes.number.isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  filterOptions: PropTypes.shape({
    label: PropTypes.any.isRequired,
    attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
    padding: PropTypes.string.isRequired
  }).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.filteredIds),
  splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
  usedSplitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.jobs.uniqueSplits),
  getLogProperties: getLogProperties(state.splits.byId, state.logs.byId),
  fetchState: state.jobs.fetchState,
  splitId: state.jobs.splitId,
  predictionMethod: state.jobs.predictionMethod,
  prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
  selectedPrefixes: state.jobs.selectedPrefixes,
  filterOptions: (({label, attributeNames, thresholds, padding}) => ({
    label, attributeNames, thresholds, padding
  }))(state.jobs)
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onRequestLogList: () => dispatch(logListRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload)),
  filterOptionChange: (_, event) => dispatch({
    type: FILTER_OPTION_CHANGED,
    payload: {name: event.target.name, value: event.target.value}
  }),
  labelTypeChange: (conf, value) => dispatch({
    type: FILTER_LABEL_CHANGED,
    payload: {config: conf, value: value}
  }),
  onSplitChange: (splitId) => dispatch({type: FILTER_SPLIT_CHANGED, splitId}),
  onMethodChange: (method) => dispatch({type: FILTER_PREDICTION_METHOD_CHANGED, method}),
  onPrefixChange: (prefixLength) => dispatch({type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength})
});

export default connect(mapStateToProps, mapDispatchToProps)(Labelling);
