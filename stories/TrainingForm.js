/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import TrainingFormCard from '../src/components/TrainingFormCard';
import {splitsToString} from '../src/util/dataReducers';
import {splits} from './Split';

storiesOf('TrainingFormCard', module)
  .add('this', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <TrainingFormCard splitLabels={splitsToString(splits)} fetchState={{inFlight: false}} onSubmit={(_) => _}/>
          </div>
          <div className="md-cell md-cell--12">
            <TrainingFormCard splitLabels={splitsToString(splits)} fetchState={{inFlight: true}} onSubmit={(_) => _}/>
          </div>
          <div className="md-cell md-cell--12">
            <TrainingFormCard splitLabels={splitsToString([])} fetchState={{inFlight: false, error: 'oh shit'}}
                              onSubmit={(_) => _}/>
          </div>
        </div>
      );
    }
  );
