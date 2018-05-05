import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';
import LineChartCard from '../../components/chart/LineChartCard';
import {logPropType} from '../../helpers';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      log: null
    };
  }

  componentDidMount() {
    if (this.props.logList.length === 0) {
      return this.props.onRequestLogList();
    } else {
      // set first log by default
      this.setState({log: this.props.logList[0]});
      return this.props.onRequestLogList();
    }
  }


  componentDidUpdate(prevProps) {
    // set selected log when logs have arrived
    if (this.state.log === null && this.props.logList.length > 0) {
      this.setState({log: this.props.logList[0]});
    }
  }

  getVisibleLogId() {
    if (this.state.log) {
      return this.state.log.id;
    } else {
      return 0;
    }
  }

  getLineChart(dataName, cardTitle) {
    if (this.state.log && Object.keys(this.state.log.properties[dataName]).length !== 0) {
      return <LineChartCard fetchState={this.state.log.fetchState}
                            data={this.state.log.properties[dataName]}
                            cardTitle={cardTitle}
                            chartTitle="Number by day"/>;
    } else {
      return null;
    }
  }

  onChangeVisible(logId) {
    const log = this.props.logList.find((log) => log.id === logId);
    this.setState({log});
  }

  render() {
    const logList = this.props.logList.map((log) => ({id: log.id, name: log.name}));

    const executionChart = this.getLineChart('events', 'Number of events executed');
    const resourceChart = this.getLineChart('resources', 'Number of resources used');
    const newTracesChart = this.getLineChart('newTraces', 'Number of new traces');
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LogListCard logList={logList} fetchState={this.props.fetchState}
                       visibleLogId={this.getVisibleLogId()}
                       selectChange={this.onChangeVisible.bind(this)}/>
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

Logs.propTypes = {
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  logList: PropTypes.arrayOf(logPropType).isRequired,
  onRequestLogList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  logList: state.logs.logs,
  fetchState: state.logs.fetchState

});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: () => dispatch(logListRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
