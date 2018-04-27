import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';
import {JOB_DELETE_REQUESTED, jobsRequested} from '../../actions/JobActions';
import JobStatusTable from '../../components/JobStatusTable';
import FetchState from '../../components/FetchState';
import {jobPropType} from '../../helpers';
import {Checkbox} from 'react-md/lib/SelectionControls/index';

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
    // Get only if empty
    // TODO move this check to somewhere else
    if (this.props.jobs === []) {
      this.props.onRequestJobs();
    }

    this.createInterval();
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
            <CardTitle title="Job status"/>
            <CardText>
              <p>
                There are {this.props.jobs.length} jobs in the front-end application.
              </p>
              <Button raised onClick={this.props.onRequestJobs}>Refresh list</Button>
              <Checkbox id="fetchJobs" name="fetchJobs"
                        label="Automatically fetch jobs" inline
                        checked={this.state.fetchJobs}
                        onChange={this.checkboxChange.bind(this)}/>
              <Checkbox id="showCompleted" name="showCompleted"
                        label="Show completed jobs" inline
                        checked={this.state.showCompleted}
                        onChange={this.checkboxChange.bind(this)}/>
              <Checkbox id="showDeleteButton" name="showDeleteButton"
                        label="Show delete button" inline
                        checked={this.state.showDeleteButton}
                        onChange={this.checkboxChange.bind(this)}/>
              <FetchState fetchState={this.props.fetchState}/>
              <JobStatusTable jobs={jobs} showDeleteButton={this.state.showDeleteButton}
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
  onDelete: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  fetchState: state.jobs.fetchState
});
const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested()),
  onDelete: (id) => dispatch({type: JOB_DELETE_REQUESTED, payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(JobStatus);
