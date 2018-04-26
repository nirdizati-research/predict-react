import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrainingFormCard from '../../components/TrainingFormCard';
import {submitTraining} from '../../actions/JobActions';
import {splitsToString} from '../../util/dataReducers';
import {splitsRequested} from '../../actions/SplitActions';
import {splitLabels} from '../../helpers';
import {SPLIT_SINGLE} from '../../reference';

class Training extends Component {
  constructor() {
    super();

    this.state = {
      maxEventsInLog: 0,
      traceAttributes: []
    };
  }

  componentDidMount() {
    // TODO refactor this
    this.props.onRequestSplitList();
    if (this.props.splitLabels.length > 0) {
      this.onSplitChange(this.props.splitLabels[0].value);
    }
  }

  onSplitChange(value) {
    const split = this.props.splits.filter((split) => split.id === value)[0];
    let logs;
    if (split.type === SPLIT_SINGLE) {
      logs = [split.original_log];
    } else {
      logs = [split.training_log, split.test_log];
    }
    this.getMaxEvents(logs);
  }

  getMaxEvents(logs) {
    const arr = logs.map((log) => log.properties.maxEventsInLog);
    const max = arr.reduce(function (a, b) {
      return Math.max(a, b);
    });
    this.setState({maxEventsInLog: max, traceAttributes: logs[0].properties.traceAttributes});
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                            maxEventsInLog={this.state.maxEventsInLog} traceAttributes={this.state.traceAttributes}
                            onSubmit={this.props.onSubmitTraining} onSplitChange={this.onSplitChange.bind(this)}/>
        </div>
      </div>
    );
  }
}

Training.propTypes = {
  splitLabels: splitLabels,
  splits: PropTypes.any,
  onRequestSplitList: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
};

const mapStateToProps = (state) => ({
  splitLabels: splitsToString(state.splits.splits),
  splits: state.splits.splits,
  fetchState: state.training.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestSplitList: () => dispatch(splitsRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Training);
