import React from 'react';
import {storiesOf} from '@storybook/react';
import WalkThrough from '../src/components/WalkThrough';
import EncodingByLogCard from '../src/components/static/EncodingByLogCard';


storiesOf('Static things', module)
  .add('WalkTrough', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <WalkThrough/>
          </div>
        </div>
      );
    }
  )
  .add('Charts', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <EncodingByLogCard/>
          </div>
        </div>
      );
    }
  );
