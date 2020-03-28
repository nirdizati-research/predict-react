/**
 * Created by tonis.kasekamp on 10/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';
import ResultTableCard from './ResultTableCard';
import {getChartHeader, getPrefixChartHeader, getTitles} from './ColumnHelper';
import BubbleChartCard from '../chart/BubbleChartCard';
import {jobPropType} from '../../propTypes';
import ControlledLineChartCard from '../chart/ControlledLineChartCard';
import {toRun} from '../../util/dataReducers';
import ControlledRadarChartCard from '../chart/ControlledRadarChartCard';
import {Row} from 'react-grid-system';
import {Card} from 'react-md/lib/Cards/index';

const regressionMap = (jobs) => {
  return jobs.map((job) => [
      job.id + '',
      toRun(job),
      job.config.evaluation.mae,
      job.config.evaluation.rmse,
      job.config.evaluation.mape,
      job.config.encoding.prefix_length + '',
      job.config.evaluation.rscore]);
};

const classMap = (jobs) => {
  return jobs.map((job) => {
    const recall = job.config.evaluation.recall || 0;
    const precision = job.config.evaluation.precision || 0;
    const auc = job.config.evaluation.auc || 0;
    const acc = job.config.evaluation.accuracy || 0;
    const f1Score = job.config.evaluation.f1_score || 0;
    const prefixLength = job.config.encoding.prefix_length + '';
    const truePositive = job.config.evaluation.true_positive || 0;
    const trueNegative = job.config.evaluation.true_negative || 0;
    const falsePositive = job.config.evaluation.false_positive || 0;
    const falseNegative = job.config.evaluation.false_negative || 0;
    const elapsedTime = job.config.evaluation.elapsed_time || 0;
    return [job.id + '', toRun(job), f1Score, auc, acc, prefixLength, precision, recall,
      truePositive, trueNegative, falsePositive, falseNegative, elapsedTime];
  });
};

const timeSeriesPredMap = (jobs) => {
    return jobs.map((job) => {
        return [job.id + '', toRun(job), job.config.evaluation.nlevenshtein, job.config.encoding.prefix_length];
    });
};

const prepareData = (jobs, predictionMethod) => {
  switch (predictionMethod) {
    case REGRESSION:
      return regressionMap(jobs);
    case CLASSIFICATION:
      return classMap(jobs);
      case TIME_SERIES_PREDICTION:
          return timeSeriesPredMap(jobs);
    default:
      return [];
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
    <div className="md-cell md-cell--6" key="1">
      <BubbleChartCard data={filterData(chartDatas, 0)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[0]}/></div>,
    <div className="md-cell md-cell--6" key="2">
      <BubbleChartCard data={filterData(chartDatas, 1)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[1]}/></div>,
    <div className="md-cell md-cell--6" key="3">
      <BubbleChartCard data={filterData(chartDatas, 2)}
                       columns={headers}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle={titles[2]}/></div>,
    <div className="md-cell md-cell--6" key="4">
      <BubbleChartCard data={filterData(createChartDataNEWBETTER(data), 0)}
                       columns={getPrefixChartHeader(predictionMethod)}
                       hTitle={headers[1].label}
                       vTitle={headers[2].label}
                       cardTitle="Bubble chart by prefix length"/></div>
  ];
};

const ResultWrapper = (props) => {
  const tableData = prepareData(props.jobs, props.predictionMethod);
  let charts = [];
  let prefixChart; let radarChart;
  if (tableData.length > 0) {
    charts = getCharts(tableData, props.predictionMethod);
  }
  if (props.jobs.length > 0) {
    prefixChart = <ControlledLineChartCard jobs={props.jobs} predictionMethod={props.predictionMethod}/>;
    radarChart = <ControlledRadarChartCard jobs={props.jobs} predictionMethod={props.predictionMethod}/>;
  }
  return [<div className="md-cell md-cell--12" key="0">
    <ResultTableCard data={tableData} predictionMethod={props.predictionMethod}/>
  </div>,
  <Card className="md-cell md-cell--12" key="023">
    <Row>
    <div className="md-cell md-cell--6">
    {prefixChart}
    </div>
    <div className="md-cell md-cell--6">
      {radarChart}
    </div>
    </Row>
    </Card>,
     ...charts];
};

ResultWrapper.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION]).isRequired,
};

export default ResultWrapper;
