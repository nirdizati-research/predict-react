import React from 'react';
import {storiesOf} from '@storybook/react';
import WalkThrough from '../src/components/WalkThrough';


storiesOf('Random', module)
  .add('WalkTrough', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <WalkThrough/>
          </div>
        </div>
      );
    }
  );
