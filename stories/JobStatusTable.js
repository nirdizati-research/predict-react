/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import JobStatusTable from '../src/components/JobStatusTable';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';


const jobs = [
  {
    'Status': 'Completed',
    'Run': 'KNN_simpleIndex_Kmeans',
    'Log': 'test_bpi12_sorted.xes',
    'TimeStamp': 'Sep 13 2017 10:55:13',
    'Rule': 'elapsed_time',
    'Prefix': '0',
    '__id__': 0,
    'Threshold': '2592000',
    '__version__': 2,
    'Type': 'Classification'
  },
  {
    'Status': 'Queued',
    'Run': 'KNN_simpleIndex_Kmeans',
    'Log': 'test_bpi12_sorted2.xes',
    'TimeStamp': 'Sep 13 2017 10:55:13',
    'Rule': 'elapsed_time',
    'Prefix': '0',
    '__id__': 2,
    'Threshold': '2592000',
    '__version__': 2,
    'Type': 'Classification'
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
