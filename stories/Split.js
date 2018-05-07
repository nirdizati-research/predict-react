/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import SplitFormCard from '../src/components/split/SplitFormCard';
import {SPLIT_DOUBLE, SPLIT_SINGLE} from '../src/reference';
import DoubleSplitTableCard from '../src/components/split/DoubleSplitTableCard';
import SingleSplitTableCard from '../src/components/split/SingleSplitTableCard';
import {splitsToLabel} from '../src/util/unNormalize';


// these things are a hack with both id and log name
export const splits = [
  {
    'id': 1,
    'original_log': 1,
    'test_log': null,
    'training_log': null,
    'originalLogName': 'general_example.xes',
    'testLogName': '',
    'trainingLogName': '',
    'type': 'single',
    'config': {
      'split_type': 'split_random',
      'test_size': 0.5
    }
  },
  {
    'id': 2,
    'original_log': null,
    'test_log': 1,
    'training_log': 4,
    'originalLogName': '',
    'testLogName': 'general_example.xes',
    'trainingLogName': 'general_example2.xes',
    'type': 'double',
    'config': {
      'value': 123,
      'setting': 'something',
      'value2': 123,
      'setting2': 'something'
    }
  }
];

export const logList = [
  {
    'id': 1,
    'name': 'general_example.xes',
    'properties':
      {
        'events': {},
        'resources': {},
        'newTraces': {},
        'traceAttributes': [],
        'maxEventsInLog': 1
      }
  },
  {
    'id': 4,
    'name': 'nonlocal.mxml.gz',
    'properties':
      {
        'events': {},
        'resources': {},
        'newTraces': {},
        'traceAttributes': [],
        'maxEventsInLog': 123
      }
  },
  {
    'id': 123,
    'name': 'nonlocal2.mxml.gz',
    'properties':
      {
        'events': {},
        'resources': {},
        'newTraces': {},
        'traceAttributes': [],
        'maxEventsInLog': 1
      }
  }
];

export const logsById = Object.assign(...logList.map((log) => ({[log.id]: log})));
export const splitsById = Object.assign(...splits.map((split) => ({[split.id]: split})));
export const splitLabels = splitsToLabel(logsById, splitsById, [1, 2]);

storiesOf('Split', module)
  .add('SplitTableCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <SingleSplitTableCard splits={splits.filter((split) => split.type === SPLIT_SINGLE)}/>
          </div>
          <div className="md-cell md-cell--12">
            <DoubleSplitTableCard splits={splits.filter((split) => split.type === SPLIT_DOUBLE)}/>
          </div>
        </div>
      );
    }
  )
  .add('SplitFormCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <SplitFormCard logs={logsById} fetchState={{inFlight: false}} onSubmit={(_) => _}/>
          </div>
        </div>
      );
    }
  )
;
