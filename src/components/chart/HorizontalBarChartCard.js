import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class HorizontalBarChartCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let graph = {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            columnWidth: '80%',
            barHeight: '80%'
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          show: true,
          axisBorder: {
            show: true,
            color: '#78909C',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            align: 'left',
            style: {
              color: undefined,
              fontSize: '10px'
            },
            offsetX: 0,
            offsetY: 0
          }
        },
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
          categories: this.props.labels,
        }
      },
      series: [
        {
          name: 'Value',
          data: this.props.data
        }
      ]
    };
    const height = this.props.labels.length * 45;
    const chart = (
      <ReactApexChart
        options={graph.options}
        series={graph.series}
        type="bar"
        height={height}
      />
    );

    return <div id="chart">{this.props.data.length === 0 || this.props.labels.length === 0 ? '' : chart}</div>;
  }
}

HorizontalBarChartCard.propTypes = {
  data: PropTypes.any.isRequired,
  labels: PropTypes.any.isRequired
};
export default HorizontalBarChartCard;
