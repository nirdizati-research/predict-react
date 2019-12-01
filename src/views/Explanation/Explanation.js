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
    TRACE_CHANGED
} from '../../actions/JobActions';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import {traceListRequested} from '../../actions/TraceActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import TraceExplanation from '../../components/explanation/TraceExplanation';

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

        if ( split.id == splitId) {
          logId = split.training_log;
        }
      });

      return logId;
    }

    onChangeTrace(trace) {
        this.props.onTraceChange(trace);
        this.setState({selectedTrace: trace});
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

      getTraceIds() {
        let logs = this.props.logs;
        let logKeys = Object.keys(logs);
        let traceIds = [];

        let trainLogId = this.getTrainLogId(this.state.logName);
        logKeys.forEach(function (logKey) {
          let log = logs[logKey];
          if (log.id == trainLogId) {
              traceIds = traceIds.concat(log.properties.trace_IDs);
          }
        });
        return traceIds;
      }

      // getLimeValues() {
      //   let labels = [];
      //   let values = [];
      //   let eventLog = example4['eventLog1'];

      //   if (eventLog != null) {
      //     for (let i = 0; i < eventLog.length; i++) {
      //       let log = eventLog[i];
      //       let traceName = Object.keys(log)[i];
      //       if (traceName == this.state.selectedTrace) {
      //         for (let i = 0; i < log[traceName].length; i++) {
      //           labels.push(
      //              log[traceName][i][0],
      //           );
      //           values.push(
      //                log[traceName][i][1]
      //             );
      //         }
      //         break;
      //       }
      //     }
      //   }
      //   return ({labels: labels, values: values});
      // }

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
                                          />
                </div>
                <div className="md-cell md-cell--12">
                    <TraceExplanation jobs={this.props.jobs}
                                      traceChange={this.onChangeTrace.bind(this)}
                                      traceIdList={this.getTraceIds()}
                                      selectedTrace={this.props.selectedTrace}
                                      traceList={this.props.traceList}
                                      />
                </div>
                {/* <div className="md-cell md-cell--12">
                    <PostHocExplanation jobs={this.props.jobs}
                                        predictionMethod={this.props.predictionMethod}
                                        limeGraphValues={this.getLimeValues()}/>
                </div> */}
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
    traceList: state.traces.byId,
    predictionMethod: state.jobs.predictionMethod,
    prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
    selectedPrefixes: state.jobs.selectedPrefixes,
    jobsById: state.jobs.byId,
    selectedTrace: state.jobs.selectedTrace,
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
    onTraceChange: (trace) => dispatch({type: TRACE_CHANGED, trace})
});

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
