/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import LineChartCard from '../src/components/chart/LineChartCard';

const fetchState = {inFlight: false};

const traces = {
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
  '2011-10-07': 83
};

const resources = {
  '2011-10-01': 7,
  '2011-10-03': 13,
  '2011-10-04': 12,
  '2011-10-05': 14,
  '2011-10-06': 11,
  '2011-10-07': 13,
  '2011-10-08': 7,
};

storiesOf('Charts', module)
  .add('LineChartCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <LineChartCard fetchState={fetchState}
                           data={traces}
                           cardTitle="Number of traces"
                           chartTitle="Active traces"/>
          </div>
          <div className="md-cell md-cell--12">
            <LineChartCard fetchState={fetchState}
                           data={resources}
                           cardTitle="Number of resources"
                           chartTitle="Active traces"/>
          </div>
        </div>
      );
    }
  );
