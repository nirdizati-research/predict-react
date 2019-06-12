import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogListCard from '../../components/LogListCard';
import PropTypes from 'prop-types';
import {logListRequested} from '../../actions/LogActions';
import LineChartCard from '../../components/chart/LineChartCard';
import {fetchStatePropType, logsStore} from '../../propTypes';
import PetriNet from '../../components/chart/PetriNet';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      log: null
    };
  }

  componentDidMount() {
    this.props.onRequestLogList();
    if (this.props.logs.allIds.length > 0) {
      // set first log by default
      this.setState({log: this.props.logs.byId[this.props.logs.allIds[0]]});
    }
  }


  componentDidUpdate(prevProps) {
    // set selected log when logs have arrived
    if (this.state.log === null && this.props.logs.allIds.length > 0) {
      this.setState({log: this.props.logs.byId[this.props.logs.allIds[0]]});
    }
  }

  getVisibleLogId() {
    if (this.state.log) {
      return this.state.log.id;
    } else {
      return 0;
    }
  }

  getLineChart(dataName, cardTitle, chartTitle) {
    if (this.state.log && Object.keys(this.state.log.properties[dataName]).length !== 0) {
      return <LineChartCard data={this.state.log.properties[dataName]}
                            cardTitle={cardTitle}
                            chartTitle={chartTitle}/>;
    } else {
      return null;
    }
  }

  getPetriNet(dataName, cardTitle, chartTitle) {
    if (this.state.log && Object.keys(this.state.log.properties[dataName]).length !== 0) {
      return <PetriNet data={this.state.log.properties[dataName]}
                            cardTitle={cardTitle}
                            chartTitle={chartTitle}/>;
    } else {
      return null;
    }
  }

  onChangeVisible(logId) {
    const log = this.props.logs.byId[logId];
    this.setState({log});
  }

  render() {
    const logList = Object.values(this.props.logs.byId).map((log) => ({id: log.id, name: log.name}));

    const executionChart = this.getLineChart('events', 'Number of events executed per day', 'Number of events');
    const resourceChart = this.getLineChart('resources', 'Number of resources employed per day', 'Number of resources');
    const newTracesChart = this.getLineChart('newTraces', 'Number of new traces started per day', 'Number of traces');
    // const newPetriNet = this.getPetriNet('alpha_miner_result', 'Alpha Miner discovered Petri Net')
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
        {/* <div className="md-cell md-cell--12">*/}
          {/* {newPetriNet}*/}
        {/* </div>*/}
      </div>
    );
  }
}

Logs.propTypes = {
  fetchState: fetchStatePropType,
  logs: logsStore,
  onRequestLogList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  logs: state.logs,
  fetchState: state.logs.fetchState
});

const mapDispatchToProps = (dispatch) => ({
  onRequestLogList: () => dispatch(logListRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
