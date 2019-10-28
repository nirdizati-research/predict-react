import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import {
    CLASSIFICATION,
} from '../../reference';
import {jobPropType, selectLabelProptype} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';
import IncrementalTable from "./IncrementalTable";

const defaults = {
    'incremental_base_model': null
};

const methodConfig = 'incremental_train';

const compare = (a, b) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

const Incremental = (props) => {
    const helpText = () => {
        if (props.predictionMethod === CLASSIFICATION) {
            return <div key='key' className="md-cell md-cell--12"><p>
                Incremental learning allows for updating an already trained predictive model with new training
                traces at runtime. The algorithms incrementally update the starting predictive model rather than
                creating a new one from scratch.
            </p>
            </div>;
        } else {
            return <div key='key' className="md-cell md-cell--12"><p>
                Not yet implemented!
            </p>
            </div>;
        }
    };


    const makeModelSelector = (onClickCheckbox) => {
        const availableJobs = props.jobs.filter((job) => ((props.timeSeriesPrediction.includes(job.config.predictive_model['prediction_method']) ||
                                                               props.regression.includes(job.config.predictive_model['prediction_method']) ||
                                                               props.classification.includes(job.config.predictive_model['prediction_method'])) &&
                                                               job.type === 'prediction' && job.status === 'completed'));
     return [
        <IncrementalTable jobs={availableJobs.sort(compare)} onClickCheckbox={onClickCheckbox}/>
        ]
    };

    if (props.predictionMethod === CLASSIFICATION) {
        return [helpText(), ...makeModelSelector(props.onClickCheckbox)];
    } else {
        return [helpText()];
    }

};

Incremental.propTypes = {
    baseModel: selectLabelProptype,
    classification: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    regression: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    onClickCheckbox: PropTypes.func.isRequired
};
export default Incremental;
