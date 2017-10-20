import React from 'react';
import {storiesOf} from '@kadira/storybook';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';


const jobs = [
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
  },
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
  },
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

storiesOf('ConfigTableCard', module)
  .add('thing', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ConfigTableCard jobs={jobs} selectChange={(_) => _}/>
          </div>
        </div>
      );
    }
  );
