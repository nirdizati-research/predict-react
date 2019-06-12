/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';
import TrainingFormCard from '../src/components/TrainingFormCard';
import {splitLabels} from './Split';
import {traceAttributes} from './Advanced';

storiesOf('TrainingFormCard', module)
    .add('this', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <TrainingFormCard splitLabels={splitLabels} fetchState={{inFlight: false}} onSubmit={(_) => _}
                                          onSplitChange={(_) => _} maxEventsInLog={10} traceAttributes={traceAttributes}
                                          classificationModels={[]} onModelChange={(_) => _} regressionModels={[]}
                                          timeSeriesPredictionModels={[]}/>
                    </div>
                    <div className="md-cell md-cell--12">
                        <TrainingFormCard splitLabels={splitLabels} fetchState={{inFlight: true}} onSubmit={(_) => _}
                                          onSplitChange={(_) => _} maxEventsInLog={10} traceAttributes={[]}
                                          classificationModels={[]} onModelChange={(_) => _} regressionModels={[]}
                                          timeSeriesPredictionModels={[]}/>
                    </div>
                    <div className="md-cell md-cell--12">
                        <TrainingFormCard splitLabels={[]} fetchState={{inFlight: false, error: 'oh shit'}}
                                          onSubmit={(_) => _} onSplitChange={(_) => _} maxEventsInLog={10}
                                          traceAttributes={[]} classificationModels={[]} onModelChange={(_) => _}
                                          regressionModels={[]} timeSeriesPredictionModels={[]}/>
                    </div>
                </div>
            );
        }
    )
    .add('labelling', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <TrainingFormCard splitLabels={splitLabels} fetchState={{inFlight: false}} onSubmit={(_) => _}
                                          onSplitChange={(_) => _} maxEventsInLog={10} traceAttributes={traceAttributes}
                                          isLabelForm={true} classificationModels={[]} onModelChange={(_) => _}
                                          regressionModels={[]} timeSeriesPredictionModels={[]}/>
                    </div>
                </div>
            );
        }
    )
;
