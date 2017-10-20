/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import FetchState from '../src/components/FetchState';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';

storiesOf('FetchState', module)
  .add('all of them', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="All fetch states"/>
              <CardText>
                <h2>Fetch done</h2>
                <FetchState fetchState={{inFlight: false}}/>
                <h2>Fetch in progress</h2>
                <FetchState fetchState={{inFlight: true}}/>
                <h2>Fetch error</h2>
                <FetchState fetchState={{inFlight: false, error: 'Big and scary error message'}}/>
              </CardText>
            </Card>
          </div>
        </div>
      );
    }
  );
