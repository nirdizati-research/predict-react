import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfigTableCard from '../../components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {FILTER_PREDICTION_METHOD_CHANGED, FILTER_SPLIT_CHANGED, jobsRequested} from '../../actions/JobActions';
import ValidationHeaderCard from '../../components/validation/ValidationHeaderCard';
import ResultWrapper from '../../components/validation/ResultWrapper';
import {jobPropType} from '../../helpers';
import {splitsToString} from '../../util/dataReducers';

class Validation extends Component {
  onChangePrefix(prefixLength) {
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
    // console.log(splitLabels)
    const prefixStrings = this.props.prefixLengths.map((p) => p+'');

    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <ValidationHeaderCard splitLabels={splitLabels} fetchState={this.props.fetchState}
                                methodChange={this.onChangeMethod.bind(this)}
                                splitChange={this.onChangeSplit.bind(this)}
                                prefixLengths={prefixStrings} prefixChange={this.onChangePrefix.bind(this)}/>
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
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
  splitId: PropTypes.number.isRequired,
  uniqueSplits: PropTypes.arrayOf(PropTypes.any).isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.filteredJobs,
  fetchState: state.jobs.fetchState,
  uniqueSplits: state.jobs.uniqueSplits,
  splitId: state.jobs.splitId,
  predictionMethod: state.jobs.predictionMethod,
  prefixLengths: state.jobs.prefixLengths,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onSplitChange: (splitId) => dispatch({type: FILTER_SPLIT_CHANGED, splitId: splitId}),
  onMethodChange: (method) => dispatch({type: FILTER_PREDICTION_METHOD_CHANGED, method: method})
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
