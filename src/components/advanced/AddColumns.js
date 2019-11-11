import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'react-md/lib/index';
import {encodingPropType, labelPropType} from '../../propTypes';
import {ENCODING} from '../../reference';

// Half of labelling object defined here
const methodConfig = ENCODING;
/* eslint-disable no-invalid-this */
const AddColumns = (props) => {
    const header1 = <div key='h1' className="md-cell md-cell--12">
        <h4>Temporal features</h4>
        <p>Temporal features are included as a numeric column. They represent time in seconds.</p>
    </div>;
    const addRemainingTime = <Checkbox
        key="add_remaining_time"
        id="add_remaining_time"
        name="add_remaining_time"
        label="Add remaining time"
        className="md-cell md-cell--3"
        checked={props.encoding.add_remaining_time}
        onChange={props.onChange.bind(this, {methodConfig, key: 'add_remaining_time'})}
    />;

    const addElapsedTime = <Checkbox
        key="add_elapsed_time"
        id="add_elapsed_time"
        name="add_elapsed_time"
        label="Add elapsed time"
        className="md-cell md-cell--3"
        checked={props.encoding.add_elapsed_time}
        onChange={props.onChange.bind(this, {methodConfig, key: 'add_elapsed_time'})}/>;

    const header2 = <div key='h2' className="md-cell md-cell--12">
        <h4>Intercase features</h4>
        <p>Intercase features are computed leveraging aggregated metrics on the entire log. The value of these metrics
            for
            a specific log can be visualized in the Log details page. For any trace at a given prefix length, the value
            is
            the total number of events, resources or new traces occuring concurrently, i.e., occuriring in the same
            date.</p>
    </div>;
    const addExecutedEvents = <Checkbox
        key="add_executed_events"
        id="add_executed_events"
        name="add_executed_events"
        label="Add executed events"
        className="md-cell md-cell--3"
        checked={props.encoding.add_executed_events}
        onChange={props.onChange.bind(this, {methodConfig, key: 'add_executed_events'})}
    />;

    const addResourcesUsed = <Checkbox
        key="add_resources_used"
        id="add_resources_used"
        name="add_resources_used"
        label="Add resources used"
        className="md-cell md-cell--3"
        checked={props.encoding.add_resources_used}
        onChange={props.onChange.bind(this, {methodConfig, key: 'add_resources_used'})}
    />;

    const addNewTraces = <Checkbox
        key="add_new_traces"
        id="add_new_traces"
        name="add_new_traces"
        label="Add new traces"
        className="md-cell md-cell--3"
        checked={props.encoding.add_new_traces}
        onChange={props.onChange.bind(this, {methodConfig, key: 'add_new_traces'})}
    />;

    return [header1, addRemainingTime, addElapsedTime, header2, addExecutedEvents, addResourcesUsed, addNewTraces];
};

AddColumns.propTypes = {
    onChange: PropTypes.func.isRequired,
    labelling: PropTypes.shape(labelPropType).isRequired,
    encoding: PropTypes.shape(encodingPropType).isRequired
};
export default AddColumns;
