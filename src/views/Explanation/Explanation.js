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
    PREDICTION_JOB_CHANGED,
    decodingRequested,
    decodingFailed
} from '../../actions/JobActions';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import {traceListRequested} from '../../actions/TraceActions';
import {limeValueListRequested, iceValueListRequested, shapValueListRequested,
    skaterValueListRequested, limeValueListFailed, shapValueListFailed, iceValueListFailed,
    skaterValueListFailed} from '../../actions/ExplanationActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import PostHocExplanation from '../../components/explanation/post_hoc';
import DecodedDFTable from '../../components/explanation/DecodedDFTable';
import TraceExplanation from '../../components/explanation/TraceExplanation';
import {getTraceIdsFromLogs, parseLimeResult, parseICEResult, getDecodedDFTable} from '../../util/dataReducers';
import JobModelsTable from '../../components/explanation/JobModelsTable';
import TemporalStability from '../../components/explanation/TemporalStability';
import {temporalPredictionListRequested, temporalLimePredictionListRequested,
    temporalLimePredictionListFailed, temporalPredictionListFailed} from '../../actions/PredictionAction';
import ShapResult from '../../components/explanation/ShapResult';
import ICEResult from '../../components/explanation/ICEResult';
import SkaterResult from '../../components/explanation/SkaterResult';
import {Row} from 'react-grid-system';

