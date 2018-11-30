import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrainingFormCard from '../../components/TrainingFormCard';
import {submitTraining} from '../../actions/JobActions';
import {splitsToLabel} from '../../util/unNormalize';
import {splitsRequested} from '../../actions/SplitActions';
import {fetchStatePropType, selectLabelProptype} from '../../propTypes';
import {getLogProperties} from '../../util/splitStuff';
import {logListRequested} from '../../actions/LogActions';

class Training extends Component {
  constructor() {
    super();

    this.state = {
      split_id: 0
    };
  }

  componentDidMount() {
    this.props.onRequestLogList();
    this.props.onRequestSplitList();
  }

  onSplitChange(value) {
    this.setState({split_id: value});
  }

  render() {
    const {maxEventsInLog, traceAttributes} = this.props.getLogProperties(this.state.split_id);
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <TrainingFormCard splitLabels={this.props.splitLabels} fetchState={this.props.fetchState}
                            maxEventsInLog={maxEventsInLog} traceAttributes={traceAttributes}
                            onSubmit={this.props.onSubmitTraining} onSplitChange={this.onSplitChange.bind(this)}/>
        </div>
      </div>
    );
  }
}

Training.propTypes = {
  splitLabels: selectLabelProptype,
  onRequestLogList: PropTypes.func.isRequired,
  getLogProperties: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onSubmitTraining: PropTypes.func.isRequired,
  fetchState: fetchStatePropType
};

const mapStateToProps = (state) => ({
  getLogProperties: getLogProperties(state.splits.byId, state.logs.byId),
  splitLabels: splitsToLabel(state.logs.byId, state.splits.byId, state.splits.allIds),
  fetchState: state.training.fetchState,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestSplitList: () => dispatch(splitsRequested()),
  onRequestLogList: () => dispatch(logListRequested()),
  onSubmitTraining: (payload) => dispatch(submitTraining(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Training);
