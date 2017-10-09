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
