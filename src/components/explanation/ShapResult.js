import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Row} from 'react-grid-system';
import SelectField from 'react-md/lib/SelectFields';
import scratch from '../../mock_data/scratch.png';
import dependencePlot from '../../mock_data/dependence_plot.png';

class ShapResult extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    getTraceSelector() {
        return (
          <SelectField
            id="trace-select"
            placeholder="Trace id"
            className="md-cell"
            menuItems={["00000001","00000002","00000003","00000004"]}
            position={SelectField.Positions.BELOW}
            value={"00000001"}
          />
        );
      }
        render() {
            return (
                <div className="md-cell md-cell--12">
                    <Row className="md-cell md-cell--12">
                        <Card className="md-cell md-cell--6">
                                <CardTitle title="SHAP dependence plot"></CardTitle>
                                <img src={dependencePlot} className="md-cell md-cell--12" alt="svg" />
                        </Card>
                        <Card className="md-cell md-cell--6">
                            <CardTitle title="SHAP Result for a single trace"></CardTitle>
                            <CardText>
                                <h4>Select the trace composition</h4>
                                {this.getTraceSelector()}
                            </CardText>
                            <img src={scratch} className="md-cell md-cell--12" alt="svg" />
                        </Card>                  
                </Row>
                </div>
            );
        }
}
ShapResult.propTypes = {
    shapGeneralResult: PropTypes.any.isRequired,
    shapSpecificTraceIdResult: PropTypes.any.isRequired,
    shapSummaryPlotResult: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    jobId: PropTypes.any,
    traceIdList: PropTypes.any.isRequired,
    shapSelectedTrace: PropTypes.string.isRequired
};
export default ShapResult;
