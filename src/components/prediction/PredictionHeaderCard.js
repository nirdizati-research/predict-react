import React, {Component} from 'react';
import {Card, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {modelsLabel} from '../../propTypes';


class PredictionHeaderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_model: 0,
      config: {}
    };
  }

  selectChange(value, _) {
    this.setState({original_model: value});
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
        menuItems={this.props.modelsLabel}
        position={SelectField.Positions.BELOW}
        onChange={this.selectChange.bind(this)}
        value={this.props.modelId}
      /></CardTitle>
    </Card>);
  }
};


PredictionHeaderCard.propTypes = {
  modelsLabel: modelsLabel,
  title: PropTypes.string.isRequired,
  modelChange: PropTypes.func.isRequired,
  modelId: PropTypes.number.isRequired
};
export default PredictionHeaderCard;
