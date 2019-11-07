import React, {Component} from 'react';
import {Card} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import {Button, CardText} from 'react-md';
import IncrementalTable from '../advanced/IncrementalTable';

const compare = (a, b) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

class ModelSelector extends Component {
  render() {
    return (
      <Card className="md-block-centered">
        <CardText>
          <div className="md-grid">
            <div className="md-cell md-cell--12">
              <h4>Job Selection</h4>
              <IncrementalTable key={this.props.jobs.id} jobs={this.props.jobs.sort(compare)}
                                onClickCheckbox={this.props.onClickCheckbox}/>
            </div>
            <div className="md-cell md-cell--12">
              <Button raised primary swapTheming onClick={this.props.onSubmit}
                      className="buttons__group">Submit</Button>
              <Button raised secondary swapTheming onClick={this.props.onReset}
                      className="buttons__group">Reset</Button>
            </div>
          </div>
        </CardText>
      </Card>);
  }
}


ModelSelector.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
};
export default ModelSelector;
