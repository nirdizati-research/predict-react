import React from 'react';
import {storiesOf} from '@storybook/react';
import FetchState from '../src/components/FetchState';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ClassificationKnn from '../src/components/advanced/ClassificationKnn';
import {CLASSIFICATION, NEXT_ACTIVITY} from '../src/reference';
import AdvancedConfiguration from '../src/components/advanced/AdvancedConfiguration';
import ClassificationDecisionTree from '../src/components/advanced/ClassificationDecisionTree';
import ClassificationRandomForest from '../src/components/advanced/ClassificationRandomForest';

storiesOf('Advanced configuration', module)
  .add('classification', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardText>
                Some text above
              </CardText>
              <ClassificationKnn predictionMethod={CLASSIFICATION} onChange={console.log}/>
              <ClassificationDecisionTree predictionMethod={CLASSIFICATION} onChange={console.log}/>
              <ClassificationRandomForest predictionMethod={CLASSIFICATION} onChange={console.log}/>
            </Card>
          </div>
        </div>
      );
    }
  )
  .add('advanced', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="Classification"/>
              <CardText>
                Some text above
              </CardText>
              <AdvancedConfiguration predictionMethod={CLASSIFICATION} classification={['knn', 'decisionTree', 'randomForest']}
                                     regression={[]} onChange={console.log}/>
            </Card>
          </div>

          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="Next Activity"/>
              <CardText>
                Some text above
              </CardText>
              <AdvancedConfiguration predictionMethod={NEXT_ACTIVITY} classification={['knn', 'decisionTree', 'randomForest']}
                                     regression={[]} onChange={console.log}/>
            </Card>
          </div>
        </div>
      );
    }
  )
;
