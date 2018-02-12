/**
 * Created by tonis.kasekamp on 10/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import ResultTableCard from './ResultTableCard';
import {getChartHeader, getTitles} from './ColumnHelper';
import BubbleChartCard from '../chart/BubbleChartCard';

const shortRun = (config) => {
  return `${config.method}_${config.encoding}_${config.clustering}`;
};


const regressionMap = (jobs) => {
  return jobs.map((job) => [job.id, shortRun(job.config), job.result.mae, job.result.rmse, job.result.rscore]);
};

const classMap = (jobs) => {
  return jobs.map((job) => [job.id, shortRun(job.config), job.result.f1score, job.result.acc, job.result.auc]);
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
                       cardTitle={titles[2]}/></div>
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
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    split: PropTypes.any.isRequired,
    type: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
    config: PropTypes.shape({
      prefix_length: PropTypes.number.isRequired,
      threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      method: PropTypes.string.isRequired,
      clustering: PropTypes.string,
      encoding: PropTypes.string,
      rule: PropTypes.string
    }).isRequired,
    created_date: PropTypes.string.isRequired,
    modified_date: PropTypes.string.isRequired,
    result: PropTypes.shape({
      mae: PropTypes.number,
      rmse: PropTypes.number,
      rscore: PropTypes.number,
      fmeasure: PropTypes.number,
      acc: PropTypes.number,
      auc: PropTypes.number,
    }).isRequired
  })).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
};

export default ResultWrapper;
