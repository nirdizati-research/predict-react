import React from 'react';
import {storiesOf} from '@storybook/react';
import FetchState from '../src/components/FetchState';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ClassificationKnn from '../src/components/advanced/ClassificationKnn';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../src/reference';
import AdvancedConfiguration from '../src/components/advanced/AdvancedConfiguration';
import ClassificationDecisionTree from '../src/components/advanced/ClassificationDecisionTree';
import ClassificationRandomForest from '../src/components/advanced/ClassificationRandomForest';
import RegressionRandomForest from '../src/components/advanced/RegressionRandomForest';
import RegressionLasso from '../src/components/advanced/RegressionLasso';
import RegressionLinear from '../src/components/advanced/RegressionLinear';
import HyperOpt from '../src/components/advanced/HyperOpt';

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
  .add('regression', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardText>
                Some text above
              </CardText>
              <RegressionRandomForest onChange={console.log}/>
              <RegressionLasso onChange={console.log}/>
              <RegressionLinear onChange={console.log}/>
            </Card>
          </div>
        </div>
      );
    }
  )
  .add('other', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardText>
                Some text above
              </CardText>
              <HyperOpt onChange={console.log} predictionMethod={CLASSIFICATION}/>
              <HyperOpt onChange={console.log} predictionMethod={REGRESSION}/>
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
              <AdvancedConfiguration predictionMethod={CLASSIFICATION}
                                     classification={['knn', 'decisionTree', 'randomForest']}
                                     regression={[]} onChange={console.log}/>
            </Card>
          </div>

          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="Regression"/>
              <CardText>
                Some text above
              </CardText>
              <AdvancedConfiguration predictionMethod={REGRESSION} classification={[]}
                                     regression={['randomForest', 'lasso', 'linear']} onChange={console.log}/>
            </Card>
          </div>

          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="Next Activity"/>
              <CardText>
                Some text above
              </CardText>
              <AdvancedConfiguration predictionMethod={NEXT_ACTIVITY}
                                     classification={['knn', 'decisionTree', 'randomForest']}
                                     regression={[]} onChange={console.log}/>
            </Card>
          </div>
        </div>
      );
    }
  )
;
