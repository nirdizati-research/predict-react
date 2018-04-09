/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import RegConfigTable from './RegConfigTable';
import ClassConfigTable from './ClassConfigTable';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {jobPropType} from '../../helpers';
import {jobToValidationTable} from '../../util/dataReducers';


class ConfigTableCard extends Component {
  getTable() {
    const flatJobs = this.props.jobs.map(jobToValidationTable);
    switch (this.props.predictionMethod) {
      case REGRESSION:
        return <RegConfigTable jobs={flatJobs}/>;
      case CLASSIFICATION:
        return <ClassConfigTable jobs={flatJobs}/>;
      case NEXT_ACTIVITY:
        return <RegConfigTable jobs={flatJobs}/>;
      // no default
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
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired
};
export default ConfigTableCard;
