/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {selectLabelProptype} from '../../propTypes';
// import ConfigTable from './ConfigTable';

const ExplanationHeaderCard = (props) => {
    // const checkBoxChange = (value, event) => {
    //   props.prefixChange(event.target.value);
    // };

    const selectChange = (value, _) => {
        props.splitChange(value);
    };

    return <Card className="md-block-centered">
        <CardTitle title="Select event log">
            <SelectField
                id="log-name-select"
                placeholder="No log selected"
                className="md-cell"
                menuItems={props.splitLabels}
                position={SelectField.Positions.BELOW}
                onChange={selectChange}
                value={props.selectedSplitId}
            /></CardTitle>
    </Card>;
};


ExplanationHeaderCard.propTypes = {
    splitLabels: selectLabelProptype,
    splitChange: PropTypes.func.isRequired,
    selectedSplitId: PropTypes.number.isRequired,

};
export default ExplanationHeaderCard;
