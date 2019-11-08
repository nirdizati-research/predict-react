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
    jobsRequested
} from '../../actions/JobActions';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {mapJobs, splitsToLabel} from '../../util/unNormalize';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import ReactGA from 'react-ga';
import ExplanationHeaderCard from '../../components/explanation/ExplanationHeaderCard';
import PostHocExplanation from '../../components/explanation/post_hoc';
import AnteHocExplanation from '../../components/explanation/ante_hoc';
import TraceExplanation from '../../components/explanation/TraceExplanation';

class Explanation extends Component {
    onChangePrefix(prefixLength) {
        this.props.onPrefixChange(prefixLength);
    }

    onChangeSplit(splitId) {
        this.props.onSplitChange(splitId);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(_) {
        if (this.props.predictionMethod === LABELLING) {
            this.props.onMethodChange(REGRESSION);
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
        // console.log(id);
        // this.props.clickedJobId = id; //TODO correct state
    }

    render() {
        // Only unique splits for selector
        const prefixStrings = this.props.prefixLengths.map((p) => p + '');

        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <ExplanationHeaderCard jobs={this.props.jobs}
                                           splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                                           methodChange={this.onChangeMethod.bind(this)}
                                           splitChange={this.onChangeSplit.bind(this)}
                                           prefixLengths={prefixStrings} predictionMethod={this.props.predictionMethod}
                                           selectedPrefixes={this.props.selectedPrefixes}
                                           prefixChange={this.onChangePrefix.bind(this)}
                                           selectedSplitId={this.props.splitId}
                                           filterOptionChange={this.props.filterOptionChange}
                                           filterOptions={this.props.filterOptions}
                                           labelChange={this.props.labelTypeChange}
                                           onClick={this.onJobClick.bind(this)}/>
                </div>
                <div className="md-cell md-cell--12">
                    <TraceExplanation jobs={this.props.jobs}
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
                                      labelChange={this.props.labelTypeChange}
                                      clickedJobId={this.props.clickedJobId}/>
                </div>
                <div className="md-cell md-cell--12">
                    <PostHocExplanation jobs={this.props.jobs}
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
                </div>
                <div className="md-cell md-cell--12">
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
    clickedJobId: PropTypes.number
};

const mapStateToProps = (state) => ({
    jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.filteredIds),
    splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.jobs.uniqueSplits),
    fetchState: state.jobs.fetchState,
    splitId: state.jobs.splitId,
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

export default connect(mapStateToProps, mapDispatchToProps)(Explanation);
