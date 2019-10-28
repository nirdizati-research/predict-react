import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
import {fetchStatePropType, selectLabelProptype} from '../../propTypes';

class LogSelector extends Component {
  selectChange(value, _) {
    this.props.splitChange(value);
  }

  render() {
    return (
      <Card className="md-block-centered">
        <CardTitle title="Select the Log"/>
        <CardText>
            <SelectField
            id="log-name-select"
            placeholder="No log selected"
            className="md-cell"
            menuItems={this.props.splitLabels}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.props.selectedSplitId}
            />
            <div>Prefix length (maximum {this.props.maxPLength})</div>
            <FetchState fetchState={this.props.fetchState}/>
        </CardText>
      </Card>);
  }
}

LogSelector.propTypes = {
  splitLabels: selectLabelProptype,
  maxPLength: PropTypes.number.isRequired,
  fetchState: fetchStatePropType,
  splitChange: PropTypes.func.isRequired,
  selectedSplitId: PropTypes.number,
};

export default LogSelector;
