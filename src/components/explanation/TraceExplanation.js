/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React, {PureComponent} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import TraceTable from '../../components/explanation/TraceTable';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {getTraceAttributes} from '../../util/dataReducers';

class TraceExplanation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableProgressBar: false,
    };
  }

  componentDidUpdate(prevProps) {
      if (this.props.traceList.length>0) {
        this.setState({tableProgressBar: false});
      }
  }

  selectTraceChange(value, _) {
    this.props.traceChange(value);
    this.setState({tableProgressBar: true});
  }

  getTraceSelector() {
    return (
      <SelectField
        id="trace-select"
        placeholder="Trace id"
        className="md-cell"
        menuItems={this.props.traceIdList}
        position={SelectField.Positions.BELOW}
        onChange={this.selectTraceChange.bind(this)}
        value={this.props.selectedTrace}
      />
    );
  }

  render() {
    const attrs = getTraceAttributes(this.props.traceList, this.props.selectedTrace);
    return (
      <Card className="md-block-centered">
        <CardTitle title="Trace table" />
        <CardText>
          <h4>Select the trace composition</h4>
          {this.getTraceSelector()}
        </CardText>
        <CardText>
          <TraceTable
            traceAttributesHeader={attrs.traceAttributesHeader}
            traceEventsHeaders={attrs.traceEventsHeaders}
            traceArr={attrs.traceArr} />
            {this.state.tableProgressBar ? <CircularProgress id="query-indeterminate-progress"/> : null}
        </CardText>
      </Card>
    );
    }
}

TraceExplanation.propTypes = {
  traceChange: PropTypes.func.isRequired,
  traceList: PropTypes.array.isRequired,
  traceIdList: PropTypes.any.isRequired,
  selectedTrace: PropTypes.string.isRequired
};
export default TraceExplanation;
