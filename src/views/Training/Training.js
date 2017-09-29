import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';
import TrainingFormCard from '../../components/TrainingFormCard';
import {submitTraining} from '../../actions/JobActions';

class Training extends Component {
  componentDidMount() {
    // TODO refactor this
    if (this.props.logNames.length === 0) {
      this.props.onRequestLogList(true);
    } else {
      this.props.onRequestLogList(false);
    }
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard logNames={this.props.logNames} fetchState={this.props.fetchState}
                            onSubmit={this.props.onSubmitTraining}/>
        </div>
      </div>
    );
  }
}

Training.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
};

const mapStateToProps = (state) => ({
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.training.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: false})),
  onSubmitTraining: (endPoint, payload) => dispatch(submitTraining({endPoint, payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Training);
