import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrainingFormCard from '../../components/TrainingFormCard';
import {submitTraining} from '../../actions/JobActions';
import {splitsToString} from '../../util/dataReducers';
import {splitsRequested} from '../../actions/SplitActions';
import {splitLabels} from '../../helpers';
import {getLogProperties} from '../../util/splitStuff';

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
    this.setState(getLogProperties(this.props.splits, value));
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
