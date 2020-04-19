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
    decodingFailed,
    encodedUniqueValuesRequested,
} from '../../actions/JobActions';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import {traceListRequested} from '../../actions/TraceActions';
import {limeValueListRequested, iceValueListRequested, shapValueListRequested,
    skaterValueListRequested, limeValueListFailed, shapValueListFailed, iceValueListFailed,
    skaterValueListFailed, cffeedbackValueListFailed,
    cffeedbackValueListRequested,
    retrainValueListRequested,
    retrainValueListFailed} from '../../actions/ExplanationActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import PostHocExplanation from '../../components/explanation/post_hoc';
import DecodedDFTable from '../../components/explanation/DecodedDFTable';
import TraceExplanation from '../../components/explanation/TraceExplanation';
import {getTraceIdsFromLogs, parseLimeResult, parseICEResult, getDecodedDFTable,
    getFeatureNames, getUniqueFeatureValues, encodePatternsForDropdown} from '../../util/dataReducers';
import JobModelsTable from '../../components/explanation/JobModelsTable';
import TemporalStability from '../../components/explanation/TemporalStability';
import {temporalPredictionListRequested, temporalLimePredictionListRequested,
    temporalLimePredictionListFailed, temporalPredictionListFailed} from '../../actions/PredictionAction';
import ShapResult from '../../components/explanation/ShapResult';
import ICEResult from '../../components/explanation/ICEResult';
import SkaterResult from '../../components/explanation/SkaterResult';
import {Row} from 'react-grid-system';
import CfFeedback from '../../components/explanation/CfFeedback';

