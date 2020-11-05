/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import HorizontalBarChartCard from '../../components/chart/HorizontalBarChartCard';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const ShapResult = (props) => {
    const horizontalBarChart = <HorizontalBarChartCard
    data = {props.shapValueList.values}
    labels = {props.shapValueList.labels}/>;
    return <Card className="md-cell md-cell--12">
        <CardTitle title="SHAP Result for a single trace"/>
        <CardText>
        {props.traceId != '' && props.jobId != '' ?
                  'Shap result with trace id: '+ props.traceId
                   +', job id: '+ props.jobId + ' and prefix: ' + props.attributeId: ''}
        </CardText>
        {!props.isShapValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
        <CardText>
            <div className="md-cell md-cell--12" key="1">
                {props.shapValueList.values.length > 0 ? horizontalBarChart : null }
            </div>
        </CardText>
    </Card>;
};


ShapResult.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    shapValueList: PropTypes.any.isRequired,
    isShapValuesLoaded: PropTypes.bool.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any,
    attributeId: PropTypes.any

};
export default ShapResult;
