/**
 * Created by tonis.kasekamp on 9/29/17.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/TextFields/index';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

const groupStyle = {height: 'auto'};

class Threshold extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.threshold;
  }

  onTextFieldChange(threshold) {
    this.setState({threshold});
    this.onChange({threshold, value: this.state.value});
  }

  onCheckChange(value) {
    this.setState({value});
    this.onChange({threshold: this.state.threshold, value});
  }

  onChange(data) {
    // Don't push empty data
    if (data.threshold === '') {
      return;
    }
    this.props.onChange({threshold: parseInt(data.threshold, 10), value: data.value});
  }

  render() {
    let numSelection = null;
    if (this.state.value !== this.props.thresholdControls[0].value) {
      numSelection = <TextField
        id="threshold"
        label="Threshold"
        type="number"
        // defaultValue={0}
        value={this.state.threshold}
        onChange={this.onTextFieldChange.bind(this)}
        min={0}
        pattern="^d+(\.|\,)\d{2}"
        className="text-fields__application__price md-cell"
        required
      />;
    }

    return <div className="md-cell">
      Select a threshold to distinguish "true" and "false" cases
      <SelectionControlGroup type="radio" name="threshold" id="threshold"
                             onChange={this.onCheckChange.bind(this)} controls={this.props.thresholdControls}
                             value={this.state.value} controlStyle={groupStyle}/>
      {numSelection}

    </div>;
  }
}

Threshold.propTypes = {
  thresholdControls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  threshold: PropTypes.shape({
    threshold: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Threshold;
