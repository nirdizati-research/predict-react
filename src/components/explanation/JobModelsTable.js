import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {fetchStatePropType, jobPropType} from '../../propTypes';
import LabelConfigTable from '../validation/LabelConfigTable';
import {jobToValidationTable} from '../../util/dataReducers';
// import ConfigTable from './ConfigTable';

const JobModelsTable = (props) => {
    const jobChange = (value, _) => {
        props.jobChange(value);
    };

    const getJobIds = () => {
       let jobIds = props.jobs.map((job) =>{
            return job.id;
        });
        return jobIds;
      };
    return <Card className="md-block-centered">
        <CardTitle title="Select job id">
            <SelectField
               id="method-select"
               placeholder="Method id"
               className="md-cell"
               menuItems={getJobIds()}
               onChange={jobChange}
               position={SelectField.Positions.BELOW}
               value={props.jobId}
            />
        </CardTitle>
        <CardText>
            <h4>Available models</h4>
            <LabelConfigTable jobs={props.jobs.map(jobToValidationTable)} onClick={props.onClick}/>
            <FetchState fetchState={props.fetchState}/>
        </CardText>
    </Card>;
};


JobModelsTable.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    fetchState: fetchStatePropType,
    predictionMethod: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    jobId: PropTypes.number.isRequired,
    jobChange: PropTypes.func.isRequired,

};
export default JobModelsTable;
