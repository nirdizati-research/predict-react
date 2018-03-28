import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {changeVisibleLog, logListRequested} from '../../actions/LogActions';
import LineChartCard from '../../components/chart/LineChartCard';
import BarChartCard from '../../components/chart/BarChartCard';

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.logList.length === 0) {
      return this.props.onRequestLogList(true);
    } else {
      return this.props.onRequestLogList(false);
    }
  }

  getVisibleLogId() {
    if (this.props.log) {
      return this.props.log.id;
    } else {
      return 0;
    }
  }

  getLineChart(dataName, cardTitle) {
    if (this.props.log && Object.keys(this.props.log[dataName]).length !== 0) {
      return <LineChartCard fetchState={this.props.log.fetchState}
                            data={this.props.log[dataName]}
                            cardTitle={cardTitle}
                            chartTitle="Number by day"/>;
    } else {
      return null;
    }
  }

  // Not DRY :/
  getEventChart() {
    if (this.props.log && Object.keys(this.props.log.executions).length !== 0) {
      return <BarChartCard fetchState={this.props.log.fetchState} data={this.props.log.executions}
                           cardTitle="Event Occurrences"
                           hTitle="Number of Executions"
                           chartTitle="Events"/>;
    } else {
      return null;
    }
  }

  getEventInTraceChart() {
    if (this.props.log && Object.keys(this.props.log.eventsInTrace).length !== 0) {
      return <BarChartCard fetchState={this.props.log.fetchState}
                           data={this.props.log.eventsInTrace}
                           cardTitle="Number of events in trace"
                           hTitle="Number of events"
                           chartTitle="Traces"
                           description="This chart can be used to estimate the prefix_length"/>;
    } else {
      return null;
    }
  }

  render() {
    const executionChart = this.getLineChart('events', 'Number of events executed');
    const resourceChart = this.getLineChart('resources', 'Number of resources used');
    const eventChart = this.getEventChart();
    const eventsInTraceChart = this.getEventInTraceChart();
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logList={this.props.logList} fetchState={this.props.fetchState}
                       visibleLogId={this.getVisibleLogId()}
                       selectChange={this.props.onChangeVisible}/>
        </div>
        <div className="md-cell md-cell--12">
          {executionChart}
        </div>
        <div className="md-cell md-cell--12">
          {resourceChart}
        </div>
        <div className="md-cell md-cell--6">
          {eventChart}
        </div>
        <div className="md-cell md-cell--6">
          {eventsInTraceChart}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  log: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    events: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    resources: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    executions: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    eventsInTrace: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
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
  logList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.logs.logs.filter((log) => log.visible)[0],
  logList: state.logs.logs.map((log) => ({id: log.id, name: log.name})),
  fetchState: state.logs.fetchState

});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: (changeVisible) => dispatch(logListRequested({changeVisible, requestInfo: true})),
  onChangeVisible: (logId) => dispatch(changeVisibleLog({logId, requestInfo: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
