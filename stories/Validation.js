/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {CLASSIFICATION, LABELLING, REGRESSION} from '../src/reference';
import ResultWrapper from '../src/components/validation/ResultWrapper';
import {label1} from './Advanced';
import LabellingHeaderCard from '../src/components/Labelling/LabellingHeaderCard';

const splitLabels = [{value: 1, label: 'Split #1'}, {value: 2, label: 'Split #2'}];
const classJobs = [
  {
    'id': 1,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'prefix_length': 1,
      'create_models': true,
      'label': label1,
      'padding': 'no_padding',
      'hyperopt': {
        'use_hyperopt': true,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
      'classification.randomForest': {
        'n_estimators': 10,
        'criterion': 'gini',
        'max_depth': null,
        'min_samples_split': 2,
        'min_samples_leaf': 1
      }
    },
    'status': 'completed',
    'result': {
      'f1score': 0.6666666666666666,
      'acc': 0.5,
      'auc': 0.5,
      'false_negative': 0,
      'false_positive': 1,
      'true_positive': 1,
      'true_negative': 0,
      'precision': 3,
      'recall': 0
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
    'id': 3,
    'created_date': '2017-11-14T20:52:36.469000Z',
    'modified_date': '2017-12-05T14:57:28.344216Z',
    'config': {
      'clustering': 'noCluster',
      'method': 'randomForest',
      'encoding': 'simpleIndex',
      'prefix_length': 3,
      'label': label1,
      'create_models': true,
      'padding': 'no_padding',
      'hyperopt': {
        'use_hyperopt': false,
        'max_evals': 100,
        'performance_metric': 'acc'
      },
      'classification.randomForest': {
        'n_estimators': 10,
        'criterion': 'gini',
        'max_depth': null,
        'min_samples_split': 2,
        'min_samples_leaf': 1
      }
    },
    'status': 'completed',
    'result': {
      'f1score': 0.766666666666666,
      'acc': 0.3,
      'auc': 0.2,
      'false_negative': 0,
      'false_positive': 1,
      'true_positive': 1,
      'true_negative': 0,
      'precision': 3,
      'recall': 0
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
  }];

const regJobs = [
  {
    'id': 53,
    'created_date': '2018-02-07T22:47:32.146583Z',
    'modified_date': '2018-02-07T22:47:32.149647Z',
    'config': {
      'prefix_length': 0,
      'encoding': 'simpleIndex',
      'clustering': 'noCluster',
      'method': 'linear',
      'create_models': false,
      'label': label1,
      'padding': 'no_padding',
      'hyperopt': {
        'use_hyperopt': false,
        'max_evals': 100,
        'performance_metric': 'rmse'
      },
      'regression.linear': {
        'fit_intercept': true,
        'normalize': false,
        'copy_X': true
      }
    },
    'status': 'created',
    'result': {
      'mae': 1,
      'rmse': 2,
      'rscore': 3
    },
    'type': 'regression',
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
  }];

const labelJobs = [
  {
    'id': 52,
    'created_date': '2017-12-05T16:13:40.278339Z',
    'modified_date': '2017-12-05T16:13:40.457762Z',
    'config': {
      'prefix_length': 1,
      'encoding': 'simpleIndex',
      'label': label1,
      'padding': 'no_padding',
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

const filterOptions = {
  encodings: [],
  clusterings: [],
  classification: [],
  regression: [],
};

storiesOf('Validation', module)
  .add('ValidationHeaderCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ValidationHeaderCard splitLabels={splitLabels} fetchState={{inFlight: false}} splitChange={(_) => _}
                                  methodChange={(_) => _} selectedPrefixes={['2']} filterOptions={filterOptions}
                                  prefixLengths={['1', '2']} prefixChange={(_) => _} filterOptionChange={console.log}
                                  predictionMethod={REGRESSION}/>
          </div>
        </div>
      );
    }
  ).add('Labelling header card', () => {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <LabellingHeaderCard splitLabels={splitLabels} fetchState={{inFlight: false}} splitChange={(_) => _}
                               selectedPrefixes={['2']} filterOptions={filterOptions} labelTypeChange={console.log}
                               prefixLengths={['1', '2']} prefixChange={(_) => _} selectedSplitId={1}/>
        </div>
      </div>
    );
  }
)
  .add('ConfigTableCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ConfigTableCard jobs={classJobs} predictionMethod={CLASSIFICATION}/>
          </div>
          <div className="md-cell md-cell--12">
            <ConfigTableCard jobs={regJobs} predictionMethod={REGRESSION}/>
          </div>
          <div className="md-cell md-cell--12">
            <ConfigTableCard jobs={labelJobs} predictionMethod={LABELLING}/>
          </div>
        </div>
      );
    }
  ).add('ResultWrapper classification', () => {
    return (
      <div className="md-grid">
        <ResultWrapper jobs={classJobs} predictionMethod={CLASSIFICATION}/>
      </div>
    );
  }
).add('ResultWrapper regression', () => {
    return (
      <div className="md-grid">
        <ResultWrapper jobs={regJobs} predictionMethod={REGRESSION}/>
      </div>
    );
  }
);
