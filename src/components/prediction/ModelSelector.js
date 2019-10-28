import React, {Component} from 'react';
import {Card} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import {Button, CardText} from 'react-md';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';

class ModelSelector extends Component {
  selectChange({method}, value, _) {
    this.props.modelChange({method}, value);
  }

  render() {
      const regJobsLabels = this.props.regJobs.map(job => {
          return {value: job. id, label: job.id + ' '
              + job.config.encoding.data_encoding + ' ' + job.config.encoding.value_encoding + ' '
              + job.config.encoding.prefix_length + ' ' + job.config.encoding.task_generation_type + ' '
              + job.config.labelling.type};
      });
      const classJobsLabels = this.props.classJobs.map(job => {
          return {value: job. id, label: job.id + ' '
              + job.config.encoding.data_encoding + ' ' + job.config.encoding.value_encoding + ' '
              + job.config.encoding.prefix_length + ' ' + job.config.encoding.task_generation_type + ' '
              + job.config.labelling.type};
      });
      const timeSeriesJobsLabels = this.props.timeSeriesPredJobs.map(job => {
          return {value: job. id,
              label: job.id + ' ' + job.config.encoding.data_encoding + ' ' + job.config.encoding.value_encoding + ' '
              + job.config.encoding.prefix_length + ' ' + job.config.encoding.task_generation_type + ' '
              + job.config.labelling.type};
      });
    return (
      <Card className="md-block-centered">
        <CardText>
          <div className="md-grid">
            <div className="md-cell md-cell--6">
              <h4>Regression Model Selection</h4>
              <SelectField
                id="regression-model-select"
                placeholder="model #,Clustering,EncodingMethod,RegressionMethod"
                className="md-cell"
                menuItems={regJobsLabels}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this, {method: REGRESSION})}
                value={this.props.regModelId}
              />
            </div>
            <div className="md-cell md-cell--6">
              <h4>Classification Model Selection</h4>
              <SelectField
                id="classification-model-select"
                placeholder="model #,Clustering,EncodingMethod,ClassificationMethod"
                className="md-cell"
                menuItems={classJobsLabels}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this, {method: CLASSIFICATION})}
                value={this.props.classModelId}
              />
            </div>
              <div className="md-cell md-cell--6">
                  <h4>Time Series Prediction Model Selection</h4>
                  <SelectField
                      id="time-series-model-select"
                      placeholder="model #,Clustering,EncodingMethod,TimeSeriesPredictionMethod"
                      className="md-cell"
                      menuItems={timeSeriesJobsLabels}
                      position={SelectField.Positions.BELOW}
                      onChange={this.selectChange.bind(this, {method: TIME_SERIES_PREDICTION})}
                      value={this.props.timeSeriesPredModelId}
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
    regJobs: PropTypes.arrayOf(jobPropType).isRequired,
    classJobs: PropTypes.arrayOf(jobPropType).isRequired,
    timeSeriesPredJobs: PropTypes.arrayOf(jobPropType).isRequired,
    modelChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    classModelId: PropTypes.number.isRequired,
    regModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired
};
export default ModelSelector;
