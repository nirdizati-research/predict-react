/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType, fetchStatePropType} from '../../propTypes';
import HorizontalBarChartCard from '../../components/chart/HorizontalBarChartCard';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const PostHocExplanation = (props) => {
    const horizontalBarChart = <HorizontalBarChartCard
    data = {props.limeValueList.values}
    labels = {props.limeValueList.labels}/>;
    return <Card className="md-block-centered">
        <CardTitle title="Graphs"/>
        <CardText>
            {!props.isLimeValuesLoaded ? 'Lime result with trace id: '+ props.traceId +' is loading. Please wait...' :
             'Lime result with trace id: '+ props.traceId}
        </CardText>
        {!props.isLimeValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
        <CardText>
            <div className="md-cell md-cell--12" key="1">
                {props.limeValueList.values.length > 0 ? horizontalBarChart : null}
            </div>
        </CardText>
    </Card>;
};


PostHocExplanation.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    limeValueList: PropTypes.any.isRequired,
    isLimeValuesLoaded: PropTypes.bool.isRequired,
    fetchState: fetchStatePropType,
    traceId: PropTypes.any

};
export default PostHocExplanation;
