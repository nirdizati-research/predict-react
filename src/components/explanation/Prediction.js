import React from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {parseTemporalStabilityPredictionResultList}
from '../../util/dataReducers';
import ScatterChartCard from '../chart/ScatterChartCard';
import {Row} from 'react-grid-system';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const Prediction = (props) => {
    const temporalStabilityPredictionResult =
        parseTemporalStabilityPredictionResultList(props.predictionTemportalChartData, props.traceId);
  return <div className="md-cell md-cell--12">
        <Row>
        <Card className="md-cell md-cell--12">
            <CardTitle title="Prediction"></CardTitle>
            <CardText>
                { props.traceId != '' && props.jobId != '' ?
                    'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
            </CardText>
            {!props.isPredictionTempStabilityLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}

            <CardText>
                    <div>
                    <ScatterChartCard
                    data = {temporalStabilityPredictionResult}/>
                    </div>
            </CardText>
        </Card>
    </Row>
    </div>
    ;
};
Prediction.propTypes = {
    predictionTemportalChartData: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any,
    isPredictionTempStabilityLoaded: PropTypes.bool.isRequired
};
export default Prediction;
