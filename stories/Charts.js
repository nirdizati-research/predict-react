/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import LineChartCard from '../src/components/chart/LineChartCard';
import EventChartCard from '../src/components/chart/EventChartCard';
import BubbleChartCard from '../src/components/chart/BubbleChartCard';
import ResultTableCard from '../src/components/validation/ResultTableCard';
import {classColumns, regColumns} from '../src/components/validation/ColumnHelper';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';

const fetchState = {inFlight: false};

const traces = {
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
  '2011-10-07': 83
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
  ['uuid121', 0.7152600170502984, 0.6232374506486181, 'KNN_simpleIndex_None_clustering', 0.63384260739574716],
  ['uuid122', 0.933152664859982, 0.9165256627185561, 'DecisionTree_simpleIndex_kmeans_clustering', 0.9605116926217754],
  ['uuid123', 0.7300537412153782, 0.6408140814081408, 'KNN_boolean_None_clustering', 0.62917375812309062]
];

const classTableData = [
  ['uuid121', 'KNN_simpleIndex_None_clustering', 0.7152600170502984, 0.6232374506486181, 0.63384260739574716],
  ['uuid122', 'DecisionTree_simpleIndex_kmeans_clustering', 0.933152664859982, 0.9165256627185561, 0.9605116926217754],
  ['uuid123', 'KNN_boolean_None_clustering', 0.7300537412153782, 0.6408140814081408, 0.62917375812309062]
];

storiesOf('Charts', module)
  .add('LineChartCard', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LineChartCard fetchState={fetchState}
                         data={traces}
                         cardTitle="Number of traces"
                         chartTitle="Active traces"/>
        </div>
        <div className="md-cell md-cell--12">
          <LineChartCard fetchState={fetchState}
                         data={resources}
                         cardTitle="Number of resources"
                         chartTitle="Active traces"/>
        </div>
        <div className="md-cell md-cell--12">
          <EventChartCard fetchState={fetchState} data={events}/>
        </div>
      </div>
    );
  })
  .add('BubbleChartCard', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <BubbleChartCard fetchState={fetchState}
                           data={regressor}
                           columns={regColumns}
                           hTitle="Mae"
                           vTitle="Rmse"
                           cardTitle="Bubble chart by regressor"/>
        </div>
        <div className="md-cell md-cell--12">
          <BubbleChartCard fetchState={fetchState}
                           data={classData}
                           columns={classColumns}
                           hTitle="fmeasure"
                           vTitle="accuracy"
                           cardTitle="Bubble chart by classificator"/>
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
          <div className="md-cell md-cell--12">
            <ResultTableCard fetchState={fetchState}
                             data={regTableData} predictionMethod={NEXT_ACTIVITY}/>
          </div>
        </div>
      );
    }
  );
