/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TrainingFormCard from '../src/components/TrainingFormCard';

const names = ['Log 1', 'log 2', 'something.xes', 'reallylongandboringnametotestlimits.xes'];

storiesOf('TrainingFormCard', module)
  .add('this', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <TrainingFormCard logNames={names} fetchState={{inFlight: false}} onSubmit={(_) => _}/>
          </div>
          <div className="md-cell md-cell--12">
            <TrainingFormCard logNames={names} fetchState={{inFlight: true}} onSubmit={(_) => _}/>
          </div>
          <div className="md-cell md-cell--12">
            <TrainingFormCard logNames={names} fetchState={{inFlight: false, error: 'oh shit'}} onSubmit={(_) => _}/>
          </div>
        </div>
      );
    }
  );
