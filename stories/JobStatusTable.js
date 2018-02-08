/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import JobStatusTable from '../src/components/JobStatusTable';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';

const jobs = [
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
    'id': 51,
    'created_date': '2017-12-05T16:13:40.278339Z',
    'modified_date': '2017-12-05T16:13:40.457762Z',
    'config': {
      'rule': 'remaining_time',
      'prefix_length': 1,
      'threshold': 'default',
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'randomForest'
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
