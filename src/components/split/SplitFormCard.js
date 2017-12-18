/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
import Button from 'react-md/lib/Buttons/Button';
import {CardActions} from 'react-md';

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
  }

  render() {
    const itemsWithLabel = this.props.logs.map(({id, name}) => ({value: id, label: name}));

    return (
      <Card className="md-block-centered">
        <CardTitle title="Create split"/>
        <CardText>
          <p>Select log to create test set. There is no configuration yet, so just press ok.</p>
          <SelectField
            id="log-name-select"
            className="md-cell"
            menuItems={itemsWithLabel}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.state.original_log}
          />
          <FetchState fetchState={this.props.fetchState}/>

          <CardActions className="md-full-width">
            <Button raised primary swapTheming onClick={this.onSubmit.bind(this)}>Submit</Button>
          </CardActions>
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
  onSubmit: PropTypes.func.isRequired
};

export default SplitFormCard;
