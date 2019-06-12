import {
    ATTRIBUTE_NUMBER,
    ATTRIBUTE_STRING,
    CLASSIFICATION,
    DURATION,
    LABELLING,
    NEXT_ACTIVITY,
    REGRESSION,
    REMAINING_TIME,
    THRESHOLD_CUSTOM,
    THRESHOLD_MEAN,
    TIME_SERIES_PREDICTION
} from '../reference';

const thresholdCompare = (a, b) => {
    if (a.threshold_type === b.threshold_type) {
        if (a.threshold_type === THRESHOLD_MEAN) {
            return true;
        } else if (a.threshold_type === THRESHOLD_CUSTOM) {
            return a.threshold === b.threshold;
        }
        return false;
    }
    return false;
};

const regressionCompare = (a, b) => {
    switch (a.type) {
        case REMAINING_TIME:
            return true;
        case ATTRIBUTE_NUMBER:
            return a.attribute_name === b.attribute_name;
        default:
            return false;
    }
};

const classificationCompare = (a, b) => {
    switch (a.type) {
        case DURATION:
            return thresholdCompare(a, b);
        case ATTRIBUTE_NUMBER:
            return a.attribute_name === b.attribute_name && thresholdCompare(a, b);
        case NEXT_ACTIVITY:
            return true;
        case ATTRIBUTE_STRING:
            return a.attribute_name === b.attribute_name;
        default:
            return false;
    }
};

const timeSeriesPredictionCompare = (a, b) => {
    switch (a.type) {
        case DURATION:
            return thresholdCompare(a, b);
        case ATTRIBUTE_NUMBER:
            return a.attribute_name === b.attribute_name && thresholdCompare(a, b);
        case NEXT_ACTIVITY:
            return true;
        case ATTRIBUTE_STRING:
            return a.attribute_name === b.attribute_name;
        default:
            return false;
    }
};

// True if labels a and b are the same
export const labelCompare = (predictionMethod) => (a, b) => {
    if (a.type === b.type) {
        if (predictionMethod === REGRESSION) {
            return regressionCompare(a, b);
        } else if (predictionMethod === CLASSIFICATION) {
            return classificationCompare(a, b);
        } else if (predictionMethod === TIME_SERIES_PREDICTION) {
            return timeSeriesPredictionCompare(a, b);
        } else if (predictionMethod === LABELLING) {
            return classificationCompare(a, b);
        }
    }
    return false;
};
