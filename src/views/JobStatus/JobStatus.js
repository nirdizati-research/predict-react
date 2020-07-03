import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';
import {JOB_DELETE_REQUESTED, jobsRequested} from '../../actions/JobActions';
import JobStatusTable from '../../components/JobStatusTable';
import FetchState from '../../components/FetchState';
import {fetchStatePropType, jobPropType} from '../../propTypes';
import {Checkbox} from 'react-md/lib/SelectionControls/index';
import {logListRequested} from '../../actions/LogActions';
import {splitsRequested} from '../../actions/SplitActions';
import {mapJobs} from '../../util/unNormalize';
import ReactGA from 'react-ga';

// Greater numbers first
const compare = (a, b) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

class JobStatus extends Component {
  constructor() {
    super();

    this.state = {
      showCompleted: false,
      fetchJobs: true,
      showDeleteButton: false
    };
  }

  componentDidMount() {
    this.props.onRequestLogList();
    this.props.onRequestSplitList();
    if (this.props.jobs === []) {
      this.props.onRequestJobs();
    }

    this.createInterval();
    ReactGA.initialize('UA-143444044-1');
    ReactGA.pageview(window.location.hash);
  }

  createInterval() {
    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
    }, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  checkboxChange(_, event) {
    const checked = event.target.checked;
    switch (event.target.name) {
      case 'showCompleted':
        this.setState({showCompleted: checked});
        break;
      case 'showDeleteButton':
        this.setState({showDeleteButton: checked});
        break;
      case 'fetchJobs': {
        if (this.state.fetchJobs) {
          clearInterval(this.state.intervalId);
        } else {
          this.createInterval();
        }
        this.setState({fetchJobs: checked});
        break;
      }
      // no default
    }
  }

  render() {
    const jobs = this.state.showCompleted ?
      this.props.jobs : this.props.jobs.filter((job) => job.status !== 'completed');
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Card className="md-block-centered">
            <CardTitle title="Task status"/>
            <CardText>
              <p>
                There are {this.props.jobs.length} tasks in the front-end application.
              </p>
              <Button raised onClick={this.props.onRequestJobs}>Refresh list</Button>
              <Checkbox id="fetchJobs" name="fetchJobs"
                        label="Automatically fetch tasks" inline
                        checked={this.state.fetchJobs}
                        onChange={this.checkboxChange.bind(this)}/>
              <Checkbox id="showCompleted" name="showCompleted"
                        label="Show also completed tasks" inline
                        checked={this.state.showCompleted}
                        onChange={this.checkboxChange.bind(this)}/>
              <Checkbox id="showDeleteButton" name="showDeleteButton"
                        label="Show delete button" inline
                        checked={this.state.showDeleteButton}
                        onChange={this.checkboxChange.bind(this)}/>
              <FetchState fetchState={this.props.fetchState}/>
              <JobStatusTable jobs={jobs.sort(compare)} showDeleteButton={this.state.showDeleteButton}
                              onDelete={this.props.onDelete}/>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

JobStatus.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
  onRequestLogList: PropTypes.func.isRequired,
  onRequestSplitList: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fetchState: fetchStatePropType,
};

const mapStateToProps = (state) => ({
  jobs: mapJobs(state.logs.byId, state.splits.byId, state.jobs.byId, state.jobs.allIds),
  fetchState: state.jobs.fetchState
});
const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onRequestLogList: () => dispatch(logListRequested()),
  onRequestSplitList: () => dispatch(splitsRequested()),
  onDelete: (id) => dispatch({type: JOB_DELETE_REQUESTED, payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(JobStatus);
