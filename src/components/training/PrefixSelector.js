import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/TextFields/index';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {paddingControls, prefixTypeControls} from '../../reference';
import {encodingPropType} from '../../propTypes';

const groupStyle = {height: 'auto'};
const methodConfig = 'encoding';

/* eslint-disable camelcase */
class PrefixSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {error: false};
  }

  onPrefixChange(prefix_length) {
    this.errorCheck(prefix_length);
    this.props.onChange({methodConfig, key: 'prefix_length', isNumber: true}, prefix_length);
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
    const classes = this.props.isLabelForm ? 'md-grid' : 'md-cell md-cell--4';
    const cl = this.props.isLabelForm ? 'md-cell md-cell--3' : '';
    return <div className={classes}>
      <SelectionControlGroup type="radio" name="padding" id="padding" label="Encoded log padding" inline
                             onChange={this.props.onChange.bind(this, {methodConfig, key: 'padding'})} className={cl}
                             controls={paddingControls} value={this.props.encoding.padding} controlStyle={groupStyle}/>
      <SelectionControlGroup type="radio" name="generation_type" id="generation_type" label="Task generation type"
                             onChange={this.props.onChange.bind(this, {methodConfig, key: 'generation_type'})}
                             controls={prefixTypeControls} inline className={cl}
                             value={this.props.encoding.generation_type} controlStyle={groupStyle}/>
      <TextField
        id="prefixLength"
        label={`Prefix length (maximum ${this.props.maxEventsInLog})`}
        type="number"
        value={this.props.encoding.prefix_length}
        onChange={this.onPrefixChange.bind(this)}
        min={0}
        max={this.props.maxEventsInLog}
        required
        className={cl}
        error={this.state.error}
        errorText={`Can't be greater than log maximum prefix length ${this.props.maxEventsInLog}`}
      />
    </div>;
  }
}

PrefixSelector.propTypes = {
  encoding: PropTypes.shape(encodingPropType).isRequired,
  maxEventsInLog: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isLabelForm: PropTypes.bool
};

export default PrefixSelector;
