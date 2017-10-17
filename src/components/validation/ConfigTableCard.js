/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import RegConfigTable from './RegConfigTable';
import ClassConfigTable from './ClassConfigTable';


class ConfigTableCard extends Component {
  // TODO make predictionMethod and type match
  getTable() {
    switch (this.props.predictionMethod) {
      case 'Regression':
        return <RegConfigTable jobs={this.props.jobs}/>;
      case 'Classification':
        return <ClassConfigTable jobs={this.props.jobs}/>;
      case 'NextActivity':
        return <RegConfigTable jobs={this.props.jobs}/>;
      default:
        break;
    }
  }

  render() {
    const table = this.getTable();
    return <Card className="md-block-centered">
      <CardTitle title="Configuration overview"/>
      <CardText>
        {table}
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
  predictionMethod: PropTypes.string.isRequired
};
export default ConfigTableCard;
