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
import {splittingMethods} from '../../reference';
import {fetchStatePropType, logPropType} from '../../propTypes';

class SplitFormCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_log: 1,
      splitting_method: splittingMethods[0].value,
      test_size: 0.2
    };
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  selectChange(value, _) {
    this.setState({original_log: value});
  }

  splittingMethodChange(value, _) {
    this.setState({splitting_method: value});
  }

  testSizeChange(value, _) {
    this.setState({test_size: value});
  }

  render() {
    const itemsWithLabel = Object.values(this.props.logs).map((log) => ({value: log.id, label: log.name}));

    return (
      <Card className="md-block-centered">
        <CardTitle title="Create split"/>
        <CardText>
          <p>Select log and configuration to create test set. The table below will be updated when a split has
            been successfully created.</p>
          <div className="md-grid">
            <SelectField
              id="log-name-select"
              label="Log file"
              className="md-cell md-cell--4"
              menuItems={itemsWithLabel}
              position={SelectField.Positions.BELOW}
              onChange={this.selectChange.bind(this)}
              value={this.state.original_log}
            />
            <SelectField
              id="split-type-select"
              className="md-cell md-cell--4"
              label="How to split the log"
              menuItems={splittingMethods}
              position={SelectField.Positions.BELOW}
              onChange={this.splittingMethodChange.bind(this)}
              value={this.state.splitting_method}
            />
            <div className="md-cell md-cell--4">
              <Slider
                id="test-size"
                label="Test set percentage. Default 0.2.  Min = 0, Max = 1, Step = 0.05"
                min={0}
                max={1}
                step={0.05}
                value={this.state.test_size}
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
  logs: PropTypes.objectOf(logPropType).isRequired,
  fetchState: fetchStatePropType,
  onSubmit: PropTypes.func.isRequired
};

export default SplitFormCard;
