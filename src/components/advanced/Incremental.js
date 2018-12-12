import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/index';
import {
    CLASSIFICATION,
    REGRESSION,
} from '../../reference';

const methodConfig = 'incremental_trains';
/* eslint-disable no-invalid-this */
/* eslint-disable react/prop-types */
const Incremental = (props) => {
    const helpText = () => {
        if (props.predictionMethod === CLASSIFICATION) {
            return <div key='key' className="md-cell md-cell--12"><p>
                When training one might want to simulate a incremental algorithm, feeding the algorithm partial
                increment of the initial dataset.
            </p>
            </div>;
        } else {
            return <div key='key' className="md-cell md-cell--12"><p>
                Not yet implemented!
            </p>
            </div>;
        }
    };

    const incrementalTrains = (label) => {
        if (props.predictionMethod === CLASSIFICATION) {
            const incrementalTrainsN = <TextField
                key="incremental_trains"
                id="incremental_trains"
                label={'incremental_trains'}
                type="number"
                value={label.incremental_trains}
                onChange={props.onChange.bind(this, {methodConfig, key: 'incremental_trains', isNumber: true})}
                min={0}
                defaultValue={0}
                className="md-cell md-cell--3"
            />;

            return [incrementalTrainsN];
        } else {
            const incrementalTrainsN = <TextField
                key="incremental_trains"
                id="incremental_trains"
                label={'incremental_trains'}
                type="number"
                value={label.incremental_trains}
                onChange={props.onChange.bind(this, {methodConfig, key: 'incremental_trains', isNumber: true})}
                min={0}
                defaultValue={0}
                max={0}
                className="md-cell md-cell--3"
            />;

            return [incrementalTrainsN];
        }
    };

    return [helpText(), ...incrementalTrains(props.label)];
};

Incremental.propTypes = {
    onChange: PropTypes.func.isRequired,
    predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION]).isRequired
};
export default Incremental;
