import React from 'react';
import {storiesOf} from '@storybook/react';
import UploadCard from '../src/components/UploadCard';


storiesOf('Upload', module)
  .add('Single file upload', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <UploadCard/>
          </div>
        </div>
      );
    }
  );
