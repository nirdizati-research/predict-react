/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
class SplitFormCard extends Component {
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
    const itemsWithLabel = this.props.logs.map(({id, name}) => ({value: id, label: name}));

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
            value={this.state.original_log}
          />
          <FetchState fetchState={this.props.fetchState}/>
        </CardText>
      </Card>);
  }
}

SplitFormCard.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  logChange: PropTypes.func.isRequired
};

export default SplitFormCard;
