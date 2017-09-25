/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import LogListCard from '../src/components/LogListCard';

const names = ['Log 1', 'log 2', 'something.xes', 'reallylongandboringnametotestlimits.xes'];

storiesOf('LogListCard', module)
  .add('all of them', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <LogListCard logNames={names} fetchState={{inFlight: false}} selectChange={(_) => _}/>
          </div>
        </div>
      );
    }
  );
