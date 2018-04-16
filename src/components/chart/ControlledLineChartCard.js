import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {jobPropType} from '../../helpers';
import {makeLabels, makeTable} from '../../util/dataReducers';
import SelectField from 'react-md/lib/SelectFields/index';


class ControlledLineChartCard extends Component {
  constructor(props) {
    super(props);

    const labels = makeLabels(this.props.jobs);
    const metricName = labels.length > 0 ? labels[0].label : null;
    this.state = {
      jobs: this.props.jobs,
      metricName,
      labels
    };
  }

  selectChange(value) {
    this.setState({metricName: value});
  }
  getSelector() {
    return <SelectField
      id="metric-select"
      placeholder="Metric name"
      className="md-cell"
      menuItems={this.state.labels}
      position={SelectField.Positions.BELOW}
      onChange={this.selectChange.bind(this)}
      value={this.state.metricName}
    />;
  }

  render() {
    const data = makeTable(this.state.jobs, this.state.metricName);
    const columns = data[0].map((label) => {
      return {type: 'number', label};
    });
    const [header, ...rows] = data;
    const opts = {
      vAxis: {
        title: this.state.metricName
      },
      hAxis: {
        title: 'Prefix length'
      },
    };

    const chart = <Chart
      chartType="LineChart"
      rows={rows}
      columns={columns}
      options={opts}
      graph_id="rasdasfas"
      width="100%"
      legend_toggle
    />;
    return <Card className="md-block-centered">
      <CardTitle title={`Prefix length by ${this.state.metricName}`}/>
      <CardText>
        {this.getSelector()}
        {rows.length === 0 ? 'No data' : chart}
      </CardText>
    </Card>;
  }
}

ControlledLineChartCard.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired
};

export default ControlledLineChartCard;
