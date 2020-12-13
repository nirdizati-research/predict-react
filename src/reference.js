/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
/* eslint-disable max-len */

export const CLASSIFICATION = 'classification';
export const REGRESSION = 'regression';
export const LABELLING = 'labelling';
export const ENCODING = 'encoding';
export const TIME_SERIES_PREDICTION = 'time_series_prediction';

export const SPLIT_SINGLE = 'single';
export const SPLIT_DOUBLE = 'double';

// clustering
export const NO_CLUSTER = 'noCluster';
export const KMEANS = 'kmeans';

// classification methods
export const KNN = 'knn';
export const DECISION_TREE = 'decisionTree';
export const RANDOM_FOREST = 'randomForest';
export const MULTINOMIAL_NAIVE_BAYES = 'multinomialNB';
export const HOEFFDING_TREE = 'hoeffdingTree';
export const ADAPTIVE_TREE = 'adaptiveTree';
export const SGDCLASSIFIER = 'SGDClassifier';
export const PERCEPTRON = 'perceptron';

export const INCREMENTAL_CLASSIFIERS = [
    MULTINOMIAL_NAIVE_BAYES,
    HOEFFDING_TREE,
    ADAPTIVE_TREE,
    SGDCLASSIFIER,
    PERCEPTRON
];

// regression methods
export const LINEAR = 'linear';
export const LASSO = 'lasso';
export const XGBOOST = 'xgboost';
export const NN = 'nn';

// rnn methods
export const RNN = 'rnn';

// encoding methods
export const SIMPLE_INDEX = 'simpleIndex';
export const BOOLEAN = 'boolean';
export const FREQUENCY = 'frequency';
export const COMPLEX = 'complex';
export const LAST_PAYLOAD = 'lastPayload';
export const DECLARE = 'declare';

// incremental sets
export const NUMBER_OF_INCREMENTS = 'incremental_trains';

// labeling stuff
export const NEXT_ACTIVITY = 'next_activity';
export const REMAINING_TIME = 'remaining_time';
export const ATTRIBUTE_NUMBER = 'attribute_number';
export const ATTRIBUTE_STRING = 'attribute_string';
export const DURATION = 'duration';

export const THRESHOLD_MEAN = 'threshold_mean';
export const THRESHOLD_CUSTOM = 'threshold_custom';
// padding
export const ZERO_PADDING = 'zero_padding';
export const NO_PADDING = 'no_padding';
// task generation type
export const ONLY_THIS = 'only';
export const UP_TO_SINGLE_TASK = 'up_to_single_task';
export const UP_TO_SEPARATE_TASKS = 'up_to_separate_tasks';


// Using these options directly means the message is not shown
export const clustering = [
    {
        label: 'None',
        value: NO_CLUSTER,
        message: 'No clustering is applied and a single model is trained'
    },
    {
        label: 'K-means clustering',
        value: KMEANS,
        message: 'Assign traces to k-means clusters and train a model for each cluster'
    }
];

const classification = [
    {
        label: 'KNN',
        value: KNN
    },
    {
        label: 'Decision tree',
        value: DECISION_TREE
    },
    {
        label: 'Random forest',
        value: RANDOM_FOREST
    },
    {
        label: 'XGBoost',
        value: XGBOOST
    },
    {
        label: 'Naive Bayes',
        value: MULTINOMIAL_NAIVE_BAYES
    },
    {
        label: 'Hoeffding Tree',
        value: HOEFFDING_TREE
    },
    {
        label: 'Adaptive Tree',
        value: ADAPTIVE_TREE
    },
    {
        label: 'SGD Classifier',
        value: SGDCLASSIFIER
    },
    {
        label: 'Perceptron',
        value: PERCEPTRON
    },
    {
        label: 'NN',
        value: NN
    },
];

export const encoding = [
    {
        label: 'Simple index',
        value: SIMPLE_INDEX,
        message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the activity names. Event attributes are discarded.'
    },
    {
        label: 'Boolean',
        value: BOOLEAN,
        message: 'Features represent whether or not a particular activity has occurred in the trace. Event attributes are discarded.'
    },
    {
        label: 'Frequency',
        value: FREQUENCY,
        message: 'Features represent the absolute frequency of each possible activity. Event attributes are discarded.'
    },
    {
        label: 'Complex',
        value: COMPLEX,
        message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the activity names and event attributes'
    },
    {
        label: 'Last payload',
        value: LAST_PAYLOAD,
        message: 'Features represent event names for all events in the trace and additionally event attributes for the last event in the trace.'
    },
    {
        label: 'Declare',
        value: DECLARE,
        message: 'Each feature is encoded as a Declare constraint.'
    }
];

