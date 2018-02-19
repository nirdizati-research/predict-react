/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';
import ResultWrapper from '../src/components/validation/ResultWrapper';
import {jobToConfigTable} from '../src/util/dataReducers';

const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
const classJobs = [
  {
    'id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default'
    },
    'status': 'completed',
    'result': {
      'f1score': 0.6666666666666666,
      'acc': 0.5,
      'auc': 0.5
    },
    'type': 'classification',
    'split': {
      'id': 1,
      'config': {},
      'original_log': {
        'id': 1,
        'name': 'general_example.xes'
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  },
  {
    'id': 3,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default'
    },
    'status': 'completed',
    'result': {
      'f1score': 0.766666666666666,
      'acc': 0.3,
      'auc': 0.2
    },
    'type': 'classification',
    'split': {
      'id': 1,
      'config': {},
      'original_log': {
        'id': 1,
        'name': 'general_example.xes'
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  }];

const regJobs = [
  {
    'id': 53,
    'created_date': '2018-02-07T22:47:32.146583Z',
    'modified_date': '2018-02-07T22:47:32.149647Z',
    'config': {
      'prefix_length': 0,
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'linear'
    },
    'status': 'created',
    'result': {},
    'type': 'regression',
    'split': {
      'id': 1,
      'config': {},
      'original_log': {
        'id': 1,
        'name': 'general_example.xes'
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  }];
const nextActivityJobs = [
  {
    'id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default'
    },
    'status': 'completed',
    'result': {
      'f1score': 0.6666666666666666,
      'acc': 0.5,
      'auc': 0.5
    },
    'type': 'nextActivity',
    'split': {
      'id': 1,
      'config': {},
      'original_log': {
        'id': 1,
        'name': 'general_example.xes'
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  },
];

storiesOf('Validation', module)
  .add('ValidationHeaderCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ValidationHeaderCard splitLabels={splitLabels} fetchState={{inFlight: false}} splitChange={(_) => _}
                                  methodChange={(_) => _}/>
          </div>
        </div>
      );
    }
  ).add('ConfigTableCard', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={classJobs.map(jobToConfigTable)} predictionMethod={CLASSIFICATION}/>
        </div>
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={regJobs.map(jobToConfigTable)} predictionMethod={REGRESSION}/>
        </div>
        <div className="md-cell md-cell--12">
          <ConfigTableCard jobs={nextActivityJobs.map(jobToConfigTable)} predictionMethod={NEXT_ACTIVITY}/>
        </div>
      </div>
    );
  }
).add('ResultWrapper classification', () => {
    return (
      <div className="md-grid">
        <ResultWrapper jobs={classJobs} predictionMethod={CLASSIFICATION}/>
      </div>
    );
  }
).add('ResultWrapper regression', () => {
    return (
      <div className="md-grid">
        <ResultWrapper jobs={regJobs} predictionMethod={REGRESSION}/>
      </div>
    );
  }
);
