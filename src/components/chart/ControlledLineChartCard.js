import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import { jobPropType } from '../../propTypes';
import { makeLabels, makeTable, getPrefixLengthValues, getAllPrefixValuesAllConfig, getRadarChartValues } from '../../util/dataReducers';
import SelectField from 'react-md/lib/SelectFields/index';
import { CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION } from '../../reference';
import Chart from 'react-google-charts';
import { Container, Row, Col } from 'react-grid-system';
import 'react-svg-radar-chart/build/css/index.css'
import RadarChartCard from './RadarChartCard';
import { getRadarChartLabels } from './RadarChartCard';




/* eslint-disable no-unused-vars */
class ControlledLineChartCard extends Component {
  constructor(props) {
    super(props);

    const labels = makeLabels(this.props.jobs);
    const metricName = labels.length > 0 ? labels[0].label : null;
    const data = makeTable(this.props.jobs, metricName);
    const [_, ...rows] = data;
    const prefixLengthValue = "average"
    const prefixValues = getPrefixLengthValues(rows)
    prefixValues.push("average")
    this.state = {
      metricName, labels, prefixLengthValue,
      predictionMethod: this.props.predictionMethod,
      radarCharLabels: getRadarChartLabels(),
      prefixValues: prefixValues
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.predictionMethod !== this.props.predictionMethod) {
      const labels = makeLabels(this.props.jobs);
      const metricName = labels.length > 0 ? labels[0].label : null;
      const prefixLengthValue = "average"
      this.setState({ labels, metricName, prefixLengthValue, predictionMethod: this.props.predictionMethod });
    }
  }

  selectMetricNameChange(value) {
    this.setState({ metricName: value });
  }

  selectPrefixLengthValueChange(value) {
    this.setState({ prefixLengthValue: value });
  }

  getMetricNameSelector() {
    return <SelectField
      id="metric-select"
      placeholder="Metric name"
      className="md-cell"
      menuItems={this.state.labels}
      position={SelectField.Positions.BELOW}
      onChange={this.selectMetricNameChange.bind(this)}
      value={this.state.metricName}
    />;
  }

  getPrefixLengthValuesSelector(rows) {
 
    return <SelectField
      id="prefix-length-select"
      placeholder="Prefix length values"
      className="md-cell"
      menuItems={this.state.prefixValues}
      position={SelectField.Positions.BELOW}
      onChange={this.selectPrefixLengthValueChange.bind(this)}
      value={this.state.prefixLengthValue}
    />;
  }

  render() {
    const data = makeTable(this.props.jobs, this.state.metricName);

    const columns = data[0].map((label) => {
      return { type: 'number', label };
    });
    const [_, ...rows] = data;
    const opts = {
      vAxis: {
        title: this.state.metricName,
        minValue: rows[0][0]

      },
      hAxis: {
        title: 'Prefix length'
      },
      interpolateNulls: true,
      legend: { position: 'top' },
    };

    const lineChart = <Chart
      chartType="LineChart"
      rows={rows}
      columns={columns}
      options={opts}
      graph_id="line_chart"
      width="100%"
      legend_toggle
    />;
    const radarChartObjects = getAllPrefixValuesAllConfig(this.props.jobs, this.state.radarCharLabels)
   
    const radarChart = <RadarChartCard
      data={getRadarChartValues(this.state.radarCharLabels, radarChartObjects, rows,
        this.state.prefixLengthValue, this.state.prefixValues.indexOf(this.state.prefixLengthValue))}
      labels={this.state.radarCharLabels} />


    return <Card>
      <Container>
        <Row>
          <Col>
            <CardTitle className="md-cell md-cell--6" title={`Prefix length by `}>{this.getMetricNameSelector()}</CardTitle>
            <CardText style={{ marginTop: "30px", justifyContent: 'center', }} className="md-cell md-cell--12">
              {rows.length === 0 ? 'No data' : lineChart}
            </CardText>
          </Col>
          <Col>
            <CardTitle className="md-cell md-cell--6" title={`Select prefix `}>{this.getPrefixLengthValuesSelector(rows)}</CardTitle>
            <CardText style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className="md-cell md-cell--12">
              {rows.length === 0 ? 'No data' : radarChart}
            </CardText>
          </Col>
        </Row>
      </Container>
    </Card>
  }
}
ControlledLineChartCard.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION]).isRequired,
};

export default ControlledLineChartCard;
