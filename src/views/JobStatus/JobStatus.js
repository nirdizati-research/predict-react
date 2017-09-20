import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';
import {jobsRequested} from '../../actions/JobActions';
import JobStatusTable from '../../components/JobStatusTable';

class JobStatus extends Component {
  componentDidMount() {
    // Get only if empty
    // TODO move this check to somewhere else
    // if (this.props.jobs === []) {
      this.props.onRequestJobs();
    // }
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Card className="md-block-centered">
            <CardTitle title="Job status"/>
            <CardText>
              <p>
                Lot's of logs below.
              </p>
              <Button raised>Start sync status</Button> <Button raised>Stop sync status</Button>
              <JobStatusTable jobs={this.props.jobs}/>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

JobStatus.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs
});
const mapDispatchToProps = (dispatch) => ({
  onRequestJobs: () => dispatch(jobsRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(JobStatus);
