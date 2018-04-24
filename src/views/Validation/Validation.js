import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfigTableCard from '../../components/validation/ConfigTableCard';
import {CLASSIFICATION, REGRESSION} from '../../reference';
import {
  FILTER_OPTION_CHANGED,
  FILTER_PREDICTION_METHOD_CHANGED,
  FILTER_PREFIX_LENGTH_CHANGED,
  FILTER_SPLIT_CHANGED,
  jobsRequested
} from '../../actions/JobActions';
import ValidationHeaderCard from '../../components/validation/ValidationHeaderCard';
import ResultWrapper from '../../components/validation/ResultWrapper';
import {jobPropType} from '../../helpers';
import {splitsToString} from '../../util/dataReducers';

class Validation extends Component {
  onChangePrefix(prefixLength) {
    this.props.onPrefixChange(prefixLength);
  }

  onChangeSplit(splitId) {
    this.props.onSplitChange(splitId);
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) {
      this.props.onRequestJobs();
    }
  }

  onChangeMethod(method) {
    this.props.onMethodChange(method);
  }

  render() {
    // Only unique splits for selector
    const splitLabels = splitsToString(this.props.uniqueSplits);
    const prefixStrings = this.props.prefixLengths.map((p) => p + '');

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <ValidationHeaderCard splitLabels={splitLabels} fetchState={this.props.fetchState}
                                methodChange={this.onChangeMethod.bind(this)}
                                splitChange={this.onChangeSplit.bind(this)}
                                prefixLengths={prefixStrings} predictionMethod={this.props.predictionMethod}
                                selectedPrefixes={this.props.selectedPrefixes}
                                prefixChange={this.onChangePrefix.bind(this)}
                                selectedSplitId={this.props.splitId} filterOptionChange={this.props.filterOptionChange}
                                filterOptions={this.props.filterOptions}/>
        </div>
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={this.props.jobs}
                           predictionMethod={this.props.predictionMethod}/>
        </div>
        <ResultWrapper jobs={this.props.jobs} predictionMethod={this.props.predictionMethod}/>
      </div>
    );
  }
}

Validation.propTypes = {
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  onPrefixChange: PropTypes.func.isRequired,
  filterOptionChange: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION]).isRequired,
  splitId: PropTypes.number.isRequired,
  uniqueSplits: PropTypes.arrayOf(PropTypes.any).isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  filterOptions: PropTypes.shape({
    encodings: PropTypes.arrayOf(PropTypes.string).isRequired,
    clusterings: PropTypes.arrayOf(PropTypes.string).isRequired,
    classification: PropTypes.arrayOf(PropTypes.string).isRequired,
    regression: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.filteredJobs,
  fetchState: state.jobs.fetchState,
  uniqueSplits: state.jobs.uniqueSplits,
  splitId: state.jobs.splitId,
  predictionMethod: state.jobs.predictionMethod,
  prefixLengths: state.jobs.prefixLengths,
  selectedPrefixes: state.jobs.selectedPrefixes,
  filterOptions: (({encodings, clusterings, classification, regression}) => ({
    encodings,
    clusterings,
    classification,
    regression
  }))(state.jobs)
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  filterOptionChange: (_, event) => dispatch({
    type: FILTER_OPTION_CHANGED,
    payload: {name: event.target.name, value: event.target.value}
  }),
  onSplitChange: (splitId) => dispatch({type: FILTER_SPLIT_CHANGED, splitId}),
  onMethodChange: (method) => dispatch({type: FILTER_PREDICTION_METHOD_CHANGED, method}),
  onPrefixChange: (prefixLength) => dispatch({type: FILTER_PREFIX_LENGTH_CHANGED, prefixLength})
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
