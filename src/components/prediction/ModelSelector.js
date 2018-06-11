import React, {Component} from 'react';
import {Card} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {selectLabelProptype} from '../../propTypes';
import {Button, CardText} from 'react-md';
import {CLASSIFICATION, REGRESSION} from '../../reference';

class ModelSelector extends Component {
  selectChange({method}, value, _) {
    this.props.modelChange({method}, value);
  }

  render() {
    return (
      <Card className="md-block-centered">
        <CardText>
          <div className="md-grid">
            <div className="md-cell md-cell--6">
              <h4>Regression Model Selection</h4>
              <SelectField
                id="log-name-select"
                placeholder="model.xes"
                className="md-cell"
                menuItems={this.props.regModelsLabel}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this, {method: REGRESSION})}
                value={this.props.regModelId}
              />
            </div>
            <div className="md-cell md-cell--6">
              <h4>Classification Model Selection</h4>
              <SelectField
                id="log-name-select"
                placeholder="model.xes"
                className="md-cell"
                menuItems={this.props.classModelsLabel}
                position={SelectField.Positions.BELOW}
                onChange={this.selectChange.bind(this, {method: CLASSIFICATION})}
                value={this.props.classModelId}
              />
            </div>
            <div className="md-cell md-cell--12">
              <Button raised primary swapTheming onClick={this.props.onSubmit}
                      className="buttons__group">Submit</Button>
              <Button raised secondary swapTheming onClick={this.props.onReset}
                      className="buttons__group">Reset</Button>
            </div>
          </div>
        </CardText>
      </Card>);
  }
}


ModelSelector.propTypes = {
  regModelsLabel: selectLabelProptype,
  classModelsLabel: selectLabelProptype,
  modelChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  classModelId: PropTypes.number.isRequired,
  regModelId: PropTypes.number.isRequired
};
export default ModelSelector;
