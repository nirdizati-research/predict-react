/**
 * Created by tonis.kasekamp on 9/29/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const CheckboxGroup = (props) => {
    return <SelectionControlGroup type="checkbox" label={props.label} name={props.id} id={props.id}
                                  onChange={props.onChange} controls={props.controls} inline
                                  value={props.value} defaultValue={props.defaultValue}/>;
};

CheckboxGroup.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
};

export default CheckboxGroup;
