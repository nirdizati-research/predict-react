import {storiesOf} from '@storybook/react';
import LogMetricsCard from '../src/components/training/LogMetricsCard';
import React from 'react';

export const log = {
  'id': 1,
  'name': 'general_example.xes',
  'properties': {
    'events': {
      '2010-12-30': 7,
      '2010-12-31': 1,
      '2011-01-05': 2,
      '2011-01-06': 8,
      '2011-01-07': 5,
      '2011-01-08': 4,
      '2011-01-09': 2,
      '2011-01-10': 1,
      '2011-01-11': 1,
      '2011-01-12': 1,
      '2011-01-14': 1,
      '2011-01-15': 1,
      '2011-01-16': 2,
      '2011-01-19': 1,
      '2011-01-20': 1,
      '2011-01-21': 2,
      '2011-01-23': 1,
      '2011-01-24': 1
    },
    'resources': {
      '2010-12-30': 4,
      '2010-12-31': 1,
      '2011-01-05': 2,
      '2011-01-06': 5,
      '2011-01-07': 3,
      '2011-01-08': 3,
      '2011-01-09': 1,
      '2011-01-10': 1,
      '2011-01-11': 1,
      '2011-01-12': 1,
      '2011-01-14': 1,
      '2011-01-15': 1,
      '2011-01-16': 1,
      '2011-01-19': 1,
      '2011-01-20': 1,
      '2011-01-21': 2,
      '2011-01-23': 1,
      '2011-01-24': 1
    },
    'newTraces': {
      '2010-12-30': 4,
      '2010-12-31': 1,
      '2011-01-05': 2,
      '2011-01-24': 1
    },
    'maxEventsInLog': 13
  }
};
storiesOf('LogMetricsCard', module)
  .add('this', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--4">
            <LogMetricsCard log={log}/>
          </div>
        </div>
      );
    }
  );
