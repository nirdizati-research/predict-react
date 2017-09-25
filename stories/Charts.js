/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import NumberOfTracesCard from '../src/components/chart/NumberOfTracesCard';

const fetchState = {inFlight: false};

const traces = {
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
  '2011-10-07': 83
};

storiesOf('Charts', module)
  .add('Number of traces', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <NumberOfTracesCard fetchState={fetchState} traces={traces}/>
          </div>
        </div>
      );
    }
  );
