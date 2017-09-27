/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';

/* eslint-disable max-len */
const encoding = [
  {
    label: 'Simple index',
    value: 'simpleIndex',
    message: 'Each feature corresponds to a position in the trace and the possible values for each feature are the event classes. Event attributes are discarded.'
  },
  {
    label: 'Boolean',
    value: 'boolean',
    message: 'Features represent whether or not a particular event class has occurred in the trace.'
  },
  {
    label: 'Frequency',
    value: 'frequency',
    message: 'Features represent the absolute frequency of each possible event class. Event attributes are discarded.'
  }
];

const clustering = [
  {
    label: 'None',
    value: 'None',
    message: 'No clustering and train a single model'
  },
  {
    label: 'Kmeans',
    value: 'kmeans',
    message: 'Assign traces to k-means clusters and train a model for each cluster'
  }
];

const regression = [
  {
    label: 'Linear',
    value: 'linear'
  },
  {
    label: 'Xboost',
    value: 'xboost'
  },
  {
    label: 'Random forest',
    value: 'randomforest'
  },
  {
    label: 'Lasso',
    value: 'lasso'
  },
];

const labelCreator = (opt) => {
  return {
    key: opt.value,
    value: opt.value,
    label: <div>{opt.label}
      <div className="md-caption">{opt.message}</div>
    </div>
  };
};

class RemainingTimeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logName: '',
      encoding: [encoding[0].value],
      clustering: [clustering[0].value],
      regression: [regression[0].value]
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
    }
  }

  render() {
    const encodingMethods = encoding.map((enc) => labelCreator(enc));
    const clusteringMethods = clustering.map((cl) => labelCreator(cl));
    const regressionMethods = regression.map((cl) => labelCreator(cl));
    const groupStyle = {height: 'auto'};
    return (
      <Card className="md-block-centered">
        <CardTitle title="Remaining time training">
          <SelectField
            id="log-name-select"
            placeholder="log.xes"
            className="md-cell"
            menuItems={this.props.logNames}
            position={SelectField.Positions.BELOW}
            onChange={this.selectChange.bind(this)}
            value={this.props.logNames[0]}
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
          </div>
        </CardText>
      </Card>
    );
  }
}

RemainingTimeCard.propTypes = {
  logNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};


export default RemainingTimeCard;
