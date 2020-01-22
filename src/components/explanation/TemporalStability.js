import React from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PredictionLineChart from '../chart/PredictionLineChart';
import PropTypes from 'prop-types';
import {parseTemporalStabilityLimeResultList, parseTemporalStabilityPredictionResultList}
from '../../util/dataReducers';
import ScatterChartCard from '../chart/ScatterChartCard';
import {Row} from 'react-grid-system';

const TemporalStability = (props) => {
    const temporalStabilityLimeResult = parseTemporalStabilityLimeResultList(props.limeTemporalChartData, '00000912');
    const temporalStabilityPredictionResult =
        parseTemporalStabilityPredictionResultList(props.predictionTemportalChartData, '00000916');

    return <div className="md-cell md-cell--12">
        <Row>
             <Card className="md-cell md-cell--6">
                <CardTitle title="Lime result with temporal stability"></CardTitle>
                <CardText>
                    { props.traceId != '' && props.jobId != '' ?
                        'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
                </CardText>
                <CardText>
                    <div>
                    <ScatterChartCard
                    data = {temporalStabilityPredictionResult}/>
                    </div>
                </CardText>
        </Card>
        <Card className="md-cell md-cell--6">
            <CardTitle title="Prediction"></CardTitle>
            <CardText>
                { props.traceId != '' && props.jobId != '' ?
                    'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
            </CardText>
            <CardText>
                <div>
                <PredictionLineChart
                data = {temporalStabilityLimeResult.data}
                categories = {temporalStabilityLimeResult.categories}/>
                </div>
            </CardText>
        </Card>
    </Row>
    </div>
    ;
};
TemporalStability.propTypes = {
    limeTemporalChartData: PropTypes.any.isRequired,
    predictionTemportalChartData: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any
};
export default TemporalStability;
