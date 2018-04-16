/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import LineChartCard from '../src/components/chart/LineChartCard';
import BubbleChartCard from '../src/components/chart/BubbleChartCard';
import ResultTableCard from '../src/components/validation/ResultTableCard';
import {getChartHeader} from '../src/components/validation/ColumnHelper';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';
import BarChartCard from '../src/components/chart/BarChartCard';
import ControlledLineChartCard from '../src/components/chart/ControlledLineChartCard';

export const regJobs = [
  {
    'id': 4,
    'created_date': '2018-04-14T06:19:46.660000Z',
    'modified_date': '2018-04-14T06:22:03.597000Z',
    'config': {
      'prefix_length': 1,
      'regression.linear': {'fit_intercept': false, 'normalize': false, 'copy_X': true},
      'encoding': 'complex',
      'clustering': 'noCluster',
      'method': 'linear'
    },
    'status': 'completed',
    'result': {'rmse': 221.72427510287082, 'mae': 193.11309325742712, 'rscore': -0.060008504856852385},
    'type': 'regression',
    'split': {
      'id': 4,
      'config': {},
      'original_log': {
        'id': 5,
        'name': 'financial_log.xes.gz',
        'properties': {
          'events': {},
          'resources': {},
          'newTraces': {},
          'maxEventsInLog': 119,
          'traceAttributes': []
        }
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  },
  {
    'id': 5,
    'created_date': '2018-04-14T06:29:21.355000Z',
    'modified_date': '2018-04-14T06:30:24.760000Z',
    'config': {
      'prefix_length': 3,
      'regression.linear': {'fit_intercept': true, 'normalize': false, 'copy_X': true},
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'linear'
    },
    'status': 'completed',
    'result': {'rmse': 201.76464727647456, 'mae': 165.3624707580213, 'rscore': 0.12224386445773794},
    'type': 'regression',
    'split': {
      'id': 4,
      'config': {},
      'original_log': {
        'id': 5,
        'name': 'financial_log.xes.gz',
        'properties': {
          'events': {},
          'resources': {},
          'newTraces': {},
          'maxEventsInLog': 119,
          'traceAttributes': []
        }
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  },
  {
    'id': 6,
    'created_date': '2018-04-14T06:29:21.360000Z',
    'modified_date': '2018-04-14T06:30:24.406000Z',
    'config': {
      'prefix_length': 3,
      'regression.randomForest': {'n_estimators': 10, 'criterion': 'mse', 'max_depth': null, 'min_samples_split': 2},
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'randomForest'
    },
    'status': 'completed',
    'result': {'rmse': 191.19102930552305, 'mae': 138.26345747696183, 'rscore': 0.21183208508900764},
    'type': 'regression',
    'split': {
      'id': 4,
      'config': {},
      'original_log': {
        'id': 5,
        'name': 'financial_log.xes.gz',
        'properties': {
          'events': {},
          'resources': {},
          'newTraces': {},
          'maxEventsInLog': 119,
          'traceAttributes': []
        }
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  },
  {
    'id': 7,
    'created_date': '2018-04-14T06:29:21.360000Z',
    'modified_date': '2018-04-14T06:30:24.406000Z',
    'config': {
      'prefix_length': 5,
      'regression.randomForest': {'n_estimators': 10, 'criterion': 'mse', 'max_depth': null, 'min_samples_split': 2},
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'randomForest'
    },
    'status': 'completed',
    'result': {'rmse': 171.19102930552305, 'mae': 128.26345747696183, 'rscore': 0.24183208508900764},
    'type': 'regression',
    'split': {
      'id': 4,
      'config': {},
      'original_log': {
        'id': 5,
        'name': 'financial_log.xes.gz',
        'properties': {
          'events': {},
          'resources': {},
          'newTraces': {},
          'maxEventsInLog': 119,
          'traceAttributes': []
        }
      },
      'type': 'single',
      'test_log': null,
      'training_log': null
    },
    'error': ''
  }
];

storiesOf('Controlled Charts', module)
  .add('ControlledLineCharts', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ControlledLineChartCard jobs={regJobs} predictionMethod={REGRESSION}/>
          </div>
          <div className="md-cell md-cell--12">
            <ControlledLineChartCard jobs={[]} predictionMethod={CLASSIFICATION}/>
          </div>
        </div>
      );
    }
  );
