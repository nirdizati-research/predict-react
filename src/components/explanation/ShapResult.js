import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import InlineSVG from 'svg-inline-react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

class ShapResult extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

        render() {
            return (
              <Card className="md-block-centered">
                <CardTitle title="SHAP Result for a single trace"></CardTitle>
                <CardText>
                  { this.props.traceId != '' && this.props.jobId != '' ?
                  'SHAP result with trace id: '+ this.props.traceId
                   +' and job id: '+ this.props.jobId: ''}
              </CardText>
                <CardText>
                  {!this.props.isShapValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
                  {JSON.stringify(this.props.shapValueList) !='{}'? <InlineSVG
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    href preserveAspectRatio="xMidYMid slice"
                    className="md-cell md-cell--12" alt="svg"
                    src={this.props.shapValueList }/>
                    : null}
                </CardText>
              </Card>
            );
        }
}
ShapResult.propTypes = {
  shapValueList: PropTypes.any.isRequired,
  traceId: PropTypes.any,
  jobId: PropTypes.any,
  shapSelectedTrace: PropTypes.string.isRequired,
  isShapValuesLoaded: PropTypes.bool.isRequired,
};
export default ShapResult;