class Explanation extends Component {
    constructor(props) {
        let selectedTrace = '';
        let selectedAttribute = '';
        let selectedFeatureNames = [];
        let selectedFeatureValues = [];
        const logName = 0;
        let topK = -1;
        super(props);
        this.state = {
          selectedTrace,
          selectedAttribute,
          logName,
          topK,
          selectedFeatureNames,
          selectedFeatureValues
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
        this.props.onRequestFailCfFeedbackValues(null);
        this.props.onRequestFailRetrainValues(null);
        this.props.onRequestFailEncodeUniqueValuesDF(null);
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

    onSubmitFeatureNamesAndValues(data) {
        this.props.onRequestRetrainValues(this.props.jobId, data);
    }

    onSubmitTopK(topK) {
        this.setState({topK: topK});
        this.props.onRequestCfFeedbackValues(this.props.jobId, topK);
    }

    onChangeJob(id) {
        this.props.onJobChange(id);
        // if (this.props.selectedTrace !== '') {
        //     this.props.onRequestLimeValues(id, this.props.selectedTrace);
        //     this.props.onRequestLimeTemporalList(id, this.props.selectedTrace);
        //     this.props.onRequestPredictionTemporalList(id, this.props.selectedTrace);
        //     this.props.onRequestShapValues(id, this.props.selectedTrace);
        // }
        // this.props.onRequestSkaterValues(id);
        // this.props.onRequestDecoding(id);
        this.props.onRequestEncodeUniqueValuesDF(id);
        // this.props.onRequestIceValues(id, this.state.selectedAttribute);
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
                    <ICEResult
                        jobs = {this.props.jobs}
                        iceValueList = {parseICEResult(this.props.iceValueList)}
                        originalList = {this.props.iceValueList}
                        isIceValuesLoaded = {this.props.isIceValuesLoaded}
                        selectedAttribute={this.state.selectedAttribute}
                        attributes ={this.filterJobsById(this.props.jobId) != undefined ?
                        this.filterJobsById(this.props.jobId).config.encoding.features: []}
                        onChangeFeature = {this.onChangeFeature.bind(this)}
                        >
                    </ICEResult>
                </div >
                <div className="md-cell md-cell--12">
                    <ShapResult
                        jobs = {this.props.jobs}
                        shapValueList = {this.props.shapValueList}
                        isShapValuesLoaded = {this.props.isShapValuesLoaded}
                        traceId={this.props.selectedTrace}
                        jobId={this.props.jobId}
                        />
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
                            <CfFeedback
                                jobId={this.props.jobId}
                                cfFeedbackValue={this.props.cfFeedbackValue}
                                isCfFeedbackValuesLoaded={this.props.isCfFeedbackValuesLoaded}
                                retrainValue={this.props.retrainValue}
                                isRetrainValuesLoaded={this.props.isRetrainValuesLoaded}
                                isEncodedUniqueValuesLoaded={this.props.isEncodedUniqueValuesLoaded}
                                featureNames={getFeatureNames(this.props.encodedUniqueValues)}
                                featureValues={getUniqueFeatureValues(this.props.encodedUniqueValues)}
                                patterns={encodePatternsForDropdown(this.props.cfFeedbackValue)}
                                onSubmitTopK={this.onSubmitTopK.bind(this)}
                                onSubmitFeatureNamesAndValues = {this.onSubmitFeatureNamesAndValues.bind(this)}/>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

Explanation.propTypes = {
    fetchState: fetchStatePropType,
    splitLabels: selectLabelProptype,
    onRequestLogList: PropTypes.func,
    onRequestSplitList: PropTypes.func,
    onRequestJobs: PropTypes.func,
    onRequestDecoding: PropTypes.func,
    onSplitChange: PropTypes.func,
    onMethodChange: PropTypes.func,
    onTraceChange: PropTypes.func,
    onPrefixChange: PropTypes.func,
    onRequestTraces: PropTypes.func,
    onJobChange: PropTypes.func,
    onRequestLimeValues: PropTypes.func,
    onRequestSkaterValues: PropTypes.func,
    onRequestShapValues: PropTypes.func,
    onRequestIceValues: PropTypes.func,
    onRequestPredictionTemporalList: PropTypes.func,
    onRequestLimeTemporalList: PropTypes.func,
    onRequestCfFeedbackValues: PropTypes.func,
    onRequestRetrainValues: PropTypes.func,
    onRequestEncodeUniqueValuesDF: PropTypes.func,
    onRequestFailLimeValues: PropTypes.func,
    onRequestFailLimeTemporalList: PropTypes.func,
    onRequestFailPredictionTemporalList: PropTypes.func,
    onRequestFailShapValues: PropTypes.func,
    onRequestFailSkaterValues: PropTypes.func,
    onRequestFailIceValues: PropTypes.func,
    onRequestFailDecodeDF: PropTypes.func,
    onRequestFailEncodeUniqueValuesDF: PropTypes.func,
    onRequestFailCfFeedbackValues: PropTypes.func,
    onRequestFailRetrainValues: PropTypes.func,
    filterOptionChange: PropTypes.func,
    labelTypeChange: PropTypes.func,
    jobs: PropTypes.arrayOf(jobPropType),
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION, LABELLING]),
    splitId: PropTypes.number,
    prefixLengths: PropTypes.arrayOf(PropTypes.number),
    selectedPrefixes: PropTypes.arrayOf(PropTypes.number),
    filterOptions: PropTypes.shape({
        encodings: PropTypes.arrayOf(PropTypes.string),
        clusterings: PropTypes.arrayOf(PropTypes.string),
        classification: PropTypes.arrayOf(PropTypes.string),
        regression: PropTypes.arrayOf(PropTypes.string),
        timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string),
        labelling: PropTypes.any,
        padding: PropTypes.string,
        attributeNames: PropTypes.arrayOf(PropTypes.string),
        thresholds: PropTypes.arrayOf(PropTypes.number)
    }),
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
    encodedUniqueValues: PropTypes.any,
    cfFeedbackValue: PropTypes.any,
    retrainValue: PropTypes.any,
    jobId: PropTypes.number,
    isLimeTempStabilityLoaded: PropTypes.bool,
    isPredictionTempStabilityLoaded: PropTypes.bool,
    isLimeValuesLoaded: PropTypes.bool,
    isShapValuesLoaded: PropTypes.bool,
    isSkaterValuesLoaded: PropTypes.bool,
    isIceValuesLoaded: PropTypes.bool,
    isDecodedValueLoaded: PropTypes.bool,
    isEncodedUniqueValuesLoaded: PropTypes.bool,
    isCfFeedbackValuesLoaded: PropTypes.bool,
    isRetrainValuesLoaded: PropTypes.bool,
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
    cfFeedbackValue: state.explanation.cfFeedbackValue,
    isCfFeedbackValuesLoaded: state.explanation.isCfFeedbackLoaded,
    retrainValue: state.explanation.retrainValue,
    isRetrainValuesLoaded: state.explanation.isRetrainLoaded,
    encodedUniqueValues: state.jobs.encodedUniqueValues,
    isEncodedUniqueValuesLoaded: state.jobs.isEncodedUniqueValuesLoaded,
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
    onRequestEncodeUniqueValuesDF: (id) => dispatch(encodedUniqueValuesRequested({id})),
    onRequestLimeValues: (jobId, traceId) => dispatch(limeValueListRequested({jobId, traceId})),
    onRequestShapValues: (jobId, traceId) => dispatch(shapValueListRequested({jobId, traceId})),
    onRequestIceValues: (jobId, attribute) => dispatch(iceValueListRequested({jobId, attribute})),
    onRequestSkaterValues: (jobId) => dispatch(skaterValueListRequested({jobId})),
    onRequestPredictionTemporalList: (jobId, traceId) =>
        dispatch(temporalPredictionListRequested({jobId, traceId})),
    onRequestLimeTemporalList: (jobId, traceId) =>
        dispatch(temporalLimePredictionListRequested({jobId, traceId})),
    onRequestCfFeedbackValues: (jobId, attribute) => dispatch(cffeedbackValueListRequested({jobId, attribute})),
    onRequestRetrainValues: (jobId, data) =>
        dispatch(retrainValueListRequested({jobId, data})),
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
    onRequestFailCfFeedbackValues: () =>
        dispatch(cffeedbackValueListFailed(null)),
    onRequestFailRetrainValues: () =>
        dispatch(retrainValueListFailed(null)),
    onRequestFailEncodeUniqueValuesDF: () =>
    dispatch(retrainValueListFailed(null)),
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
