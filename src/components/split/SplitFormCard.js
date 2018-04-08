/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
import Button from 'react-md/lib/Buttons/Button';
import {CardActions, Slider} from 'react-md';
import {splitTypes} from '../../reference';

class SplitFormCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_log: 0,
      config: {
        split_type: splitTypes[0].value,
        test_size: 0.2
      }
    };
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  selectChange(value, _) {
    this.setState({original_log: value});
  }

  splitTypeChange(value, _) {
    this.setState({config: {...this.state.config, split_type: value}});
  }

  testSizeChange(value, _) {
    this.setState({config: {...this.state.config, test_size: value}});
  }

  render() {
    const itemsWithLabel = this.props.logs.map(({id, name}) => ({value: id, label: name}));

    return (
      <Card className="md-block-centered">
        <CardTitle title="Create split"/>
        <CardText>
          <p>Select log to create test set. There is no configuration yet, so just press ok. The split table below will
            be updated upon successful split.</p>
          <div className="md-grid">
            <div className="md-cell md-cell--3">
              <h4 className="md-cell md-cell--12">Log to split</h4>
              <SelectField
                id="log-name-select"
                className="md-cell md-cell--12"
                menuItems={itemsWithLabel}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this)}
                value={this.state.original_log}
              />
            </div>
            <div className="md-cell md-cell--3">
              <h4 className="md-cell md-cell--12">How to split the log</h4>
              <SelectField
                id="split-type-select"
                className="md-cell md-cell--12"
                menuItems={splitTypes}
                position={SelectField.Positions.BELOW}
                onChange={this.splitTypeChange.bind(this)}
                value={this.state.config.split_type}
              />
            </div>
            <div className="md-cell md-cell--3">
              <Slider
                id="test-size"
                label="Test set percentage. Default 0.2.  Min = 0, Max = 1, Step = 0.05"
                min={0}
                max={1}
                step={0.05}
                value={this.state.config.test_size}
                valuePrecision={2}
                discrete
                onChange={this.testSizeChange.bind(this)}
              />
            </div>
          </div>

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
