/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {
  jobPropType
} from '../../propTypes';
import TraceTable from '../../components/explanation/TraceTable';

const TraceExplanation = props => {
  const selectTraceChange = (value, _) => {
    props.traceChange(value);
  };
  const getTraceSelector = () => {
    return (
      <SelectField
        id="trace-select"
        placeholder="Trace id"
        className="md-cell"
        menuItems={props.traceList}
        position={SelectField.Positions.BELOW}
        onChange={selectTraceChange}
        value={props.selectedTrace}
      />
    );
  };

  const getMethods = () => {
    return (
      <SelectField
        id="method-select"
        placeholder="Method id"
        className="md-cell"
        menuItems={['Method 1', 'Method 2']}
        position={SelectField.Positions.BELOW}
      />
    );
  };
  return (
    <Card className="md-block-centered">
      <CardTitle title="Trace Explanation" />
      <CardText>
        <h4>Select the trace composition</h4>
        {getTraceSelector()}
      </CardText>
      <CardText>
        <h4>Models</h4>
        {getMethods()}
      </CardText>
      <CardText>
        <h2>Trace table</h2>
        <TraceTable jobs={props.traceAttributes} />
      </CardText>
    </Card>
  );
};

TraceExplanation.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  traceChange: PropTypes.func.isRequired,
  traceAttributes: PropTypes.any.isRequired,
  traceList: PropTypes.any.isRequired,
  selectedTrace: PropTypes.string.isRequired
};
export default TraceExplanation;
