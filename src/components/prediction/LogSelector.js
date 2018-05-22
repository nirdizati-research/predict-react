import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
import {logsStore} from '../../propTypes';

class LogSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_log: 0,
      config: {}
    };
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  selectChange(value, _) {
    this.setState({original_log: value});
    this.props.logChange(value);
  }

  render() {
    const itemsWithLabel = []
    for (var k in this.props.logs){
      if (this.props.logs.hasOwnProperty(k)) {
        var log={value: this.props.logs[k].id, label : this.props.logs[k].name}
        itemsWithLabel.push(log)
       }
    }

    return (
      <Card className="md-block-centered">
        <CardTitle title="Select the Log"/>
        <CardText>
          <SelectField
            id="log-name-select"
            className="md-cell"
            menuItems={itemsWithLabel}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.props.logId}
          />
          <FetchState fetchState={this.props.fetchState}/>
        </CardText>
      </Card>);
  }
}

LogSelector.propTypes = {
  logs: logsStore,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  logChange: PropTypes.func.isRequired,
  logId: PropTypes.number.isRequired
};

export default LogSelector;
