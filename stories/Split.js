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
    'originalLogName': 'Log.xes',
    'testLogName': '',
    'trainingLogName': '',
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'originalLogName': '',
    'testLogName': 'TestLog.xes',
    'trainingLogName': 'TrainingLog.xes',
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
    'name': 'general_example.xes'
  },
  {
    'id': 4,
    'name': 'nonlocal.mxml.gz'
  },
  {
    'id': 123,
    'name': 'nonlocal2.mxml.gz'
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
