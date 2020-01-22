import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class PredictionLineChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let graph = {
          options: {
            chart: {
              height: 350,
              type: 'line',

              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Average High & Low Temperature',
              align: 'left'
            },
            markers: {
              size: 1
            },
            xaxis: {
              min: 0,
              max: this.props.data.length +1,
              tickAmount: this.props.data.length +1,
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Prediction'
              },
              min: -1,
              max: 2,
              tickAmount: 3,
              labels: {
                formatter: function (val, i) {
                  return val;
                }
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
        };
          const height = 4 * 65;
          const chart = (
            <ReactApexChart
              options={graph.options}
              series={this.props.data}
              type="line"
              height={height}
            />
          );
          return <div id="chart">{this.props.data.length === 0 ? '' : chart}</div>;
        }
}
PredictionLineChart.propTypes = {
    data: PropTypes.any.isRequired,
    categories: PropTypes.any.isRequired
};
export default PredictionLineChart;
