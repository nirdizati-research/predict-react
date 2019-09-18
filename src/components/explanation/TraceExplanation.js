/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import {Button} from 'react-md';

const TraceExplanation = (props) => {
    const selectChange = (value, _) => {
        props.splitChange(value);
    };

    // const createEventChoosers = (position) => {
    //     ...
    // };

    return <Card className="md-block-centered">
        <CardTitle title="Trace Explanation"/>
        <CardText>
            <h5>Visualising model number {props.clickedJobId}</h5>
            <h4>Select the trace composition</h4>
            <SelectField
                id="event 1"
                placeholder="No event selected"
                className="md-cell md-cell--1"
                menuItems={
                    [
                        {value: '1', name: '1'},
                        {value: '2', name: '2'}
                    ]
                }
                position={SelectField.Positions.BELOW}
                onChange={selectChange}
                value={props.selectedSplitId}
            />
            <h4>Resulting labeling</h4>
            <Button raised secondary swapTheming onClick={null} className="buttons__group">THIS IS THE RESULTING
                LABEL</Button>
        </CardText>
    </Card>;
};


TraceExplanation.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    splitLabels: selectLabelProptype,
    fetchState: fetchStatePropType,
    methodChange: PropTypes.func.isRequired,
    splitChange: PropTypes.func.isRequired,
    prefixLengths: PropTypes.arrayOf(PropTypes.string).isRequired,
    prefixChange: PropTypes.func.isRequired,
    selectedPrefixes: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedSplitId: PropTypes.number.isRequired,
    filterOptionChange: PropTypes.func.isRequired,
    labelChange: PropTypes.func.isRequired,
    filterOptions: PropTypes.shape({
        encodings: PropTypes.arrayOf(PropTypes.string).isRequired,
        clusterings: PropTypes.arrayOf(PropTypes.string).isRequired,
        classification: PropTypes.arrayOf(PropTypes.string).isRequired,
        regression: PropTypes.arrayOf(PropTypes.string).isRequired,
        timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string).isRequired,
        labelling: PropTypes.any.isRequired,
        attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
        padding: PropTypes.string.isRequired
    }).isRequired,
    predictionMethod: PropTypes.string.isRequired,
    clickedJobId: PropTypes.number.isRequired
};
export default TraceExplanation;
