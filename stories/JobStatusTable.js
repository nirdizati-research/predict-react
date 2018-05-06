/**
 * Created by Tõnis Kasekamp on 19.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import JobStatusTable from '../src/components/JobStatusTable';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {label1} from './Advanced';

const jobs = [
  {
    'id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'prefix_length': 1,
      'label': label1,
      'hyperopt': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
    },
    'status': 'completed',
    'result': {
      'f1score': 0.6666666666666666,
      'acc': 0.5,
      'auc': 0.5
    },
    'type': 'classification',
    'split_id': 1,
    'splitName': 'some name',
    'error': ''
  },
  {
    'id': 51,
    'created_date': '2017-12-05T16:13:40.278339Z',
    'modified_date': '2017-12-05T16:13:40.457762Z',
    'config': {
      'prefix_length': 1,
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'randomForest',
      'label': label1,
      'hyperopt': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
    },
    'status': 'completed',
    'result': {
      'f1score': 0.6666666666666666,
      'acc': 0.5,
      'auc': 0.5
    },
    'type': 'classification',
    'split_id': 1,
    'splitName': 'some name',
    'error': ''
  },
  {
    'id': 52,
    'created_date': '2017-12-05T16:13:40.278339Z',
    'modified_date': '2017-12-05T16:13:40.457762Z',
    'config': {
      'prefix_length': 1,
      'encoding': 'simpleIndex',
      'label': label1,
      'hyperopt': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
    },
    'status': 'completed',
    'result': {
      'true': 34,
      'false': 434
    },
    'type': 'labelling',
    'split_id': 1,
    'splitName': 'some name',
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
                <JobStatusTable jobs={jobs} showDeleteButton={false} onDelete={() => _}/>
              </CardText>
            </Card>
          </div>
        </div>
      );
    }
  );
