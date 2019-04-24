import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import {
    CLASSIFICATION,
} from '../../reference';
import {selectLabelProptype} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';

const defaults = {
    'incremental_base_model': null
};

const methodConfig = 'incremental_train';

const Incremental = (props) => {
    const helpText = () => {
        if (props.predictionMethod === CLASSIFICATION) {
            return <div key='key' className="md-cell md-cell--12"><p>
                When training one might want to update a pre-existing model instead of training a brand new model.
            </p>
            </div>;
        } else {
            return <div key='key' className="md-cell md-cell--12"><p>
                Not yet implemented!
            </p>
            </div>;
        }
    };


    const makeModelSelector = (onChange) => {
        const availableModels = [{value: null, label: 'None'}].concat(modelsToString(
            props.classificationModels
            .filter(
                (obj) => (
                    props.currentModels.includes(obj.config.method)
                )
            )
        ));

        return [<SelectField
            key="base_model"
            id="base_model"
            label={'Base model'}
            menuItems={availableModels}
            defaultValue={defaults.incremental_base_model}
            position={SelectField.Positions.TOP_LEFT}
            onChange={onChange.bind(this, {methodConfig, key: 'base_model'})}
            required
        />];
    };

    if (props.predictionMethod === CLASSIFICATION) {
        return [helpText(), ...makeModelSelector(props.onChange,
            props.predictionMethod, props.classificationModels)];
    } else {
        return [helpText()];
    }
};

Incremental.propTypes = {
    baseModel: selectLabelProptype,
    classificationModels: selectLabelProptype,
    regressionModels: selectLabelProptype,
    timeSeriesPredictionModels: selectLabelProptype,
    onChange: PropTypes.func.isRequired
};
export default Incremental;
