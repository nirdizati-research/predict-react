import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logListRequested} from '../actions/LogActions';
import RemainingTimeCard from '../components/RemainingTimeCard';

class RemainingTimeTraining extends Component {
  componentDidMount() {
    // TODO refactor this
    if (this.props.logNames.length === 0) {
      return this.props.onRequestLogList(true);
    } else {
      return this.props.onRequestLogList(false);
    }
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <RemainingTimeCard logNames={this.props.logNames}/>
        </div>
      </div>
    );
  }
}

RemainingTimeTraining.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.logs.logs.filter((log) => log.visible)[0],
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.logs.fetchState

});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested(changeVisible))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemainingTimeTraining);
