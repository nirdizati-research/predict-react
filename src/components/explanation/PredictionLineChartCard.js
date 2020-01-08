import React from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PredictionLineChart from '../chart/PredictionLineChart';
import PropTypes from 'prop-types';
import {parsePredictionResultList} from '../../util/dataReducers';

const PredictionLineChartCard = (props) => {
    const predictionData = parsePredictionResultList(props.data);
    return <Card >
        <CardTitle title="Temporal Stability"></CardTitle>
        <CardText>
            { props.traceId != '' && props.jobId != '' ?
                'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
        </CardText>
        <CardText>
            <div className="md-cell md-cell--12">
            <PredictionLineChart
            data = {predictionData.data}
            categories = {predictionData.categories}/>
            </div>
        </CardText>

    </Card>;
};
PredictionLineChartCard.propTypes = {
    data: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any
};
export default PredictionLineChartCard;
