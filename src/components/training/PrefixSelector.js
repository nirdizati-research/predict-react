import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/TextFields/index';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {paddingControls, prefixTypeControls} from '../../reference';

const groupStyle = {height: 'auto'};

/* eslint-disable camelcase */
class PrefixSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props.prefix, error: false};
  }

  onPaddingChange(padding) {
    this.setState({padding});
    this.onChange();
  }

  onTypeChange(type) {
    this.setState({type});
    this.onChange();
  }

  onPrefixChange(prefix_length) {
    this.setState({prefix_length});
    this.errorCheck(prefix_length);
    this.onChange();
  }

  onChange() {
    // Don't push empty data
    if (this.state.prefix_length === '') {
      return;
    }
    this.props.onChange({
      padding: this.state.padding,
      type: this.state.type,
      prefix_length: parseInt(this.state.prefix_length, 10)
    });
  }

  errorCheck(prefix_length) {
    if (prefix_length === '') {
      return;
    }
    const pref = parseInt(prefix_length, 10);
    if (pref > this.props.maxEventsInLog) {
      this.setState({error: true});
    } else {
      this.setState({error: false});
    }
  }

  render() {
    return <div className="md-cell md-cell--3">
      <SelectionControlGroup type="radio" name="padding" id="padding" label="Encoded log padding"
                             onChange={this.onPaddingChange.bind(this)} controls={paddingControls}
                             value={this.state.padding} controlStyle={groupStyle}/>
      <SelectionControlGroup type="radio" name="type" id="type" label="Prefix generation type"
                             onChange={this.onTypeChange.bind(this)} controls={prefixTypeControls}
                             value={this.state.type} controlStyle={groupStyle}/>
      <p> How many events in a trace to consider. The max for this log is {this.props.maxEventsInLog}.
        Raise number at your own caution because this too high a number will cause errors.</p>
      <TextField
        id="prefixLength"
        label="Prefix length"
        type="number"
        value={this.state.prefix_length}
        onChange={this.onPrefixChange.bind(this)}
        min={0}
        max={this.props.maxEventsInLog}
        className="md-cell md-cell--12"
        required
        error={this.state.error}
        errorText={`Can't be greater than log maximum prefix length ${this.props.maxEventsInLog}`}
      />
    </div>;
  }
}

PrefixSelector.propTypes = {
  prefix: PropTypes.shape({
    padding: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    prefix_length: PropTypes.number.isRequired
  }).isRequired,
  maxEventsInLog: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PrefixSelector;
