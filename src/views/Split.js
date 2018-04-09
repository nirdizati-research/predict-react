import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../actions/LogActions';
import SplitFormCard from '../components/split/SplitFormCard';
import {splitsRequested, submitSplit} from '../actions/SplitActions';
import {SPLIT_DOUBLE, SPLIT_SINGLE} from '../reference';
import SingleSplitTableCard from '../components/split/SingleSplitTableCard';
import DoubleSplitTableCard from '../components/split/DoubleSplitTableCard';

class Split extends Component {
  componentDidMount() {
    // TODO refactor this
    if (this.props.logs.length === 0) {
      this.props.onRequestLogList(true);
    } else {
      this.props.onRequestLogList(false);
    }
    // Request on every page refresh. Not ideal
    this.props.onRequestSplitList();
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <SplitFormCard logs={this.props.logs} fetchState={this.props.fetchState}
                         onSubmit={this.props.onSubmitSplit}/>
        </div>
        <div className="md-cell md-cell--12">
          <SingleSplitTableCard splits={this.props.splits.filter((split) => split.type === SPLIT_SINGLE)}/>
        </div>
        <div className="md-cell md-cell--12">
          <DoubleSplitTableCard splits={this.props.splits.filter((split) => split.type === SPLIT_DOUBLE)}/>
        </div>
      </div>
    );
  }
}

Split.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.any).isRequired,
  splits: PropTypes.arrayOf(PropTypes.any).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onSubmitSplit: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
};

const mapStateToProps = (state) => ({
  logs: state.logs.logs,
  splits: state.splits.splits,
  fetchState: state.splits.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onSubmitSplit: (payload) => dispatch(submitSplit(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Split);
