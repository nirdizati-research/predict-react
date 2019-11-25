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
import {limeValueListRequested} from '../../actions/LimeActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import PostHocExplanation from '../../components/explanation/post_hoc';
import TraceExplanation from '../../components/explanation/TraceExplanation';
import data from '../../mock-json/example.json';
import example4 from '../../mock-json/example4.json';

class Explanation extends Component {
    constructor(props) {
        const selectedTrace = '';
        const logName ='';
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
            this.props.onRequestLime();
        }
        ReactGA.initialize('UA-143444044-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    onChangeMethod(method) {
        this.props.onMethodChange(method);
    }

    onJobClick(id) {
        // console.log(id);
        // this.props.clickedJobId = id; //TODO correct state
    }
    getTranceIdList(logName='eventLog1') {
        let traceIdList = [];
        let eventLog = data[logName];
        if (eventLog != null) {
for (let i = 0; i < eventLog.length; i++) {
            const trace = eventLog[i];
            traceIdList.push(trace['trace_id']);
          }
}
        return traceIdList;
      }

      getTraceAttribute() {
        let logName='eventLog1';
        let traceId = this.state.selectedTrace;
        let traceList = [];
        let traceAttributes;
        let eventLog = data[logName];
        if (eventLog != null) {
for (let i = 0; i < eventLog.length; i++) {
            const trace = eventLog[i];
            if (trace['trace_id'] === traceId) {
              traceAttributes = {
                trace_id: trace['trace_id'],
                Age: trace['Age'],
                Diagnosis: trace['Diagnosis'],
                Diagnosis_Treatment_Combination_ID:
                  trace['Diagnosis Treatment Combination ID'],
                Diagnosis_code: trace['Diagnosis code'],
                End_date: trace['End date'],
                Start_date: trace['Start date'],
                Specialism_code: trace['Specialism code'],
                Treatment_code: trace['Treatment code'],
                label: trace['label']
              };
              let count = 0;
              for (let key in trace) if (trace.hasOwnProperty(key)) count++;
              const size = (count - 10) / 8;
              for (let j = 1; j <= size; j++) {
                const val = {
                  id: j,
                  prefix: trace['prefix_' + j],
                  activity_code: trace['Activity code_' + j],
                  number_of_execution: trace['Number of executions_' + j],
                  producer_code: trace['Producer code_' + j],
                  section: trace['Section_' + j],
                  specialism_code: trace['Specialism code_' + j],
                  group: trace['group_' + j],
                  lifecycle: trace['lifecycle:transition_' + j]
                };
                traceList.push(val);
              }
              break;
            }
          }
}
        return {
          traceList: traceList,
          traceAttributes: traceAttributes
        };
      }

      getLimeValues() {
        let labels = [];
        let values = [];
        let eventLog = example4['eventLog1'];

        if (eventLog != null) {
          for (let i = 0; i < eventLog.length; i++) {
            let log = eventLog[i];
            let traceName = Object.keys(log)[i];
            if (traceName == this.state.selectedTrace) {
              for (let i = 0; i < log[traceName].length; i++) {
                labels.push(
                   log[traceName][i][0],
                );
                values.push(
                     log[traceName][i][1]
                  );
              }
              break;
            }
          }
        }
        return ({labels: labels, values: values});
      }

    render() {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <ExplanationHeaderCard jobs={this.props.jobs}
                                           splitLabels={this.props.splitLabels}
                                           fetchState={this.props.fetchState}
                                           splitChange={this.onChangeSplit.bind(this)}
                                           selectedSplitId={this.props.splitId}
                                           predictionMethod={this.props.predictionMethod}
                                           onClick={this.onJobClick.bind(this)}/>
                </div>
                <div className="md-cell md-cell--12">
                    <TraceExplanation jobs={this.props.jobs}
                                      traceChange={this.onChangeTrace.bind(this)}
                                      traceList={this.getTranceIdList()}
                                      selectedTrace={this.state.selectedTrace}
                                      traceAttributes={this.getTraceAttribute()}
                                      />
                </div>
                <div className="md-cell md-cell--12">
                    <PostHocExplanation jobs={this.props.jobs}
                                        predictionMethod={this.props.predictionMethod}
                                        limeGraphValues={this.getLimeValues()}/>
                </div>
                {/* <div className="md-cell md-cell--12">
                    <AnteHocExplanation jobs={this.props.jobs}
                                        splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                                        methodChange={this.onChangeMethod.bind(this)}
                                        splitChange={this.onChangeSplit.bind(this)}
                                        prefixLengths={prefixStrings}
                                        predictionMethod={this.props.predictionMethod}
                                        selectedPrefixes={this.props.selectedPrefixes}
                                        prefixChange={this.onChangePrefix.bind(this)}
                                        selectedSplitId={this.props.splitId}
                                        filterOptionChange={this.props.filterOptionChange}
                                        filterOptions={this.props.filterOptions}
                                        labelChange={this.props.labelTypeChange}/>
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
    onRequestLime: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    onMethodChange: PropTypes.func.isRequired,
    onTraceChange: PropTypes.func.isRequired,
    onPrefixChange: PropTypes.func.isRequired,
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
    limeValueList: PropTypes.any
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.filteredIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.jobs.uniqueSplits),
    fetchState: state.jobs.fetchState,
    splitId: state.jobs.splitId,
    limeValueList: state.lime.limeValueList,
    predictionMethod: state.jobs.predictionMethod,
    prefixLengths: state.jobs.prefixLengths.sort((a, b) => (a - b)),
    selectedPrefixes: state.jobs.selectedPrefixes,
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
    onRequestLime: () => dispatch(limeValueListRequested()),
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
