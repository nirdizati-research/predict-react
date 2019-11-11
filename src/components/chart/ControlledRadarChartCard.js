import React, {Component} from 'react';
import {CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import {
  makeTable,
  getPrefixLengthValues,
  getAllPrefixValuesAllConfig,
  getRadarChartValues,
  getColumnNames
} from '../../util/dataReducers';
import SelectField from 'react-md/lib/SelectFields/index';
import {
  CLASSIFICATION,
  REGRESSION,
  TIME_SERIES_PREDICTION
} from '../../reference';
import {Row, Col, Container} from 'react-grid-system';
import 'react-svg-radar-chart/build/css/index.css';
import RadarChartCard from './RadarChartCard';
import {getRadarChartHeaders} from '../validation/ColumnHelper';

class ControlledRadarChartCard extends Component {
  constructor(props) {
    super(props);

    const data = makeTable(this.props.jobs, getRadarChartHeaders(this.props.predictionMethod)[0]);
    const [, ...rows] = data;
    const prefixValues = getPrefixLengthValues(rows);
    if (prefixValues.length > 1) prefixValues.push('average');
    const prefixLengthValue = prefixValues[0];
    const columnNames = getColumnNames(data);
    columnNames.shift();
    const columnName = columnNames[0];
    this.state = {
      prefixLengthValue,
      predictionMethod: this.props.predictionMethod,
      radarCharLabels: getRadarChartHeaders(this.props.predictionMethod),
      prefixValues: prefixValues,
      columnNames,
      columnName
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.predictionMethod !== this.props.predictionMethod) {
      const data = makeTable(this.props.jobs, getRadarChartHeaders(this.props.predictionMethod)[0]);
      const [, ...rows] = data;
      const prefixValues = getPrefixLengthValues(rows);
      if (prefixValues.length > 1) prefixValues.push('average');
      const prefixLengthValue = prefixValues[0];
      const columnNames = getColumnNames(data);
      columnNames.shift();
      const columnName = columnNames[1];
      this.setState({
        prefixLengthValue: prefixLengthValue,
        prefixValues: prefixValues,
        predictionMethod: this.props.predictionMethod,
        radarCharLabels: getRadarChartHeaders(this.props.predictionMethod),
        columnNames: columnNames,
        columnName: columnName
      });
    }
  }

  selectPrefixLengthValueChange(value) {
    this.setState({prefixLengthValue: value});
  }

  selectColumnValueChange(value) {
    this.setState({columnName: value});
  }

  getPrefixLengthValuesSelector() {
    return (
      <SelectField
        id="prefix-length-select"
        placeholder="Prefix length values"
        className="md-cell"
        menuItems={this.state.prefixValues}
        position={SelectField.Positions.BELOW}
        onChange={this.selectPrefixLengthValueChange.bind(this)}
        value={this.state.prefixLengthValue}
      />
    );
  }

  getColumnValuesSelector() {
    return (
      <SelectField
        id="column-name-select"
        placeholder="Column name"
        className="md-cell md-cell--12"
        menuItems={this.state.columnNames}
        position={SelectField.Positions.BELOW}
        onChange={this.selectColumnValueChange.bind(this)}
        value={this.state.columnName}
      />
    );
  }

  render() {
    const radarChartObjects = getAllPrefixValuesAllConfig(
      this.props.jobs,
      this.state.radarCharLabels
    );
    const radarChart = (
      <RadarChartCard
        data={getRadarChartValues(
          this.state.radarCharLabels,
          radarChartObjects,
          this.state.prefixLengthValue,
          this.state.columnNames.indexOf(this.state.columnName) + 1
        )}
        labels={this.state.radarCharLabels}
      />
    );
    const style = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    };
    return (
      <div>
          <Container>
            <Row>
              <Col>
                <CardTitle title={`Prefix length`}>
                  {this.getPrefixLengthValuesSelector()}
                </CardTitle>
              </Col>
              <Col>
                <CardTitle title={`Column name `}>
                  {this.getColumnValuesSelector()}
                </CardTitle>
              </Col>
            </Row>
          </Container>
          <CardText style={style}>{radarChart}</CardText>
      </div>
    );
  }
}
ControlledRadarChartCard.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([
    CLASSIFICATION,
    REGRESSION,
    TIME_SERIES_PREDICTION
  ]).isRequired
};

export default ControlledRadarChartCard;
