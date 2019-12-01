/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React, {PureComponent} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import TraceTable from '../../components/explanation/TraceTable';

class TraceExplanation extends PureComponent {
  constructor(props) {
    super(props);
    const traceId = '';
    this.state = {
      traceArr: {attributes: [], events: []},
      traceAttributesHeader: [],
      traceEventsHeaders: [],
      traceId: traceId,
      // traceValues: this.props.jobs.traceAttributes
    };
  }

  componentDidUpdate(prevProps) {
    //   if (prevProps.jobs.traceAttributes!=null && this.props.jobs.traceAttributes!=null) {
    //     if (prevProps.jobs.traceAttributes.trace_id != this.props.jobs.traceAttributes.trace_id) {
    //       this.setState({events: this.props.traceArr.events.slice(0, 10)});
    //   }
    // }
    if (prevProps.selectedTrace !== this.props.selectedTrace || prevProps.traceList !== this.props.traceList) {
      this.getTraceAttributes();
    }
  }

  selectTraceChange(value, _) {
    this.setState({traceId: value});
    this.props.traceChange(value);
    this.getTraceAttributes();
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
  getMethods() {
    return (
      <SelectField
        id="method-select"
        placeholder="Method id"
        className="md-cell"
        menuItems={['Method 1', 'Method 2']}
        position={SelectField.Positions.BELOW}
      />
    );
  }

  getTraceAttributes() {
    let i=0;

    let traceList = this.props.traceList;
    if (traceList == undefined) {
      traceList = [];
    }
    let traceAttributesHeader = [];
    let traceEventsHeaders = [];
    for (i =0; i<traceList.length; i++) {
      traceAttributesHeader = Object.keys(traceList[0]['attributes']);
      traceEventsHeaders = Object.keys(traceList[0]['events'][0]);
      break;
    }
    let traceArr = {'attributes': [], 'events': []};
    i=0;
    for (i =0; i<traceList.length; i++) {
      if (traceList[i]['attributes']['concept:name'] == this.props.selectedTrace) {
        let attrValues = [];
        let traceEvents = [];
        let events = [];
        traceAttributesHeader.map((key) => {
          attrValues.push(traceList[i]['attributes'][key]);
        });
        traceList[i]['events'].map((event) => {
          events = [];
          traceEventsHeaders.map((key) => {
            events.push(event[key]);
          });
          traceEvents.push(events);
        });
        traceArr = {'attributes': attrValues, 'events': traceEvents};
        break;
      }
    }
    this.setState({traceArr: traceArr});
    this.setState({traceAttributesHeader: traceAttributesHeader});
    this.setState({traceEventsHeaders: traceEventsHeaders});
  }

  render() {
    return (
      <Card className="md-block-centered">
        <CardTitle title="Trace Explanation" />
        <CardText>
          <h4>Select the trace composition</h4>
          {this.getTraceSelector()}
        </CardText>
        <CardText>
          <h2>Trace table</h2>
          <TraceTable
            traceAttributesHeader={this.state.traceAttributesHeader}
            traceEventsHeaders={this.state.traceEventsHeaders}
            traceArr={this.state.traceArr} />
        </CardText>
      </Card>
    );
    }
}

TraceExplanation.propTypes = {
  traceChange: PropTypes.func.isRequired,
  traceList: PropTypes.any.isRequired,
  traceIdList: PropTypes.any.isRequired,
  selectedTrace: PropTypes.string.isRequired
};
export default TraceExplanation;
