/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import RegConfigTable from './RegConfigTable';
import ClassConfigTable from './ClassConfigTable';
import {CLASSIFICATION, LABELLING, REGRESSION} from '../../reference';
import {jobPropType} from '../../helpers';
import {jobToValidationTable} from '../../util/dataReducers';
import LabelConfigTable from './LabelConfigTable';


class ConfigTableCard extends Component {
  getTable() {
    const flatJobs = this.props.jobs.map(jobToValidationTable);
    switch (this.props.predictionMethod) {
      case REGRESSION:
        return <RegConfigTable jobs={flatJobs}/>;
      case CLASSIFICATION:
        return <ClassConfigTable jobs={flatJobs}/>;
      case LABELLING:
        return <LabelConfigTable jobs={flatJobs} onClick={this.props.onClick}/>;
      // no default
    }
  }

  getHelpText() {
    if (this.props.predictionMethod === LABELLING) {
      return <p>Click on the row to see the label distribution results below the table.</p>;
    }
    return null;
  }

  render() {
    const table = this.props.jobs.length > 0 ? this.getTable() : null;
    return <Card className="md-block-centered">
      <CardTitle title="Configuration overview"/>
      <CardText>
        {this.getHelpText()}
        {table}
      </CardText>
    </Card>;
  }
}

ConfigTableCard.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, LABELLING]).isRequired,
  onClick: PropTypes.func
};
export default ConfigTableCard;
