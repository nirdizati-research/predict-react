import React from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PredictionLineChart from '../chart/PredictionLineChart';
import PropTypes from 'prop-types';
import {parseTemporalStabilityLimeShapResultList}
from '../../util/dataReducers';
import {Row} from 'react-grid-system';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const TemporalStability = (props) => {
    const temporalStabilityLimeResult =
        parseTemporalStabilityLimeShapResultList(props.limeTemporalChartData, props.traceId);
    const temporalStabilityShapResult =
        parseTemporalStabilityLimeShapResultList(props.shapTemporalChartData, props.traceId);
  return <div className="md-cell md-cell--12">
        <Row>
            <Card className="md-cell md-cell--6">
                <CardTitle title="SHAP result with temporal stability"></CardTitle>
                <CardText>
                    { props.traceId != '' && props.jobId != '' ?
                        'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
                </CardText>
                {!props.isShapTempStabilityLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}

                <CardText>
                    <div>
                    <PredictionLineChart
                    data = {temporalStabilityShapResult.data}
                    categories = {temporalStabilityShapResult.categories}/>
                    </div>
            </CardText>
        </Card>
             <Card className="md-cell md-cell--6">
                <CardTitle title="LIME result with temporal stability"></CardTitle>
                <CardText>
                    { props.traceId != '' && props.jobId != '' ?
                        'Temporal stability result with trace id: '+ props.traceId +' and job id: '+ props.jobId: ''}
                </CardText>
                {!props.isLimeTempStabilityLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}

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
    shapTemporalChartData: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any,
    isLimeTempStabilityLoaded: PropTypes.bool.isRequired,
    isShapTempStabilityLoaded: PropTypes.bool.isRequired
};
export default TemporalStability;
