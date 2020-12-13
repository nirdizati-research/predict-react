/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import HorizontalBarChartCard from '../chart/HorizontalBarChartCard';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const LimeResult = (props) => {
    const horizontalBarChart = <HorizontalBarChartCard
    data = {props.limeValueList.values}
    labels = {props.limeValueList.labels}/>;
    return <Card className="md-cell md-cell--12">
        <CardTitle title="LIME Result for a single trace"/>
        <CardText>
            <p>LIME shows correlation of each feature with the prediction.</p>
            {props.traceId != '' && props.jobId != '' ?
                  'Lime result with trace id: '+ props.traceId
                   +' and job id: '+ props.jobId + ' and prefix: ' + props.attributeId: ''}
        </CardText>
        {!props.isLimeValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
        {props.error !== '' ? <CardText>{props.error}</CardText> : null}
        <CardText>
            <div className="md-cell md-cell--12" key="1">
                {props.limeValueList.values.length > 0 ? horizontalBarChart : null }
            </div>
        </CardText>
    </Card>;
};


LimeResult.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    limeValueList: PropTypes.any.isRequired,
    isLimeValuesLoaded: PropTypes.bool.isRequired,
    error: PropTypes.string,
    traceId: PropTypes.any,
    jobId: PropTypes.any,
    attributeId: PropTypes.any

};
export default LimeResult;
