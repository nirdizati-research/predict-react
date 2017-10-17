/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';

const names = ['Log 1', 'log 2', 'something.xes', 'reallylongandboringnametotestlimits.xes'];

const classJobs = [
  {
    'status': 'Completed',
    'run': 'KNN_simpleIndex_Kmeans',
    'log': 'test_bpi12_sorted.xes',
    'timestamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': '0',
    'uuid': 'uuuuuuuuuuuuu',
    'threshold': '2592000',
    'type': 'Classification'
  },
  {
    'status': 'Queued',
    'run': 'KNN_simpleIndex_Kmeans',
    'log': 'test_bpi12_sorted2.xes',
    'timeStamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': '0',
    'uuid': 'uuuuuuuuuuuuu2',
    'threshold': '2592000',
    'type': 'Classification'
  }];
const regJobs = [
  {
    'clustering': 'None',
    'status': 'completed',
    'run': 'linear_simpleIndex_None',
    'log': 'Production.xes',
    'encoding': 'simpleIndex',
    'timestamp': 'Oct 09 2017 12:44:42',
    'prefix': 0,
    'type': 'Regression',
    'regression': 'linear',
    'uuid': '82f9bf59-a15c-4b83-91af-9e1f714b9976'
  }];
const nextActivityJobs = [
  {
    'clustering': 'None',
    'status': 'queued',
    'run': 'KNN_simpleIndex_None',
    'log': 'Production.xes',
    'classification': 'KNN',
    'encoding': 'simpleIndex',
    'timestamp': 'Oct 09 2017 10:57:45',
    'prefix': 0,
    'type': 'NextActivity',
    'uuid': '1830e0ff-ebac-4396-8f54-5f7ad9247132'
  }
];

storiesOf('Validation', module)
  .add('ValidationHeaderCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ValidationHeaderCard logNames={names} fetchState={{inFlight: false}} logChange={(_) => _}
                                  methodChange={(_) => _}/>
          </div>
        </div>
      );
    }
  ).add('ConfigTableCard', () => {
  return (
    <div className="md-grid">
      <div className="md-cell md-cell--12">
        <ConfigTableCard jobs={classJobs} predictionMethod={CLASSIFICATION}/>
      </div>
      <div className="md-cell md-cell--12">
        <ConfigTableCard jobs={regJobs} predictionMethod={REGRESSION}/>
      </div>
      <div className="md-cell md-cell--12">
        <ConfigTableCard jobs={nextActivityJobs} predictionMethod={NEXT_ACTIVITY}/>
      </div>
    </div>
  );
});

