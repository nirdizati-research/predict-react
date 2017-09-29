import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {changeVisibleLog, logListRequested} from '../../actions/LogActions';
import LineChartCard from '../../components/chart/LineChartCard';
import EventChartCard from '../../components/chart/EventChartCard';

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.logNames.length === 0) {
      return this.props.onRequestLogList(true);
    } else {
      return this.props.onRequestLogList(false);
    }
  }

  getVisibleLogName() {
    if (this.props.log) {
      return this.props.log.name;
    } else {
      return '';
    }
  }

  getLineChart(dataName, cardTitle) {
    if (this.props.log && Object.keys(this.props.log[dataName]).length !== 0) {
      return <LineChartCard fetchState={this.props.log.fetchState}
                            data={this.props.log.traces}
                            cardTitle={cardTitle}
                            chartTitle="Active traces"/>;
    } else {
      return null;
    }
  }

  // Not DRY :/
  getEventChart() {
    if (this.props.log && Object.keys(this.props.log.events).length !== 0) {
      return <EventChartCard fetchState={this.props.log.fetchState} data={this.props.log.events}/>;
    } else {
      return null;
    }
  }

  render() {
    const traceChart = this.getLineChart('traces', 'Number of traces');
    const resourceChart = this.getLineChart('traces', 'Number of resources');
    const eventChart = this.getEventChart();
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logNames={this.props.logNames} fetchState={this.props.fetchState}
                       visibleLogName={this.getVisibleLogName()}
                       selectChange={this.props.onChangeVisible}/>
        </div>
        <div className="md-cell md-cell--12">
          {traceChart}
        </div>
        <div className="md-cell md-cell--12">
          {resourceChart}
        </div>
        <div className="md-cell md-cell--12">
          {eventChart}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  log: PropTypes.shape({
    name: PropTypes.string.isRequired,
    events: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    resources: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    traces: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    visible: PropTypes.bool.isRequired,
    fetchState: PropTypes.shape({
      inFlight: PropTypes.bool.isRequired,
      error: PropTypes.any
    }).isRequired,
  }),
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.logs.logs.filter((log) => log.visible)[0],
  logNames: state.logs.logs.map((log) => log.name),
  fetchState: state.logs.fetchState

});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: true})),
  onChangeVisible: (logName) => dispatch(changeVisibleLog({logName, requestInfo: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
