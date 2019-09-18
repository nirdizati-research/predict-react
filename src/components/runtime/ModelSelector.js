import React, {Component} from 'react';
import {Card} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import {selectLabelProptype} from '../../propTypes';
import {Button, CardText} from 'react-md';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../../reference';

class ModelSelector extends Component {
    selectChange({method}, value,) {
        this.props.modelChange({method}, value);
    }

    render() {
        const divstyle = {
            display: 'flex',
        };
        return (
            <Card className="md-block-centered">
                <CardText>
                    <div className="md-grid">
                        <div className="md-cell md-cell--6">
                            <h2>Regression Model Selection</h2>
                            <SelectField
                                id="log-name-select"
                                placeholder="Choose a regression model"
                                className="md-cell"
                                menuItems={this.props.regModelsLabel}
                                position={SelectField.Positions.BELOW}
                                onChange={this.selectChange.bind(this, {method: REGRESSION})}
                                value={this.props.regModelId}
                            />
                        </div>
                        <div className="md-cell md-cell--6">
                            <h2>Classification Model Selection</h2>
                            <SelectField
                                id="log-name-select"
                                placeholder="Choose a clustering model"
                                className="md-cell"
                                menuItems={this.props.classModelsLabel}
                                position={SelectField.Positions.BELOW}
                                onChange={this.selectChange.bind(this, {method: CLASSIFICATION})}
                                value={this.props.classModelId}
                            />
                        </div>
                        <div className="md-cell md-cell--6">
                            <h2>Time Series Prediction Model Selection</h2>
                            <SelectField
                                id="log-name-select"
                                placeholder="Choose a clustering model"
                                className="md-cell"
                                menuItems={this.props.timeSeriesPredModelsLabel}
                                position={SelectField.Positions.BELOW}
                                onChange={this.selectChange.bind(this, {method: TIME_SERIES_PREDICTION})}
                                value={this.props.timeSeriesPredModelId}
                            />
                        </div>
                    </div>
                </CardText>
                <CardText>
                    <div style={divstyle}>
                    </div>
                    <div className="md-cell md-cell--12">
                        <Button raised primary swapTheming onClick={this.props.onSubmit}
                                className="buttons__group">Submit</Button>
                        <Button raised secondary swapTheming onClick={this.props.onReset}
                                className="buttons__group">Reset</Button>
                    </div>
                </CardText>
            </Card>);
    }
}


ModelSelector.propTypes = {
    regModelsLabel: selectLabelProptype,
    classModelsLabel: selectLabelProptype,
    timeSeriesPredModelsLabel: selectLabelProptype,
    modelChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    classModelId: PropTypes.number.isRequired,
    regModelId: PropTypes.number.isRequired,
    timeSeriesPredModelId: PropTypes.number.isRequired
};
export default ModelSelector;
