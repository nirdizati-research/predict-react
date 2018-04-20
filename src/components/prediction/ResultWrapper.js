/**
 * Created by tonis.kasekamp on 10/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ResultTableCard from './ResultTableCard';
import {jobRunPropType} from '../../helpers';

const shortRun = (config) => {
  return `${config.method}_${config.encoding}_${config.clustering}_prefix_${config.prefix_length}`;
};


const prepareData = (jobsrun) => {
  return jobsrun.map((job) => [job.id + '', shortRun(job.config),
    job.type, job.result + '']);
};


const ResultWrapper = (props) => {
  const tableData = prepareData(props.jobsrun);
  return [<div className="md-cell md-cell--12" key="0">
    <ResultTableCard data={tableData}/>
  </div>]
};

ResultWrapper.propTypes = {
  jobsrun: PropTypes.arrayOf(jobRunPropType).isRequired,
};

export default ResultWrapper;
