import React from 'react';
import {storiesOf} from '@storybook/react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ClassificationKnn from '../src/components/advanced/ClassificationKnn';
import {CLASSIFICATION, KMEANS, REGRESSION, REMAINING_TIME, THRESHOLD_MEAN} from '../src/reference';
import AdvancedConfiguration from '../src/components/advanced/AdvancedConfiguration';
import ClassificationDecisionTree from '../src/components/advanced/ClassificationDecisionTree';
import ClassificationRandomForest from '../src/components/advanced/ClassificationRandomForest';
import RegressionRandomForest from '../src/components/advanced/RegressionRandomForest';
import RegressionLasso from '../src/components/advanced/RegressionLasso';
import RegressionLinear from '../src/components/advanced/RegressionLinear';
import HyperOpt from '../src/components/advanced/HyperOpt';
import Labelling from '../src/components/advanced/Labelling';
import RegressionXGBoost from '../src/components/advanced/RegressionXGBoost';
import ClassificationXGBoost from '../src/components/advanced/ClassificationXGBoost';


export const label1 = {
  type: REMAINING_TIME,
  attribute_name: null,
  threshold_type: THRESHOLD_MEAN,
  threshold: 0,
  add_remaining_time: false,
  add_elapsed_time: false,
  add_executed_events: false,
  add_resources_used: false,
  add_new_traces: false,
};

export const traceAttributes = [
  {
    'name': 'creator',
    'type': 'string',
    'example': 'Fluxicon Nitro'
  },
  {
    'name': 'another',
    'type': 'string',
    'example': 'Fluxicon Nitro'
  },
  {
    'name': 'numbers',
    'type': 'number',
    'example': '345'
  },
  {
    'name': 'amount',
    'type': 'number',
    'example': '2355'
  }
];

storiesOf('Advanced configuration', module)
  .add('classification', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardText>
                Some text above
              </CardText>
              <ClassificationKnn onChange={console.log}/>
              <ClassificationDecisionTree onChange={console.log}/>
              <ClassificationRandomForest onChange={console.log}/>
              <ClassificationXGBoost onChange={console.log}/>
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
              <RegressionXGBoost onChange={console.log}/>
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
                Labelling
              </CardText>
              <Labelling onChange={console.log} label={label1} traceAttributes={traceAttributes}
                         predictionMethod={CLASSIFICATION}/>
              <Labelling onChange={console.log} label={label1} traceAttributes={[]} predictionMethod={REGRESSION}/>
            </Card>
          </div>
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
              <AdvancedConfiguration predictionMethod={CLASSIFICATION} label={label1} traceAttributes={[]}
                                     classification={['knn', 'decisionTree', 'randomForest', 'xgboost']}
                                     regression={[]} onChange={console.log} clusterings={[KMEANS]}/>
            </Card>
          </div>

          <div className="md-cell md-cell--12">
            <Card className="md-block-centered">
              <CardTitle title="Regression"/>
              <CardText>
                Some text above
              </CardText>
              <AdvancedConfiguration predictionMethod={REGRESSION} classification={[]} label={label1}
                                     traceAttributes={[]} clusterings={[]}
                                     regression={['randomForest', 'lasso', 'linear', 'xgboost']}
                                     onChange={console.log}/>
            </Card>
          </div>
        </div>
      );
    }
  )
;
