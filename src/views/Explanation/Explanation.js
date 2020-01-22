/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CLASSIFICATION, LABELLING, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';
import {
    FILTER_LABEL_CHANGED,
    FILTER_OPTION_CHANGED,
    FILTER_PREDICTION_METHOD_CHANGED,
    FILTER_PREFIX_LENGTH_CHANGED,
    FILTER_SPLIT_CHANGED,
    jobsRequested,
    TRACE_CHANGED,
    PREDICTION_JOB_CHANGED
} from '../../actions/JobActions';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import {traceListRequested} from '../../actions/TraceActions';
import {limeValueListRequested} from '../../actions/LimeActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import PostHocExplanation from '../../components/explanation/post_hoc';
import TraceExplanation from '../../components/explanation/TraceExplanation';
import {getTraceIdsFromLogs, parseLimeResult} from '../../util/dataReducers';
import JobModelsTable from '../../components/explanation/JobModelsTable';
import PredictionLineChartCard from '../../components/explanation/TemporalStability';
import {temporalPredictionListRequested, temporalLimePredictionListRequested} from '../../actions/PredictionAction';
class Explanation extends Component {
    constructor(props) {
        const selectedTrace = '';
        const logName = 0;
        super(props);
        this.state = {
          selectedTrace,
          logName
        };
      }
    onChangePrefix(prefixLength) {
        this.props.onPrefixChange(prefixLength);
    }

    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
        this.setState({logName: splitId});
        this.props.onRequestTraces(this.getTrainLogId(splitId));
    }

    getTrainLogId(splitId) {
      let splits = this.props.splits;
      let logId = 0;
      let keys = Object.keys(splits);

      keys.forEach(function (key) {
        let split = splits[key];

        if (split.id == splitId) {
          logId = split.test_log;
        }
      });

      return logId;
    }

    onChangeTrace(trace) {
        this.props.onTraceChange(trace);
        this.setState({selectedTrace: trace});
        if (this.props.jobId.length != 0) {
            this.props.onRequestLimeValues(this.props.jobId, trace);
            this.props.onRequestLimeTemporalList(this.props.jobId, trace);
            this.props.onRequestPredictionTemporalList(this.props.jobId, trace);
        }
    }

    onChangeJob(id) {
        this.props.onJobChange(id);
        if (this.props.selectedTrace !== '') {
            this.props.onRequestLimeValues(id, this.props.selectedTrace);
            this.props.onRequestLimeTemporalList(id, this.props.selectedTrace);
            this.props.onRequestPredictionTemporalList(id, this.props.selectedTrace);
        }
    }

    componentDidMount() {
        if (this.props.jobs.length === 0) {
            this.props.onRequestLogList();
            this.props.onRequestSplitList();
            this.props.onRequestJobs();
        }
        ReactGA.initialize('UA-143444044-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    onChangeMethod(method) {
        this.props.onMethodChange(method);
    }

    onJobClick(id) {
        // this.props.clickedJobId = id; //TODO correct state
    }

    render() {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <ExplanationHeaderCard jobs={this.props.filteredJobs}
                                           splitLabels={this.props.splitLabels}
                                           fetchState={this.props.fetchState}
                                           splitChange={this.onChangeSplit.bind(this)}
                                           selectedSplitId={this.props.splitId}
                                           predictionMethod={this.props.predictionMethod}
                                           onClick={this.onJobClick.bind(this)}
                                           jobChange={this.onChangeJob.bind(this)}
                                           jobId={this.props.jobId}
                                          />
                </div>
                <div className="md-cell md-cell--12">
                    <TraceExplanation jobs={this.props.jobs}
                                      traceChange={this.onChangeTrace.bind(this)}
                                      traceIdList={
                                          getTraceIdsFromLogs(this.props.logs, this.getTrainLogId(this.state.logName))}
                                      selectedTrace={this.props.selectedTrace}
                                      traceList={this.props.traceList}
                                      />
                </div>
                <div className="md-cell md-cell--12">
                <JobModelsTable jobs={this.props.filteredJobs}
                                           fetchState={this.props.fetchState}
                                           predictionMethod={this.props.predictionMethod}
                                           onClick={this.onJobClick.bind(this)}
                                           jobChange={this.onChangeJob.bind(this)}
                                           jobId={this.props.jobId}
                                          />
                </div>
                <div className="md-cell md-cell--12">
                <PostHocExplanation jobs={this.props.jobs}
                                        limeValueList={parseLimeResult(this.props.limeValueList)}
                                        isLimeValuesLoaded={this.props.isLimeValuesLoaded}
                                        traceId={this.props.selectedTrace}/>
                </div>
                <div className="md-cell md-cell--12">
                <PredictionLineChartCard
                    limeTemporalChartData={this.props.limeTempStabilityList}
                    predictionTemportalChartData={this.props.predictionTempStabilityList}
                    traceId={this.props.selectedTrace}
                    isLimeTempStabilityLoaded={this.props.isLimeTempStabilityLoaded}
                    isPredictionTempStabilityLoaded={this.props.isPredictionTempStabilityLoaded}
                    jobId={this.props.jobId}/>
                </div>
            </div>
        );
    }
}

