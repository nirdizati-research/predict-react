/**
 * Created by tonis.kasekamp on 10/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import ResultTableCard from './ResultTableCard';
import {getChartHeader, getPrefixChartHeader, getTitles} from './ColumnHelper';
import BubbleChartCard from '../chart/BubbleChartCard';
import {jobPropType} from '../../helpers';

const shortRun = (config) => {
  return `${config.method}_${config.encoding}_${config.clustering}_prefix_${config.prefix_length}`;
};


const regressionMap = (jobs) => {
  return jobs.map((job) => [job.id + '', shortRun(job.config),
    job.result.mae, job.result.rmse, job.result.rscore, job.config.prefix_length + '']);
};

const classMap = (jobs) => {
  return jobs.map((job) => [job.id + '', shortRun(job.config),
    job.result.f1score, job.result.acc, job.result.auc, job.config.prefix_length + '']);
};

const prepareData = (jobs, predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regressionMap(jobs);
    case CLASSIFICATION:
      return classMap(jobs);
    case NEXT_ACTIVITY:
      return classMap(jobs);
    // no default
  }
};

// Good luck understanding this
const createChartData = (data) => {
  return data.map((row) => {
    const runSplit = row[1].split('_');
    return [
      [row[0], row[2], row[3], runSplit[0], row[4]],
      [row[0], row[2], row[3], runSplit[1], row[4]],
      [row[0], row[2], row[3], runSplit[2], row[4]]
    ];
  });
};

const createChartDataNEWBETTER = (data) => {
  return data.map((row) => {
    return [
      [row[0], row[2], row[3], row[5], row[4]],
    ];
  });
};

const filterData = (data, index) => {
  return data.map((jobData) => jobData[index]);
};

const getCharts = (data, predictionMethod) => {
  const headers = getChartHeader(predictionMethod);
  const chartDatas = createChartData(data);
  const titles = getTitles(predictionMethod);
  return [
    <div className="md-cell md-cell--12" key="1">
      <BubbleChartCard data={filterData(chartDatas, 0)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[0]}/></div>,
    <div className="md-cell md-cell--12" key="2">
      <BubbleChartCard data={filterData(chartDatas, 1)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[1]}/></div>,
    <div className="md-cell md-cell--12" key="3">
      <BubbleChartCard data={filterData(chartDatas, 2)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[2]}/></div>,
    <div className="md-cell md-cell--12" key="4">
      <BubbleChartCard data={filterData(createChartDataNEWBETTER(data), 0)}
                       columns={getPrefixChartHeader(predictionMethod)}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle="Accuracy by prefix length"/></div>
  ];
};

const ResultWrapper = (props) => {
  const tableData = prepareData(props.jobs, props.predictionMethod);
  let charts = [];
  if (tableData.length > 0) {
    charts = getCharts(tableData, props.predictionMethod);
  }
  return [<div className="md-cell md-cell--12" key="0">
    <ResultTableCard data={tableData} predictionMethod={props.predictionMethod}/>
  </div>, ...charts];
};

ResultWrapper.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
};

export default ResultWrapper;
