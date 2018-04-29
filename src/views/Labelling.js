import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfigTableCard from '../components/validation/ConfigTableCard';
import {CLASSIFICATION, LABELLING, REGRESSION} from '../reference';
import {
  FILTER_LABEL_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  jobsRequested,
  submitTraining
} from '../actions/JobActions';
import {jobPropType, splitLabels} from '../helpers';
import {splitsToString} from '../util/dataReducers';
import BarChartCard from '../components/chart/BarChartCard';
import LabellingHeaderCard from '../components/Labelling/LabellingHeaderCard';
import TrainingFormCard from '../components/TrainingFormCard';
import {splitsRequested} from '../actions/SplitActions';
import {getLogProperties} from '../util/splitStuff';
import PrefixLineChart from '../components/chart/PrefixLineChart';

class Labelling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxEventsInLog: 0,
      traceAttributes: [],
      clickedJobId: null
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
    this.props.onRequestSplitList();
    if (this.props.splitLabels.length > 0) {
      this.onSplitChange(this.props.splitLabels[0].value);
    }
    if (this.props.jobs.length === 0) {
      this.props.onRequestJobs();
    }
  }

  onJobClick(id) {
    this.setState({clickedJobId: id});
  }

  onSplitChange(splitId) {
    this.props.onSplitChange(splitId);
    this.setState(getLogProperties(this.props.splits, splitId));
  }

  render() {
    // Only unique splits for selector
    const splitLabels = splitsToString(this.props.uniqueSplits);
    const prefixStrings = this.props.prefixLengths.map((p) => p + '');

    const validationChart = () => {
      if (this.props.jobs.length === 0) {
        return;
      }
      const job = this.state.clickedJobId ?
        this.props.jobs.filter((job) => job.id === this.state.clickedJobId)[0] : this.props.jobs[0];
      const a = job ? job.id : '';
      return <div className="md-cell md-cell--6">
        <BarChartCard data={job ? job.result : {}}
                      cardTitle={`Labels of labelling job ${a}`}
                      hTitle="Label count"
                      chartTitle="Label"/></div>;
    };

    // Dont render before componentWillReceiveProps has finished dispatch
    if (this.props.predictionMethod !== LABELLING) {
      return null;
    }
    let prefixChart;
    if (this.props.jobs.length > 0) {
      prefixChart = <div className="md-cell md-cell--6" key="023">
        <PrefixLineChart jobs={this.props.jobs}/>
      </div>;
    }
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard fetchState={this.props.fetchState} onSubmit={this.props.onSubmitTraining}
                            onSplitChange={this.onSplitChange.bind(this)} maxEventsInLog={this.state.maxEventsInLog}
                            traceAttributes={this.state.traceAttributes} splitLabels={this.props.splitLabels}
                            isLabelForm={true}/>
        </div>
        <div className="md-cell md-cell--12">
          <LabellingHeaderCard splitLabels={splitLabels} fetchState={this.props.fetchState}
                               splitChange={this.onSplitChange.bind(this)}
                               prefixLengths={prefixStrings}
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
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  splitLabels: splitLabels,
  splits: PropTypes.any,
  onRequestSplitList: PropTypes.func.isRequired,
  onPrefixChange: PropTypes.func.isRequired,
  labelTypeChange: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  splitId: PropTypes.number.isRequired,
  uniqueSplits: PropTypes.arrayOf(PropTypes.any).isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  filterOptions: PropTypes.shape({
    label: PropTypes.any.isRequired,
    attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
};

const mapStateToProps = (state) => ({
  splitLabels: splitsToString(state.splits.splits),
  splits: state.splits.splits,
  jobs: state.jobs.filteredJobs,
  fetchState: state.jobs.fetchState,
  uniqueSplits: state.jobs.uniqueSplits,
  splitId: state.jobs.splitId,
  predictionMethod: state.jobs.predictionMethod,
  prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
  selectedPrefixes: state.jobs.selectedPrefixes,
  filterOptions: (({label, attributeNames, thresholds}) => ({
    label, attributeNames, thresholds
  }))(state.jobs)
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload)),
  labelTypeChange: (conf, value) => dispatch({
    type: FILTER_LABEL_CHANGED,
    payload: {config: conf, value: value}
  }),
  onSplitChange: (splitId) => dispatch({type: FILTER_SPLIT_CHANGED, splitId}),
  onMethodChange: (method) => dispatch({type: FILTER_PREDICTION_METHOD_CHANGED, method}),
  onPrefixChange: (prefixLength) => dispatch({type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength})
});

export default connect(mapStateToProps, mapDispatchToProps)(Labelling);
