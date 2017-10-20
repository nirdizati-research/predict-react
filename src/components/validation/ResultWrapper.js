/**
 * Created by tonis.kasekamp on 10/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import ResultTableCard from './ResultTableCard';
import {classColumns, regColumns} from './ColumnHelper';
import BubbleChartCard from '../chart/BubbleChartCard';
import {sliceUuid} from '../../helpers';

const desc = 'Bubble chart by ';
const regTitles = ['regressor', 'clustering', 'encoding'].map((elem) => desc + elem);
const classTitles = ['classifier', 'clustering', 'encoding'].map((elem) => desc + elem);

const getChartHeader = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regColumns;
    case CLASSIFICATION:
      return classColumns;
    case NEXT_ACTIVITY:
      return regColumns;
  }
};

const getTitles = (predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regTitles;
    case CLASSIFICATION:
      return classTitles;
    case NEXT_ACTIVITY:
      return regTitles;
  }
};

const regressionMap = (jobs) => {
  return jobs.map((job) => [sliceUuid(job.uuid), job.run, job.result.mae, job.result.rmse, job.result.rscore]);
};

const classMap = (jobs) => {
  return jobs.map((job) => [sliceUuid(job.uuid), job.run, job.result.fmeasure, job.result.acc, job.result.auc]);
};

const prepareData = (jobs, predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regressionMap(jobs);
    case CLASSIFICATION:
      return classMap(jobs);
    case NEXT_ACTIVITY:
      return regressionMap(jobs);
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
  let charts;
  if (tableData.length > 0) {
    charts = getCharts(tableData, props.predictionMethod);
  }
  return <div className="md-cell md-cell--12 md-grid--no-spacing">
    <div className="md-cell md-cell--12">
      <ResultTableCard data={tableData} predictionMethod={props.predictionMethod}/>
    </div>
    {charts}

  </div>;
};

ResultWrapper.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    prefix: PropTypes.number.isRequired,
    rule: PropTypes.string,
    threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
    result: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
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
