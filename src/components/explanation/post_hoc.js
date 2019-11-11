/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import HorizontalBarChartCard from '../../components/chart/HorizontalBarChartCard';

const PostHocExplanation = (props) => {
    const horizontalBarChart = <HorizontalBarChartCard
    data = {props.limeGraphValues.values}
    labels = {props.limeGraphValues.labels}/>;

    return <Card className="md-block-centered">
        <CardTitle title="Graphs"/>
        <CardText>
            <div className="md-cell md-cell--12" key="1">
                {horizontalBarChart}
            </div>
        </CardText>
    </Card>;
};


PostHocExplanation.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    limeGraphValues: PropTypes.any.isRequired,
    predictionMethod: PropTypes.string.isRequired
};
export default PostHocExplanation;
