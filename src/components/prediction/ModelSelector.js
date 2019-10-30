import React, {Component} from 'react';
import {Card} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import {Button, CardText} from 'react-md';

class ModelSelector extends Component {
  selectChange(value, _) {
    this.props.jobChange(value);
  }

  render() {
      const jobsLabels = this.props.jobs.map(job => {
          return {value: job. id, label: job.id + ' '
                  + job.config.predictive_model.predictive_model + ' '
                  + job.config.encoding.data_encoding + ' ' + job.config.encoding.value_encoding + ' '
                  + job.config.encoding.prefix_length + ' ' + job.config.encoding.task_generation_type + ' '
                  + job.config.labelling.type};
      });
    return (
      <Card className="md-block-centered">
        <CardText>
          <div className="md-grid">
            <div className="md-cell md-cell--6">
              <h4>Job Selection</h4>
              <SelectField
                id="job-select"
                placeholder="model #,Clustering,EncodingMethod,Method"
                className="md-cell"
                menuItems={jobsLabels}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this)}
                value={this.props.jobId}
              />
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
    jobChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    jobId: PropTypes.number.isRequired,
};
export default ModelSelector;
