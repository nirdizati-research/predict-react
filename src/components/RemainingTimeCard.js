/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

class RemainingTimeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  selectChange(value) {
    this.setState({name: value});
  }

  render() {
    return (
      <Card className="md-block-centered">
        <CardTitle title="Log overview"/>
        <CardText>
          <SelectField
            id="log-name-select"
            placeholder="log.xes"
            className="md-cell"
            menuItems={this.props.logNames}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.props.logNames[0]}
          />
          <h3>Encoding methods</h3>
          <p>Each feature corresponds to a position in the trace and the possible values for each feature are the event
            classes. Event attributes are discarded.</p>
          <Checkbox
            id="simpleIndex"
            name="simpleIndex"
            label="Simple Index"
            value="simpleIndex"
            defaultChecked
          />
          <p>Features represent whether or not a particular event class has occurred in the trace.</p>
          <Checkbox
            id="boolean"
            name="boolean"
            label="Boolean"
            value="boolean"
          />
          <p>Features represent the absolute frequency of each possible event class. Event attributes are discarded.</p>
          <Checkbox
            id="frequency"
            name="frequency"
            label="Frequency"
            value="frequency"
          />
        </CardText>
      </Card>
    );
  }
}

RemainingTimeCard.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};


export default RemainingTimeCard;
