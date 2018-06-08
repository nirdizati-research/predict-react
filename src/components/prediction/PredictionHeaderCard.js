import React, {Component} from 'react';
import {Card, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {selectLabelProptype} from '../../propTypes';

class PredictionHeaderCard extends Component {
  selectChange(value, _) {
    this.props.modelChange(value);
  }

  render() {
    return (
      <Card className="md-block-centered">
        <CardTitle title={this.props.title}>
          <SelectField
            id="log-name-select"
            placeholder="model.xes"
            className="md-cell"
            menuItems={this.props.selectLabelProptype}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.props.modelId}
          /></CardTitle>
      </Card>);
  }
}


PredictionHeaderCard.propTypes = {
  modelsLabel: selectLabelProptype,
  title: PropTypes.string.isRequired,
  modelChange: PropTypes.func.isRequired,
  modelId: PropTypes.number.isRequired
};
export default PredictionHeaderCard;
