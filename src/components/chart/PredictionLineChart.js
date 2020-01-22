import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class PredictionLineChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let graph = {
          series: [
            {name: "prefix_1",
            data: [-0.1376, 0.0487, 0.2555, 0.3617, -0.394, -0.2556]
          }
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',

              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
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
                text: 'Time'
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
