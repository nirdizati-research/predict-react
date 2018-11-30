/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import LogListCard from '../src/components/LogListCard';

const logList = [
  {
    'id': 1,
    'name': 'general_example.xes'
  },
  {
    'id': 4,
    'name': 'nonlocal.mxml.gz'
  }
];
storiesOf('LogListCard', module)
  .add('all of them', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <LogListCard logList={logList} fetchState={{inFlight: false}} selectChange={(_) => _} visibleLogId={4}/>
          </div>
        </div>
      );
    }
  );
