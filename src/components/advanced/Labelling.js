import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {
    ATTRIBUTE_NUMBER,
    ATTRIBUTE_STRING,
    CLASSIFICATION,
    classLabelControls,
    controlCreator,
    DURATION,
    LABELLING,
    regLabelControls,
    REGRESSION,
    REMAINING_TIME,
    THRESHOLD_MEAN,
    thresholdControls,
    TIME_SERIES_PREDICTION,
    timeSeriesPredLabelControls
} from '../../reference';
import SelectField from 'react-md/lib/SelectFields/index';
import {labelPropType, traceAttributeShape} from '../../propTypes';

const traceAttributeToLabel = (traceAttr) => {
    return {label: traceAttr.name, value: traceAttr.name, message: `First trace value: ${traceAttr.example}`};
};

const methodConfig = LABELLING;
const Labelling = (props) => {
    const helpText = () => {
        switch (props.predictionMethod) {
            case REGRESSION: {
                return <div key='key' className="md-cell md-cell--12"/>;
            }
            case CLASSIFICATION: {
                return <div key='key' className="md-cell md-cell--12">
                    <p>
                        When using duration, the threshold is an integer in seconds. If the remaining time is below this
                        threshold it is classified as <code>True</code> or Fast. Times above the threshold are
                        classified as <code>False</code> or Slow.
                    </p>
                    <p>Numeric attributes below the threshold are set as <code>True</code>.</p>
                    <p className="md-red-500">A threshold too low, or too high, could end up with a
                       labeling with only <code>True</code>, or <code>False</code>, labels.</p>
                </div>;
            }
            case TIME_SERIES_PREDICTION: {
                return <div key='key' className="md-cell md-cell--12"/>;
            }
        }
    };

    const controls = () => {
        switch (props.predictionMethod) {
            case REGRESSION:
                return regLabelControls;
            case CLASSIFICATION:
                return classLabelControls;
            case TIME_SERIES_PREDICTION:
                return timeSeriesPredLabelControls;
            default:
                return classLabelControls;
        }
    };

    const type = <SelectField key="type" id="type" label="Label type" className="md-cell md-cell--3"
                              menuItems={controls()} position={SelectField.Positions.BELOW}
                              onChange={props.onChange.bind(this, {methodConfig, key: 'type'})}
                              value={props.labelling.type}/>;

    const threshold = (label) => {
        if (props.predictionMethod === REGRESSION || props.predictionMethod === TIME_SERIES_PREDICTION) {
            label.threshold_type = 'none';
            label.threshold = 0;
            return [];
        } else if ([REMAINING_TIME, ATTRIBUTE_NUMBER, DURATION].includes(label.type)) {
            label.threshold_type = thresholdControls[0].value;
            const thresholdType = <SelectField
                key="threshold_type"
                id="threshold_type"
                label="Threshold type"
                className="md-cell md-cell--3"
                menuItems={thresholdControls}
                position={SelectField.Positions.BELOW}
                onChange={props.onChange.bind(this, {methodConfig, key: 'threshold_type'})}
                value={label.threshold_type}
            />;

            let thresholdLabel = 'Threshold';
            if (label.type === DURATION) {
                thresholdLabel = thresholdLabel + ' (seconds)';
            }
            const threshold = label.threshold_type !== THRESHOLD_MEAN ? <TextField
                key="threshold"
                id="threshold"
                label={thresholdLabel}
                type="number"
                value={label.threshold}
                onChange={props.onChange.bind(this, {methodConfig, key: 'threshold', isNumber: true})}
                min={0}
                className="md-cell md-cell--3"
            /> : null;

            return [thresholdType, threshold];
        } else {
            return [];
        }
    };

    const attributeSelector = ({labelling, traceAttributes, onChange}) => {
        let filteredAttributes = [];
        if (labelling.type === ATTRIBUTE_NUMBER) {
            filteredAttributes = traceAttributes.filter((t) => t.type === 'number');
        } else if (labelling.type === ATTRIBUTE_STRING) {
            filteredAttributes = traceAttributes.filter((t) => t.type === 'string');
        } else {
            return null;
        }
        const traceLabels = controlCreator(filteredAttributes.map(traceAttributeToLabel));
        return <SelectField
            key="attribute_name"
            id="attribute_name"
            label="Attribute name"
            className="md-cell md-cell--3"
            menuItems={traceLabels}
            position={SelectField.Positions.BELOW}
            onChange={onChange.bind(this, {methodConfig, key: 'attribute_name'})}
            value={labelling.attribute_name}
        />;
    };
    attributeSelector.propTypes = {
        onChange: PropTypes.func.isRequired,
        labelling: PropTypes.shape(labelPropType).isRequired,
        traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
    };

    return [helpText(), type, attributeSelector(props), ...threshold(props.labelling)];
};

Labelling.propTypes = {
    onChange: PropTypes.func.isRequired,
    labelling: PropTypes.shape(labelPropType).isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION, LABELLING]).isRequired,
    traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired
};

export default Labelling;
