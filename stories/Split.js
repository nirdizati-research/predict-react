/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';
import ConfigTableCard from '../src/components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';
import ResultWrapper from '../src/components/validation/ResultWrapper';
import SplitTableCard from '../src/components/split/SplitTableCard';

export const splits = [
  {
    'id': 1,
    'originalLogName': 'Log.xes',
    'testLogName': null,
    'trainingLogName': null,
    'type': 'single',
    'config': {
      'value': 123,
      'setting': 'something'
    }
  },
  {
    'id': 2,
    'originalLogName': null,
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
  );
