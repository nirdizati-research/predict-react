import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import Button from 'react-md/lib/Buttons/Button';

class Upload extends Component {

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Card className="md-block-centered">
            <CardTitle title="Upload log"/>
            <CardText>
              <p>
                The log must be in the <code>XES</code> format.
              </p>
              <Button raised>Upload button?</Button>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
