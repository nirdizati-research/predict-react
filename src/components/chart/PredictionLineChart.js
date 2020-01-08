import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class PredictionLineChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let graph = {
            series: [{
                name: 'Value',
                data: this.props.data
            }],
            options: {
              chart: {
                height: 50,
                type: 'line',
                toolbar: {
                    show: false
                  },
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: this.props.categories,
                title: {
                  text: 'Event number',
                },
              },
              yaxis: {
                title: {
                  text: 'Prediction value',
                },
              }
            }
          };
          const height = 4 * 65;
          const chart = (
            <ReactApexChart
              options={graph.options}
              series={graph.series}
              type="line"
              height={height}
            />
          );
            return <div id="chart">{chart}</div>;
        }
}
PredictionLineChart.propTypes = {
    data: PropTypes.any.isRequired,
    categories: PropTypes.any.isRequired
};
export default PredictionLineChart;
