import React from 'react';
import {storiesOf} from '@storybook/react';
import WalkThrough from '../src/components/WalkThrough';
import EncodingByLogCard from '../src/components/static/EncodingByLogCard';
import {ClassificationMethodsCard} from '../src/components/static/ClassificationMethodsCard';
import {getHelpText} from '../src/components/static/helpReference';


const helpTexts = ['/', '/upload', '/logs', '/split', '/label', '/training', '/jobs', '/validation'];

const paragraphs = arr => arr.map((text, i) => (
  <p key={i}>
    {text}
  </p>
));


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
  .add('Help texts', () => {
      return (
        <div className="md-grid">
          {helpTexts.map((path, i) =>
            <div key={i} className="md-cell">
              <h3>{path}</h3>
              {paragraphs(getHelpText(path))}
            </div>
          )}
        </div>
      );
    }
  )
  .add('Charts', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ClassificationMethodsCard/>
          </div>
          <div className="md-cell md-cell--12">
            <EncodingByLogCard/>
          </div>
        </div>
      );
    }
  );
