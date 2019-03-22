import React from 'react';
import {storiesOf} from '@storybook/react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ClassificationKnn from '../src/components/advanced/classification/ClassificationKnn';
import {
    CLASSIFICATION,
    KMEANS,
    REGRESSION,
    REMAINING_TIME,
    THRESHOLD_MEAN,
    TIME_SERIES_PREDICTION
} from '../src/reference';
import AdvancedConfiguration from '../src/components/advanced/AdvancedConfiguration';
import ClassificationDecisionTree from '../src/components/advanced/classification/ClassificationDecisionTree';
import ClassificationRandomForest from '../src/components/advanced/classification/ClassificationRandomForest';
import RegressionRandomForest from '../src/components/advanced/regression/RegressionRandomForest';
import RegressionLasso from '../src/components/advanced/regression/RegressionLasso';
import RegressionLinear from '../src/components/advanced/regression/RegressionLinear';
import HyperOpt from '../src/components/advanced/HyperOpt';
import Labelling from '../src/components/advanced/Labelling';
import RegressionXGBoost from '../src/components/advanced/regression/RegressionXGBoost';
import ClassificationXGBoost from '../src/components/advanced/classification/ClassificationXGBoost';
import TimeSeriesPredictionRNN from '../src/components/advanced/timeSeriesPrediction/TimeSeriesPredictionRNN';


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
    .add('timeSeriesPrediction', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <Card className="md-block-centered">
                            <CardText>
                                Some text above
                            </CardText>
                            <TimeSeriesPredictionRNN onChange={console.log}/>
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
                                Labeling
                            </CardText>
                            <Labelling onChange={console.log} labelling={label1} traceAttributes={traceAttributes}
                                       predictionMethod={CLASSIFICATION}/>
                            <Labelling onChange={console.log} labelling={label1}
                                       traceAttributes={[]} // TODO: shouldn't this have traceAttributes inside?
                                       predictionMethod={REGRESSION}/>
                            <Labelling onChange={console.log} labelling={label1} traceAttributes={[traceAttributes]}
                                       predictionMethod={TIME_SERIES_PREDICTION}/>
                        </Card>
                    </div>
                    <div className="md-cell md-cell--12">
                        <Card className="md-block-centered">
                            <CardText>
                                Some text above
                            </CardText>
                            <HyperOpt onChange={console.log} predictionMethod={CLASSIFICATION}/>
                            <HyperOpt onChange={console.log} predictionMethod={REGRESSION}/>
                            <HyperOpt onChange={console.log} predictionMethod={TIME_SERIES_PREDICTION}/>
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
                            <AdvancedConfiguration predictionMethod={CLASSIFICATION} labelling={label1}
                                                   traceAttributes={[]}
                                                   classification={['knn', 'decisionTree', 'randomForest', 'xgboost', 'nn']}
                                                   regression={[]} timeSeriesPrediction={[]} onChange={console.log}
                                                   clusterings={[KMEANS]}/>
                        </Card>
                    </div>

                    <div className="md-cell md-cell--12">
                        <Card className="md-block-centered">
                            <CardTitle title="Regression"/>
                            <CardText>
                                Some text above
                            </CardText>
                            <AdvancedConfiguration predictionMethod={REGRESSION} labelling={label1} traceAttributes={[]}
                                                   regression={['linear', 'randomForest', 'lasso', 'xgboost', 'nn']}
                                                   classification={[]} timeSeriesPrediction={[]}
                                                   onChange={console.log} clusterings={[]}/>
                        </Card>
                    </div>

                    <div className="md-cell md-cell--12">
                        <Card className="md-block-centered">
                            <CardTitle title="TimeSeriesPrediction"/>
                            <CardText>
                                Some text above
                            </CardText>
                            <AdvancedConfiguration predictionMethod={TIME_SERIES_PREDICTION} labelling={label1}
                                                   traceAttributes={[]}
                                                   regression={[]} timeSeriesPrediction={['rnn']}
                                                   classification={[]} onChange={console.log} clusterings={[]}/>
                        </Card>
                    </div>
                </div>
            );
        }
    )
;