class Explanation extends Component {
    constructor(props) {
        const selectedTrace = '';
        const selectedAttribute = '';
        const logName = 0;
        super(props);
        this.state = {
          selectedTrace,
          selectedAttribute,
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

        this.props.onRequestFailLimeValues();
        this.props.onRequestFailLimeTemporalList(null, null);
        this.props.onRequestFailPredictionTemporalList(null, null);
        this.props.onRequestFailShapValues(null, null);
        this.props.onRequestFailSkaterValues(null);
        this.props.onRequestFailIceValues(null, null);
        this.props.onRequestFailDecodeDF(null);
    }

    onChangeTrace(trace) {
        this.props.onTraceChange(trace);
        this.setState({selectedTrace: trace});
        if (this.props.jobId.length != 0) {
            this.props.onRequestLimeValues(this.props.jobId, trace);
            this.props.onRequestLimeTemporalList(this.props.jobId, trace);
            this.props.onRequestPredictionTemporalList(this.props.jobId, trace);
            this.props.onRequestShapValues(this.props.jobId, trace);
        }
    }

    onChangeFeature(attribute) {
        this.setState({selectedAttribute: attribute});
        this.props.onRequestIceValues(this.props.jobId, attribute);
    }

    onChangeJob(id) {
        this.props.onJobChange(id);
        if (this.props.selectedTrace !== '') {
            this.props.onRequestLimeValues(id, this.props.selectedTrace);
            this.props.onRequestLimeTemporalList(id, this.props.selectedTrace);
            this.props.onRequestPredictionTemporalList(id, this.props.selectedTrace);
            this.props.onRequestShapValues(this.props.jobId, this.props.selectedTrace);
        }
        this.props.onRequestSkaterValues(id);
        this.props.onRequestDecoding(id);
        this.props.onRequestIceValues(this.props.jobId, this.props.selectedAttribute);
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

    filterJobsById(id) {
        return this.props.filteredJobs.filter(job => job.id==id)[0];
    }
    render() {
        // eslint-disable-next-line max-len
        // const iceResult = parseICEResult([{'label': 'First outpatient consultation', 'value': 1.25, 'count': 48}, {'label': 'aspiration cytology behalf by p', 'value': 1.6666666666666667, 'count': 3}, {'label': 'assumption laboratory', 'value': 1.6923076923076923, 'count': 130}, {'label': 'compartment for inspection', 'value': 1.6666666666666667, 'count': 12}, {'label': 'ct abdomen', 'value': 2.0, 'count': 2}, {'label': 'cytology - abdominal tumor puncture', 'value': 1.0, 'count': 1}, {'label': 'cytology - ectocervix -', 'value': 1.32, 'count': 25}, {'label': 'cytology - vagina -', 'value': 1.2222222222222223, 'count': 9}, {'label': 'day care - all spec.beh.kind.-rev.', 'value': 1.0, 'count': 2}, {'label': 'demurrage - all spec.beh.kinderg.-Reval.', 'value': 1.7142857142857142, 'count': 28}, {'label': 'e.c.g. - Electrocardiography', 'value': 1.5, 'count': 22}, {'label': 'histological examination - biopsies nno', 'value': 1.3076923076923077, 'count': 13}, {'label': 'immuno-pathology', 'value': 1.25, 'count': 4}, {'label': 'inwend.geneesk. Out-year card costs', 'value': 2.0, 'count': 1}, {'label': 'inwend.geneesk. short-out card cost', 'value': 1.375, 'count': 8}, {'label': 'mammography chest wall', 'value': 1.3333333333333333, 'count': 3}, {'label': 'outpatient follow-up consultation', 'value': 1.087719298245614, 'count': 228}, {'label': 'telephone consultation', 'value': 1.0769230769230769, 'count': 13}, {'label': 'thorax', 'value': 1.375, 'count': 8}, {'label': 'treatment time - Unit t2 - megavolt', 'value': 1.0, 'count': 1}, {'label': 'treatment time - Unit t3 - megavolt', 'value': 1.0, 'count': 1}, {'label': 'ultrasound - internal genitals', 'value': 1.6333333333333333, 'count': 30}]
        // );
        let decodedDfTableResult = getDecodedDFTable(this.props.decodedDf);
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
                {/* <div className="md-cell md-cell--12">
                    <DecisionTree></DecisionTree>
                </div> */}
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
                    <DecodedDFTable
                        values = {decodedDfTableResult.data}
                        headers = {decodedDfTableResult.headers}
                        isDecodedValueLoaded = {this.props.isDecodedValueLoaded}
                        jobId={this.props.jobId}
                    />
                </div>
                <div className="md-cell md-cell--12">
                    <SkaterResult
                        jobs = {this.props.jobs}
                        skaterValueList = {this.props.skaterValueList}
                        isSkaterValuesLoaded = {this.props.isSkaterValuesLoaded}
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
                    <Row>
                        <div className="md-cell md-cell--6">
                            <PostHocExplanation
                                jobs={this.props.jobs}
                                limeValueList={parseLimeResult(this.props.limeValueList)}
                                isLimeValuesLoaded={this.props.isLimeValuesLoaded}
                                traceId={this.props.selectedTrace}
                                jobId={this.props.jobId}/>
                        </div>
                        <div className="md-cell md-cell--6">
                            <ShapResult
                                jobs = {this.props.jobs}
                                shapValueList = {this.props.shapValueList}
                                isShapValuesLoaded = {this.props.isShapValuesLoaded}
                                traceId={this.props.selectedTrace}
                                jobId={this.props.jobId}
                                />
                        </div>
                    </Row>
                </div>
                <div className="md-cell md-cell--12">
                <TemporalStability
                    limeTemporalChartData={this.props.limeTempStabilityList}
                    predictionTemportalChartData={this.props.predictionTempStabilityList}
                    traceId={this.props.selectedTrace}
                    isLimeTempStabilityLoaded={this.props.isLimeTempStabilityLoaded}
                    isPredictionTempStabilityLoaded={this.props.isPredictionTempStabilityLoaded}
                    jobId={this.props.jobId}/>
                </div>
                <div className="md-cell md-cell--12">
                    <ICEResult
                        jobs = {this.props.jobs}
                        iceValueList = {parseICEResult(this.props.iceValueList)}
                        originalList = {this.props.iceValueList}
                        isIceValuesLoaded = {this.props.isIceValuesLoaded}
                        selectedAttribute={this.props.selectedAttribute}
                        attributes ={this.filterJobsById(this.props.jobId) != undefined ?
                        this.filterJobsById(this.props.jobId).config.encoding.features: []}
                        onChangeFeature = {this.onChangeFeature.bind(this)}
                        >
                    </ICEResult>
                </div >
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
    onRequestDecoding: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onMethodChange: PropTypes.func.isRequired,
    onTraceChange: PropTypes.func.isRequired,
    onPrefixChange: PropTypes.func.isRequired,
    onRequestTraces: PropTypes.func.isRequired,
    onJobChange: PropTypes.func.isRequired,
    onRequestLimeValues: PropTypes.func.isRequired,
    onRequestSkaterValues: PropTypes.func.isRequired,
    onRequestShapValues: PropTypes.func.isRequired,
    onRequestIceValues: PropTypes.func.isRequired,
    onRequestPredictionTemporalList: PropTypes.func.isRequired,
    onRequestLimeTemporalList: PropTypes.func.isRequired,
    onRequestFailLimeValues: PropTypes.func.isRequired,
    onRequestFailLimeTemporalList: PropTypes.func.isRequired,
    onRequestFailPredictionTemporalList: PropTypes.func.isRequired,
    onRequestFailShapValues: PropTypes.func.isRequired,
    onRequestFailSkaterValues: PropTypes.func.isRequired,
    onRequestFailIceValues: PropTypes.func.isRequired,
    onRequestFailDecodeDF: PropTypes.func.isRequired,
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
    shapValueList: PropTypes.any,
    iceValueList: PropTypes.any,
    skaterValueList: PropTypes.any,
    traceList: PropTypes.any,
    logs: PropTypes.any,
    splits: PropTypes.any,
    jobsById: PropTypes.any,
    selectedTrace: PropTypes.any,
    selectedAttribute: PropTypes.any,
    filteredJobs: PropTypes.any,
    decodedDf: PropTypes.any,
    jobId: PropTypes.number.isRequired,
    isLimeTempStabilityLoaded: PropTypes.bool.isRequired,
    isPredictionTempStabilityLoaded: PropTypes.bool.isRequired,
    isLimeValuesLoaded: PropTypes.bool.isRequired,
    isShapValuesLoaded: PropTypes.bool.isRequired,
    isSkaterValuesLoaded: PropTypes.bool.isRequired,
    isIceValuesLoaded: PropTypes.bool.isRequired,
    isDecodedValueLoaded: PropTypes.bool.isRequired,
    limeTempStabilityList: PropTypes.any,
    predictionTempStabilityList: PropTypes.any
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.jobs.uniqueSplits),
    fetchState: state.jobs.fetchState,
    filteredJobs: state.jobs.filteredJobs,
    decodedDf: state.jobs.decodedDf,
    isDecodedValueLoaded: state.jobs.isDecodingLoaded,
    logs: state.logs.byId,
    splits: state.splits.byId,
    splitId: state.jobs.splitId,
    limeValueList: state.explanation.limeValueList,
    isLimeValuesLoaded: state.explanation.isLimeValuesLoaded,
    shapValueList: state.explanation.shapValueList,
    isShapValuesLoaded: state.explanation.isShapValuesLoaded,
    iceValueList: state.explanation.iceValueList,
    isIceValuesLoaded: state.explanation.isIceValuesLoaded,
    skaterValueList: state.explanation.skaterValueList,
    isSkaterValuesLoaded: state.explanation.isSkaterValuesLoaded,
    traceList: state.traces.byId,
    predictionMethod: state.jobs.predictionMethod,
    prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
    selectedPrefixes: state.jobs.selectedPrefixes,
    jobsById: state.jobs.byId,
    jobId: state.jobs.predictionJobId,
    selectedTrace: state.jobs.selectedTrace,
    selectedAttribute: state.explanation.selectedAttribute,
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
    onRequestDecoding: (id) => dispatch(decodingRequested({id})),
    onRequestLimeValues: (jobId, traceId) => dispatch(limeValueListRequested({jobId, traceId})),
    onRequestShapValues: (jobId, traceId) => dispatch(shapValueListRequested({jobId, traceId})),
    onRequestIceValues: (jobId, attribute) => dispatch(iceValueListRequested({jobId, attribute})),
    onRequestSkaterValues: (jobId) => dispatch(skaterValueListRequested({jobId})),
    onRequestPredictionTemporalList: (jobId, traceId) =>
        dispatch(temporalPredictionListRequested({jobId, traceId})),
    onRequestLimeTemporalList: (jobId, traceId) =>
        dispatch(temporalLimePredictionListRequested({jobId, traceId})),
    onRequestFailLimeValues: () => dispatch(limeValueListFailed(null)),
    onRequestFailShapValues: () => dispatch(shapValueListFailed(null)),
    onRequestFailIceValues: () => dispatch(iceValueListFailed(null)),
    onRequestFailSkaterValues: () => dispatch(skaterValueListFailed(null)),
    onRequestFailPredictionTemporalList: ()=>
        dispatch(temporalPredictionListFailed(null)),
    onRequestFailLimeTemporalList: () =>
        dispatch(temporalLimePredictionListFailed(null)),
    onRequestFailDecodeDF: () =>
        dispatch(decodingFailed(null)),
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
