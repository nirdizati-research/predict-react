import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {changeVisibleLog, logListRequested} from '../../actions/LogActions';
import LineChartCard from '../../components/chart/LineChartCard';
import {logPropType} from '../../helpers';

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
    if (this.props.log && Object.keys(this.props.log.properties[dataName]).length !== 0) {
      return <LineChartCard fetchState={this.props.log.fetchState}
                            data={this.props.log.properties[dataName]}
                            cardTitle={cardTitle}
                            chartTitle="Number by day"/>;
    } else {
      return null;
    }
  }

  render() {
    const executionChart = this.getLineChart('events', 'Number of events executed');
    const resourceChart = this.getLineChart('resources', 'Number of resources used');
    const newTracesChart = this.getLineChart('newTraces', 'Number of new traces');
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
        <div className="md-cell md-cell--12">
          {newTracesChart}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  log: logPropType,
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
