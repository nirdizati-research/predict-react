import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onRequestLogList();
  }

  getLogNames() {
    return this.props.logs.map((x) => x.name);
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logNames={this.getLogNames()} fetchState={this.props.fetchState}/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    fetchState: PropTypes.shape({
      inFlight: PropTypes.bool.isRequired,
      error: PropTypes.any
    }).isRequired,
  })).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  logs: state.logs.logs,
  fetchState: state.logs.fetchState

});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: () => dispatch(logListRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
