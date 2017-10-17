/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import LogListCard from '../src/components/LogListCard';
import ValidationHeaderCard from '../src/components/validation/ValidationHeaderCard';

const names = ['Log 1', 'log 2', 'something.xes', 'reallylongandboringnametotestlimits.xes'];

storiesOf('Validation', module)
  .add('ValidationHeaderCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <ValidationHeaderCard logNames={names} fetchState={{inFlight: false}} logChange={(_) => _}
                                  methodChange={(_) => _}/>
          </div>
        </div>
      );
    }
  );
