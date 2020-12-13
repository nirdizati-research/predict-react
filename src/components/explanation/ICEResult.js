import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import VerticalBarChartCard from '../../components/chart/VerticalBarChartCard';
import SelectField from 'react-md/lib/SelectFields';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import IceResultTable from './IceResultTable';

class ICEResult extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    onChangeFeature(value, _) {
      this.props.onChangeFeature(value);
    }
    getTraceSelector() {
        return (
          <SelectField
            id="trace-select"
            placeholder="Feature Name"
            className="md-cell"
            menuItems={this.props.attributes}
            position={SelectField.Positions.BELOW}
            onChange={this.onChangeFeature.bind(this)}

          />
        );
      }
    render() {
        return (
               <Card className="md-block-centered">
                 <CardTitle title="ICE Result for a single attribute: "></CardTitle>
                 <CardText>
                  <p>ICE plot shows correlation of each feature with the label values (1 = False, 2 = True).</p>
                  <h4>Select a feature for ICE, LIME and SHAP</h4>
                  {this.getTraceSelector()}
                </CardText>
                {!this.props.isIceValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
                  <CardText>
                    {this.props.iceValueList.count.length != 0 ?
                    this.props.iceValueList.count.length < 70 ?
                    <VerticalBarChartCard
                        labels = {this.props.iceValueList.values}
                        count = {this.props.iceValueList.count}
                        data = {this.props.iceValueList.labels}>
                    </VerticalBarChartCard>
                    :
                    <IceResultTable
                      iceResultList = {this.props.originalList}>
                    </IceResultTable>
                    : null
                    }
                  </CardText>
              </Card>
        );
    }
}
ICEResult.propTypes = {
  iceValueList: PropTypes.any,
  jobId: PropTypes.any,
  isIceValuesLoaded: PropTypes.bool,
  selectedAttribute: PropTypes.any,
  attributes: PropTypes.any,
  onChangeFeature: PropTypes.func,
  originalList: PropTypes.any
};
export default ICEResult;
