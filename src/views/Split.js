import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../actions/LogActions';
import SplitFormCard from '../components/split/SplitFormCard';
import SplitTableCard from '../components/split/SplitTableCard';

class Split extends Component {
  componentDidMount() {
    // TODO refactor this
    if (this.props.logs.length === 0) {
      this.props.onRequestLogList(true);
    } else {
      this.props.onRequestLogList(false);
    }
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <SplitFormCard logs={this.props.logs} fetchState={this.props.fetchState}
                         onSubmit={this.props.onSubmitSplit}/>
        </div>
        <div className="md-cell md-cell--12">
          <SplitTableCard splits={[]}/>
        </div>
      </div>
    );
  }
}

Split.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onSubmitSplit: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
};

const mapStateToProps = (state) => ({
  logs: state.logs.logs,
  // TODO replace with real split
  fetchState: {inFlight: false},
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onSubmitSplit: (payload) => {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Split);
