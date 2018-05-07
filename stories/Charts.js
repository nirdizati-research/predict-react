/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import LineChartCard from '../src/components/chart/LineChartCard';
import BubbleChartCard from '../src/components/chart/BubbleChartCard';
import ResultTableCard from '../src/components/validation/ResultTableCard';
import {getChartHeader} from '../src/components/validation/ColumnHelper';
import {CLASSIFICATION, REGRESSION} from '../src/reference';
import BarChartCard from '../src/components/chart/BarChartCard';
import {label1} from './Advanced';
import PrefixLineChart from '../src/components/chart/PrefixLineChart';

const fetchState = {inFlight: false};

const traces = {
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
  '2011-10-07': 83
};

const notOrderedTraces = {
  '2011-10-06': 80,
  '2011-10-03': 119,
  '2011-10-01': 23,
  '2011-10-05': 106,
  '2011-10-07': 83,
  '2011-10-04': 85
};

const resources = {
  '2011-10-01': 7,
  '2011-10-03': 13,
  '2011-10-04': 12,
  '2011-10-05': 14,
  '2011-10-06': 11,
  '2011-10-07': 13,
  '2011-10-08': 7,
};

const eventsInTrace = {
  '1': 5,
  '2': 5,
  '3': 9,
  '4': 5,
  '5': 13,
  '6': 5
};

const events = {
  'W_Assessing_application': 4098,
  'W_Calling _missing_information': 1647,
  'W_Calling_after_offers': 4464,
  'W_Check_for_fraud': 130,
  'W_Filling_in application': 6117,
  'W_Fixing_incoming_lead': 3588
};
const regressor = [
  ['uuid121', 321.16984512656944, 470.1483088530332, 'linear', -0.75205320910182749],
  ['uuid122', 218.33484913201886, 218.33484913201886, 'xboost', 0.10676014147290103]
];

const regTableData = [
  ['uuid121', 'linear', 321.16984512656944, 470.1483088530332, -0.75205320910182749],
  ['uuid122', 'xboost', 218.33484913201886, 218.33484913201886, 0.10676014147290103]
];
const classData = [
  ['uuid121', 0.7152600170502984, 0.6232374506486181, 'knn_simpleIndex_noCluster_clustering', 0.63384260739574716],
  ['uuid122', 0.933152664859982, 0.9165256627185561, 'decisionTree_simpleIndex_kmeans_clustering', 0.9605116926217754],
  ['uuid123', 0.7300537412153782, 0.6408140814081408, 'knn_boolean_noCluster_clustering', 0.62917375812309062]
];

const classTableData = [
  ['uuid121', 'knn_simpleIndex_noCluster_clustering', 0.7152600170502984, 0.6232374506486181, 0.63384260739574716],
  ['uuid122', 'decisionTree_simpleIndex_kmeans_clustering', 0.933152664859982, 0.9165256627185561, 0.9605116926217754],
  ['uuid123', 'knn_boolean_noCluster_clustering', 0.7300537412153782, 0.6408140814081408, 0.62917375812309062]
];

const someData = [
  ['uuid121', 321.16984512656944, 470.1483088530332, '1', -0.75205320910182749],
  ['uuid122', 218.33484913201886, 218.33484913201886, '2', 0.10676014147290103]
];

const someColumns = [
  {
    type: 'string',
    label: 'id',
  },
  {
    type: 'number',
    label: 'fmeasure',
  },
  {
    type: 'number',
    label: 'acc',
  },
  {
    type: 'string',
    label: 'Prefix length',
  },
  {
    type: 'number',
    label: 'auc',
  }
];

export const labelJobs = [
  {
    'id': 4,
    'split_id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'status': 'completed',
    'config': {
      'prefix_length': 1,
      'encoding': 'simpleIndex',
      'label': label1
    },
    'result': {'rmse': 221, 'mae': 193},
    'type': 'labelling',
  },
  {
    'id': 5,
    'split_id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'status': 'completed',
    'config': {
      'prefix_length': 4,
      'encoding': 'simpleIndex',
      'label': label1
    },
    'result': {'rmse': 201, 'mae': 165, 'third': 34},
    'type': 'labelling',
  },
  {
    'id': 6,
    'split_id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'status': 'completed',
    'config': {
      'prefix_length': 3,
      'encoding': 'simpleIndex',
      'label': label1
    },
    'result': {'rmse': 191, 'mae': 138},
    'type': 'labelling',
  },
  {
    'id': 7,
    'split_id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'status': 'completed',
    'config': {
      'prefix_length': 5,
      'encoding': 'simpleIndex',
      'label': label1
    },
    'result': {'rmse': 171, 'mae': 128},
    'type': 'labelling',
  }
];

storiesOf('Charts', module)
  .add('PrefixLineChart', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <PrefixLineChart
            jobs={labelJobs}/>
        </div>
      </div>
    );
  })
  .add('LineChartCard', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LineChartCard data={traces}
                         cardTitle="Number of traces"
                         chartTitle="Active traces"/>
        </div>
        <div className="md-cell md-cell--12">
          <LineChartCard data={notOrderedTraces}
                         cardTitle="Modern art"
                         chartTitle="Messed up order of object"/>
        </div>
        <div className="md-cell md-cell--12">
          <LineChartCard data={resources}
                         cardTitle="Number of resources"
                         chartTitle="Active traces"/>
        </div>

        <div className="md-cell md-cell--12">
          <LineChartCard data={{}}
                         cardTitle="Number of resources empty"
                         chartTitle="Empty chart"/>
        </div>
        <div className="md-cell md-cell--12">
          <BarChartCard data={events}
                        cardTitle="Event Occurrences"
                        hTitle="Number of Executions"
                        chartTitle="Events"/>
        </div>
        <div className="md-cell md-cell--12">
          <BarChartCard data={{'true': 343, 'false': 3434}}
                        cardTitle="Lablels"
                        hTitle="Number of Executionsasdad"
                        chartTitle="asdasfd"/>
        </div>
        <div className="md-cell md-cell--12">
          <BarChartCard data={eventsInTrace}
                        cardTitle="Number of events in trace"
                        hTitle="Number of events"
                        chartTitle="Event count"
                        description="This chart can be used to estimate the prefix_length"/>
        </div>
      </div>
    );
  })
  .add('BubbleChartCard', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <BubbleChartCard
            data={regressor}
            columns={getChartHeader(REGRESSION)}
            hTitle="Mae"
            vTitle="Rmse"
            cardTitle="Bubble chart by regressor"/>
        </div>
        <div className="md-cell md-cell--12">
          <BubbleChartCard
            data={classData}
            columns={getChartHeader(CLASSIFICATION)}
            hTitle="fmeasure"
            vTitle="accuracy"
            cardTitle="Bubble chart by classificator"/>
        </div>
        <div className="md-cell md-cell--12">
          <BubbleChartCard
            data={someData}
            columns={someColumns}
            hTitle="fmeasure"
            vTitle="accuracy"
            cardTitle="Bubble chart by prefix length"/>
        </div>
      </div>
    );
  })
  .add('ResultTableCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ResultTableCard fetchState={fetchState}
                             data={classTableData} predictionMethod={CLASSIFICATION}/>
          </div>
          <div className="md-cell md-cell--12">
            <ResultTableCard fetchState={fetchState}
                             data={regTableData} predictionMethod={REGRESSION}/>
          </div>
        </div>
      );
    }
  );