const predictions = [
    {
        label: 'Regression',
        value: REGRESSION,
        message: 'Numeric values'
    },
    {
        label: 'Classification',
        value: CLASSIFICATION,
        message: 'Categorical values'
    },
    {
        label: 'Time Series Prediction',
        value: TIME_SERIES_PREDICTION,
        message: 'Categorical values'
    }
];

const regression = [
    {
        label: 'Linear',
        value: LINEAR
    },
    {
        label: 'Random forest',
        value: RANDOM_FOREST
    },
    {
        label: 'Lasso',
        value: LASSO
    },
    {
        label: 'XGBoost',
        value: XGBOOST
    },
    {
        label: 'NN',
        value: NN
    },
];

const timeSeriesPrediction = [
    {
        label: 'RNN',
        value: RNN
    }
];

const threshold = [
    {
        label: 'Label mean',
        value: THRESHOLD_MEAN,
        message: 'Threshold is label mean'
    },
    {
        label: 'Custom',
        value: THRESHOLD_CUSTOM,
        message: 'Custom threshold value'
    }
];

const regressionIncrementalTypes = [{}];

const classificationIncrementalTypes = [
    {
        value: NUMBER_OF_INCREMENTS,
        label: 'Number of Incremental trains'
    }
];

const timeSeriesPredictionIncrementalTypes = [{}];

const regressionLabelTypes = [
    {
        value: REMAINING_TIME,
        label: 'Remaining time ',
    },
    {
        value: ATTRIBUTE_NUMBER,
        label: 'Trace numerical attribute',
    }
];

const classificationLabelTypes = [
    {
        value: DURATION,
        label: 'Trace duration',
        message: 'Binary classification'
    },
    {
        value: NEXT_ACTIVITY,
        label: 'Next activity',
        message: 'Multiclass classification'
    },
    {
        value: ATTRIBUTE_NUMBER,
        label: 'Trace numerical attribute',
        message: 'Binary classification'
    },
    {
        value: ATTRIBUTE_STRING,
        label: 'Trace categorical attribute',
        message: 'Multiclass classification'
    },
];

const timeSeriesPredictionLabelTypes = [];

export const splittingMethods = [
    {
        label: 'Sequential order',
        value: 'sequential'
    },
    {
        label: 'Temporal order',
        value: 'temporal'
    },
    {
        label: 'Random order',
        value: 'random'
    },
    {
        label: 'Strict temporal order',
        value: 'strict_temporal'
    },
];

export const padding = [
    {
        label: 'No padding',
        value: NO_PADDING,
        message: 'Traces with length shorter than the specified prefix length will be discarded'
    },
    {
        label: 'With "0" padding',
        value: ZERO_PADDING,
        message: 'Traces with length shorter than the specified prefix length will be padded with "0"'
    }
];

const prefixTypes = [
    {
        label: 'Only this prefix length',
        value: ONLY_THIS
    },
    {
        label: 'Up to the prefix length in separate models',
        value: UP_TO_SINGLE_TASK,
        message: 'A separate task per prefix length: from prefix length 1 up to the specified prefix length'
    },
    {
        label: 'Up to the prefix length in one model',
        value: UP_TO_SEPARATE_TASKS,
        message: 'A single task for all the prefix lengths: from prefix length 1 up to the specified prefix length'
    }
];

// Makes things for Selection Controls
export const controlCreator = (optMap) => {
    return optMap.map((opt) => {
        return {
            key: opt.value,
            value: opt.value,
            label: <div>{opt.label}
                <div className="md-caption">{opt.message}</div>
            </div>
        };
    });
};

export const encodingMethods = controlCreator(encoding);
export const clusteringMethods = controlCreator(clustering);
export const classificationMethods = controlCreator(classification);
export const regressionMethods = controlCreator(regression);
export const timeSeriesPredictionMethods = controlCreator(timeSeriesPrediction);
export const predictionMethods = controlCreator(predictions);
export const thresholdControls = controlCreator(threshold);
export const regIncrementalControls = controlCreator(regressionIncrementalTypes);
export const classIncrementalControls = controlCreator(classificationIncrementalTypes);
export const timeSeriesPredIncrementalControls = controlCreator(timeSeriesPredictionIncrementalTypes);
export const regLabelControls = controlCreator(regressionLabelTypes);
export const classLabelControls = controlCreator(classificationLabelTypes);
export const timeSeriesPredLabelControls = controlCreator(timeSeriesPredictionLabelTypes);
export const paddingControls = controlCreator(padding);
export const prefixTypeControls = controlCreator(prefixTypes);

export const columnStyle = {paddingRight: '12px'};
