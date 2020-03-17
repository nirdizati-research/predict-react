import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import HorizontalBarChartCard from '../../components/chart/HorizontalBarChartCard';
import {parseFairMLResult} from '../../util/dataReducers';

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
            menuItems={['prefix_1', 'prefix_2', 'prefix_3']}
            position={SelectField.Positions.BELOW}
            value={'prefix_1'}
          />
        );
      }

    render() {
        const fairMLResult = parseFairMLResult([{'label': 'Age_1', 'value': 0.5},
            {'label': 'CType_1', 'value': 0.5},
            {'label': 'ClType_1', 'value': 0.5},
            {'label': 'ClaimValue_1', 'value': 0.5},
            {'label': 'PClaims_1', 'value': 0.5},
            {'label': 'lifecycle:transition_1', 'value': 0.5},
            {'label': 'org:resource_1', 'value': 0.5}]);
            const horizontalBarChart = <HorizontalBarChartCard
                data = {fairMLResult.values}
                labels = {fairMLResult.labels}/>;
        return (
            <div className="md-cell md-cell--12">
                    <div> <h2>FairML result</h2></div>
                    <div>
                        <h4>Select the prefix</h4>
                        {this.getTraceSelector()}
                    </div>
                    <div className="md-cell md-cell--12">{horizontalBarChart}</div>

            </div>
        );
    }
}
ShapResult.propTypes = {
    iceResult: PropTypes.any,
    jobId: PropTypes.any,
};
export default ShapResult;
