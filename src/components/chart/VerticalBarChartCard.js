import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class VerticalBarChartCard extends React.Component {
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
        plotOptions: {
          bar: {
            horizontal: false,
            distributed: false,
            columnWidth: '10%',
            barHeight: '80%'
          }
        },
        dataLabels: {

          enabled: true,
          enabledOnSeries: [1],
          formatter: function (val, opts) {
            return val.toFixed(2);
        }
        },
        yaxis: [{
          labels: {
            formatter: function (val, index) {
              return val.toFixed(2);
            }
          },
          title: {
            text: 'Number of traces',
          },
        }, {
          labels: {
            formatter: function (val, index) {
              return val.toFixed(2);
            }
          },
          opposite: true,
          title: {
            text: 'Label'
          }
        }],
        xaxis: {
          labels: {
            show: true
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: true
          },
          categories: this.props.labels
        }
      },
      series: [
        {
          name: 'Feature value',
          type: 'column',
          data: this.props.count
        },
        {
          name: 'Label',
          type: 'line',
          data: this.props.data
        }
      ]
    };
    const height = 400;
    const chart = (
      <ReactApexChart
        options={graph.options}
        series={graph.series}
        height={height}
      />
    );

    return <div id="chart">{this.props.data.length === 0 ? '' : chart}</div>;
  }
}

VerticalBarChartCard.propTypes = {
  data: PropTypes.any.isRequired,
  labels: PropTypes.any.isRequired,
  count: PropTypes.any.isRequired
};
export default VerticalBarChartCard;
