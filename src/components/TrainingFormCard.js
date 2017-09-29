/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import FetchState from './FetchState';
import {REG_TRAINING} from '../constants';
import {clustering, encoding, regression} from '../reference';

const defaultPrefix = 1;

const controlCreator = (optMap) => {
  return optMap.map((opt) => {
    return {
      key: opt.value,
      value: opt.value,
      label: <div>{opt.label}
        <div className="md-caption">{opt.message}</div>
      </div>
    };
  });
};

class TrainingFormCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logName: this.props.logNames[0],
      encoding: [encoding[0].value],
      clustering: [clustering[0].value],
      regression: [regression[0].value],
      displayWarning: false
    };
  }

  selectChange(value) {
    this.setState({logName: value});
  }

  checkboxChange(value, event) {
    // First val is ''
    const valList = value.split(',').filter((val) => val !== '');
    switch (event.target.name) {
      case 'encoding[]':
        this.setState({encoding: valList});
        break;
      case 'clustering[]':
        this.setState({clustering: valList});
        break;
      case 'regression[]':
        this.setState({regression: valList});
        break;
      default:
        break;
    }

    this.setState((prevState, _) => {
      return {displayWarning: this.displayWarningCheck(prevState)};
    });
  }

  displayWarningCheck(prevState) {
    const good = prevState.encoding.length !== 0
      && prevState.clustering.length !== 0
      && prevState.regression.length !== 0;
    return !good;
  }

  getSubmitPayload() {
    return {
      log: this.state.logName,
      prefix: defaultPrefix,
      encoding: this.state.encoding,
      regression: this.state.regression,
      clustering: this.state.clustering
    };
  }

  onSubmit() {
    if (!this.state.displayWarning)
      this.props.onSubmit(REG_TRAINING, this.getSubmitPayload());
  }

  render() {
    const encodingMethods = controlCreator(encoding);
    const clusteringMethods = controlCreator(clustering);
    const regressionMethods = controlCreator(regression);

    let warning = null;
    if (this.state.displayWarning) {
      warning =
        <p className="md-text md-text--error">Select at least one encoding, clustering and regression method!</p>;
    }
    const groupStyle = {height: 'auto'};
    return (
      <Card className="md-block-centered">
        <CardTitle title="Training">
          <SelectField
            id="log-name-select"
            placeholder="log.xes"
            className="md-cell"
            menuItems={this.props.logNames}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            defaultValue={this.props.logNames[0]}
          /></CardTitle>
        <CardText>
          <div className="md-grid md-grid--no-spacing">
            <div className="md-cell">
              <SelectionControlGroup type="checkbox" label="Encoding methods" name="encoding" id="encoding"
                                     onChange={this.checkboxChange.bind(this)} controls={encodingMethods}
                                     defaultValue={this.state.encoding[0]} controlStyle={groupStyle}/>
            </div>
            <div className="md-cell">
              <SelectionControlGroup type="checkbox" label="Clustering methods" name="clustering" id="clustering"
                                     onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                                     defaultValue={this.state.clustering[0]} controlStyle={groupStyle}/>
            </div>
            <div className="md-cell">
              <SelectionControlGroup type="checkbox" label="Regression methods" name="regression" id="regression"
                                     onChange={this.checkboxChange.bind(this)} controls={regressionMethods}
                                     defaultValue={this.state.regression[0]}/>
            </div>
            <div className="md-cell md-cell--12 ">
              {warning}
              <FetchState fetchState={this.props.fetchState}/>
              <Button raised primary swapTheming onClick={this.onSubmit.bind(this)}
                      disabled={this.state.displayWarning}>Submit</Button>
            </div>
          </div>

        </CardText>
      </Card>
    );
  }
}

TrainingFormCard.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};


export default TrainingFormCard;
