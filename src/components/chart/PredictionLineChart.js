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
            stroke: {
              curve: 'smooth',
              show: true,
              width: 2
            },
            dataLabels: {
              enabled: false,
            },
            title: {
              align: 'left'
            },
            markers: {
              size: 5
            },
            xaxis: {
              min: 0,
              max: this.props.data.length +1,
              tickAmount: this.props.data.length +1,
              title: {
                text: 'Prefix length'
              }
            },
            yaxis: {
              title: {
                text: 'Importance'
              },
              axisBorder: {
                show: true,
                color: '#000000',
                offsetX: 0,
                offsetY: 0
              },
              labels: {
                format: '{value:,.5f}'
              }
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'right',
              floating: false,
            }
          },
        };
          const height = '450em';
          const chart = (
            <ReactApexChart
              options={graph.options}
              series={this.props.data}
              type="line"
              height={height}
            />
          );
          return <div id="chart">{this.props.data.length === 0 || this.props.data[0].length === 0
              ? '' : chart}</div>;
        }
}
PredictionLineChart.propTypes = {
    data: PropTypes.any.isRequired,
    categories: PropTypes.any.isRequired
};
export default PredictionLineChart;
