/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {predictionMethods} from '../../reference';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import RegConfigTable from './RegConfigTable';
import ClassConfigTable from './ClassConfigTable';


class ConfigTableCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predictionMethod: predictionMethods[0].value,
    };
  }

  onPredictionMethodChange(value) {
    this.setState({predictionMethod: value});
  }

  // TODO make predictionMethod and type match
  getTable() {
    switch (this.state.predictionMethod) {
      case 'time':
        return <RegConfigTable jobs={this.props.jobs.filter((job) => job.type === 'Regression')}/>;
      case 'outcome':
        return <ClassConfigTable jobs={this.props.jobs.filter((job) => job.type === 'Classification')}/>;
      case 'nextActivity':
        return null;
      default:
        break;
    }
  }

  render() {
    const table = this.getTable();
    return <Card className="md-block-centered">
      <CardTitle title="Configuration overview"/>
      <CardText>
        <div className="md-grid md-grid--no-spacing">
          <div className="md-cell md-cell--12">
            <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                                   value={this.state.predictionMethod} inline controls={predictionMethods}
                                   onChange={this.onPredictionMethodChange.bind(this)}/>
            {table}
          </div>
        </div>
      </CardText>
    </Card>;
  }
}

ConfigTableCard.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    run: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    prefix: PropTypes.number.isRequired,
    rule: PropTypes.string,
    threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired,
    result: PropTypes.object.isRequired
  })).isRequired,
  selectChange: PropTypes.func.isRequired
};
export default ConfigTableCard;
