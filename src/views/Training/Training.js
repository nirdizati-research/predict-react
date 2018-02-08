import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrainingFormCard from '../../components/TrainingFormCard';
import {submitTraining} from '../../actions/JobActions';
import {splitsToString} from '../../util/dataReducers';
import {splitsRequested} from '../../actions/SplitActions';

class Training extends Component {
  componentDidMount() {
    // TODO refactor this
    this.props.onRequestSplitList();
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                            onSubmit={this.props.onSubmitTraining}/>
        </div>
      </div>
    );
  }
}

Training.propTypes = {
  splitLabels: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
};

const mapStateToProps = (state) => ({
  splitLabels: splitsToString(state.splits.splits),
  fetchState: state.training.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestSplitList: () => dispatch(splitsRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Training);
