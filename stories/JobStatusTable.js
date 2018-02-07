/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import JobStatusTable from '../src/components/JobStatusTable';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';

const jobs = [
  {
    'status': 'Completed',
    'run': 'knn_simpleIndex_kmeans',
    'log': 'test_bpi12_sorted.xes',
    'timestamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': 0,
    'uuid': 'uuuuuuuuuuuuu',
    'threshold': '2592000',
    'type': 'classification'
  },
  {
    'status': 'Queued',
    'run': 'knn_simpleIndex_kmeans',
    'log': 'test_bpi12_sorted2.xes',
    'timestamp': 'Sep 13 2017 10:55:13',
    'rule': 'elapsed_time',
    'prefix': 0,
    'uuid': 'uuuuuuuuuuuuu2',
    'threshold': '2592000',
    'type': 'classification'
  }
];

storiesOf('JobStatusTable', module)
  .add('thing', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="JobStatusTable"/>
              <CardText>
                <JobStatusTable jobs={jobs}/>
              </CardText>
            </Card>
          </div>
        </div>
      );
    }
  );
