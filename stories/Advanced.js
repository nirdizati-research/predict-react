import React from 'react';
import {storiesOf} from '@storybook/react';
import FetchState from '../src/components/FetchState';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ClassificationKnn from '../src/components/advanced/ClassificationKnn';
import {CLASSIFICATION} from '../src/reference';

storiesOf('Advanced configuration', module)
  .add('classification', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardText>
                <div className="md-cell md-cell--3">
                  <ClassificationKnn predictionMethod={CLASSIFICATION} onChange={console.log}/>
                </div>
              </CardText>
            </Card>
          </div>
        </div>
      );
    }
  );
