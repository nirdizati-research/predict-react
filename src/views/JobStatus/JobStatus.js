import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';

class JobStatus extends Component {

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
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

JobStatus.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(JobStatus);
