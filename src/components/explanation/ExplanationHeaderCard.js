/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import LabelConfigTable from '../validation/LabelConfigTable';
import {jobToValidationTable} from '../../util/dataReducers';
// import ConfigTable from './ConfigTable';

const ExplanationHeaderCard = (props) => {
    // const checkBoxChange = (value, event) => {
    //   props.prefixChange(event.target.value);
    // };

    const selectChange = (value, _) => {
        props.splitChange(value);
    };

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
        <CardTitle title="Select event log">
            <SelectField
                id="log-name-select"
                placeholder="No log selected"
                className="md-cell"
                menuItems={props.splitLabels}
                position={SelectField.Positions.BELOW}
                onChange={selectChange}
                value={props.selectedSplitId}
            /></CardTitle>

        <CardText>
            <h4>Available models</h4>
            <LabelConfigTable jobs={props.jobs.map(jobToValidationTable)} onClick={props.onClick}/>
            <FetchState fetchState={props.fetchState}/>
        </CardText>
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
    </Card>;
};


ExplanationHeaderCard.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    splitLabels: selectLabelProptype,
    fetchState: fetchStatePropType,
    splitChange: PropTypes.func.isRequired,
    selectedSplitId: PropTypes.number.isRequired,
    predictionMethod: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    jobId: PropTypes.number.isRequired,
    jobChange: PropTypes.func.isRequired,

};
export default ExplanationHeaderCard;
