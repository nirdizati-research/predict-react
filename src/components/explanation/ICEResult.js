import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import VerticalBarChartCard from '../../components/chart/VerticalBarChartCard';
import SelectField from 'react-md/lib/SelectFields';

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
        return (
            <div className="md-cell md-cell--12">
                    <div> <h2>ICE result</h2></div>
                    <div>
                        <h4>Select the prefix</h4>
                        {this.getTraceSelector()}
                    </div>
                    <VerticalBarChartCard
                        data = {this.props.iceResult.values}
                        count = {this.props.iceResult.count}
                        labels = {this.props.iceResult.labels}>
                    </VerticalBarChartCard>
            </div>
        );
    }
}
ShapResult.propTypes = {
    iceResult: PropTypes.any,
    jobId: PropTypes.any,
};
export default ShapResult;
