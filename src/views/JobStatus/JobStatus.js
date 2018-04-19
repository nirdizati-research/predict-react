import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';
import {jobsRequested} from '../../actions/JobActions';
import JobStatusTable from '../../components/JobStatusTable';
import FetchState from '../../components/FetchState';
import {jobPropType} from '../../helpers';
import {SelectionControl} from 'react-md/lib/SelectionControls/index';

class JobStatus extends Component {
  constructor() {
    super();

    this.state = {
      showCompleted: false
    };
  }

  componentDidMount() {
    // Get only if empty
    // TODO move this check to somewhere else
    if (this.props.jobs === []) {
      this.props.onRequestJobs();
    }

    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
    }, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  checkboxChange(_, event) {
    // const value = event.target.value;
    switch (event.target.name) {
      case 'showCompleted':
        this.setState({showCompleted: !this.state.showCompleted});
        break;
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
                Lots of logs below. Only displays jobs that are not completed.
                See results on the validation page.
              </p>
              <Button raised onClick={this.props.onRequestJobs} inline>Request current jobs</Button>
              <SelectionControl id="showCompleted" name="showCompleted"
                                label="Show completed jobs" inline
                                type="switch" value={this.state.showCompleted}
                                onChange={this.checkboxChange.bind(this)}/>
              <FetchState fetchState={this.props.fetchState}/>
              <JobStatusTable jobs={jobs}/>
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
  onRequestJobs: () => dispatch(jobsRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(JobStatus);
