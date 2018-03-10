import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';
import {jobsRequested} from '../../actions/JobActions';
import JobStatusTable from '../../components/JobStatusTable';
import FetchState from '../../components/FetchState';
import {jobPropType} from '../../helpers';

class JobStatus extends Component {
  componentDidMount() {
    // Get only if empty
    // TODO move this check to somewhere else
    if (this.props.jobs === []) {
      this.props.onRequestJobs();
    }

    setInterval(() => {
      this.props.onRequestJobs();
    }, 10000);
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Card className="md-block-centered">
            <CardTitle title="Job status"/>
            <CardText>
              <p>
                Lots of logs below.
              </p>
              <Button raised onClick={this.props.onRequestJobs}>Request current jobs</Button>
              <FetchState fetchState={this.props.fetchState}/>
              <JobStatusTable jobs={this.props.jobs}/>
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
