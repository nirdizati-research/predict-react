/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import SplitTableCard from '../src/components/split/SplitTableCard';
import SplitFormCard from '../src/components/split/SplitFormCard';

export const splits = [
  {
    'id': 1,
    'original_log': {
      'id': 1,
      'name': 'general_example.xes',
      'properties':
        {
          'events': {},
          'resources': {},
          'executions': {},
          'maxEventsInLog': 1
        }
    },
    'test_log': null,
    'training_log': null,
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'original_log': null,
    'test_log': {
      'id': 1,
      'name': 'general_example.xes',
      'properties':
        {
          'events': {},
          'resources': {},
          'executions': {},
          'maxEventsInLog': 1
        }
    },
    'training_log': {
      'id': 2,
      'name': 'general_example2.xes',
      'properties':
        {
          'events': {},
          'resources': {},
          'executions': {},
          'maxEventsInLog': 1
        }
    },
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
        'executions': {},
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
        'executions': {},
        'maxEventsInLog': 1
      }
  },
  {
    'id': 123,
    'name': 'nonlocal2.mxml.gz',
    'properties':
      {
        'events': {},
        'resources': {},
        'executions': {},
        'maxEventsInLog': 1
      }
  }
];


storiesOf('Split', module)
  .add('SplitTableCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <SplitTableCard splits={splits}/>
          </div>
        </div>
      );
    }
  )
  .add('SplitFormCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <SplitFormCard logs={logList} fetchState={{inFlight: false}} onSubmit={(_) => _}/>
          </div>
        </div>
      );
    }
  )
;