Explanation.propTypes = {
    fetchState: fetchStatePropType,
    splitLabels: selectLabelProptype,
    onRequestLogList: PropTypes.func.isRequired,
    onRequestSplitList: PropTypes.func.isRequired,
    onRequestJobs: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onMethodChange: PropTypes.func.isRequired,
    onTraceChange: PropTypes.func.isRequired,
    onPrefixChange: PropTypes.func.isRequired,
    onRequestTraces: PropTypes.func.isRequired,
    onJobChange: PropTypes.func.isRequired,
    onRequestLimeValues: PropTypes.func.isRequired,
    onRequestPredictionTemporalList: PropTypes.func.isRequired,
    onRequestLimeTemporalList: PropTypes.func.isRequired,
    filterOptionChange: PropTypes.func.isRequired,
    labelTypeChange: PropTypes.func.isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION, LABELLING]).isRequired,
    splitId: PropTypes.number.isRequired,
    prefixLengths: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    selectedPrefixes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    filterOptions: PropTypes.shape({
        encodings: PropTypes.arrayOf(PropTypes.string).isRequired,
        clusterings: PropTypes.arrayOf(PropTypes.string).isRequired,
        classification: PropTypes.arrayOf(PropTypes.string).isRequired,
        regression: PropTypes.arrayOf(PropTypes.string).isRequired,
        timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string).isRequired,
        labelling: PropTypes.any.isRequired,
        padding: PropTypes.string.isRequired,
        attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        thresholds: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    clickedJobId: PropTypes.number,
    limeValueList: PropTypes.any,
    traceList: PropTypes.any,
    logs: PropTypes.any,
    splits: PropTypes.any,
    jobsById: PropTypes.any,
    selectedTrace: PropTypes.any,
    filteredJobs: PropTypes.any,
    jobId: PropTypes.number.isRequired,
    isLimeTempStabilityLoaded: PropTypes.bool.isRequired,
    isPredictionTempStabilityLoaded: PropTypes.bool.isRequired,
    isLimeValuesLoaded: PropTypes.bool.isRequired,
    limeTempStabilityList: PropTypes.any,
    predictionTempStabilityList: PropTypes.any
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.jobs.uniqueSplits),
    fetchState: state.jobs.fetchState,
    filteredJobs: state.jobs.filteredJobs,
    logs: state.logs.byId,
    splits: state.splits.byId,
    splitId: state.jobs.splitId,
    limeValueList: state.lime.limeValueList,
    isLimeValuesLoaded: state.lime.isLimeValuesLoaded,
    traceList: state.traces.byId,
    predictionMethod: state.jobs.predictionMethod,
    prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
    selectedPrefixes: state.jobs.selectedPrefixes,
    jobsById: state.jobs.byId,
    jobId: state.jobs.predictionJobId,
    selectedTrace: state.jobs.selectedTrace,
    limeTempStabilityList: state.predictions.limeTempStabilityList,
    predictionTempStabilityList: state.predictions.predictionTempStabilityList,
    isLimeTempStabilityLoaded: state.predictions.isLimeTempStabilityLoaded,
    isPredictionTempStabilityLoaded: state.predictions.isPredictionTempStabilityLoaded,
    filterOptions: (
        ({
             encodings, clusterings, classification, regression, timeSeriesPrediction,
             labelling, attributeNames, thresholds, padding
         }) => ({
            encodings,
            clusterings,
            classification,
            regression,
            timeSeriesPrediction,
            labelling,
            attributeNames,
            thresholds,
            padding
        }))(state.jobs)
});
const mapDispatchToProps = (dispatch) => ({
    onRequestLogList: () => dispatch(logListRequested()),
    onRequestSplitList: () => dispatch(splitsRequested()),
    onRequestJobs: () => dispatch(jobsRequested()),
    onRequestTraces: (id) => dispatch(traceListRequested({id})),
    onRequestLimeValues: (jobId, traceId) => dispatch(limeValueListRequested({jobId, traceId})),
    onRequestPredictionTemporalList: (jobId, traceId) =>
        dispatch(temporalPredictionListRequested({jobId, traceId})),
    onRequestLimeTemporalList: (jobId, traceId) =>
        dispatch(temporalLimePredictionListRequested({jobId, traceId})),
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
    onPrefixChange: (prefixLength) => dispatch({type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength}),
    onTraceChange: (trace) => dispatch({type: TRACE_CHANGED, trace}),
    onJobChange: (jobId) => dispatch({type: PREDICTION_JOB_CHANGED, jobId}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
