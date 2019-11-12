import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class HorizontalBarChartCard extends React.Component {
  constructor(props) {
    super(props);
    let data = this.props.data;
    let labels = this.props.labels;

    this.state = {
      labels,
      data
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({data: this.props.data});
      this.setState({labels: this.props.labels});
    }
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
          categories: this.state.labels
        }
      },
      series: [
        {
          name: 'Value',
          data: this.state.data
        }
      ]
    };
    const height = this.state.labels.length * 45;
    const chart = (
      <ReactApexChart
        options={graph.options}
        series={graph.series}
        type="bar"
        height={height}
      />
    );

    return <div id="chart">{this.state.data.length === 0 ? '' : chart}</div>;
  }
}

HorizontalBarChartCard.propTypes = {
  data: PropTypes.any.isRequired,
  labels: PropTypes.any.isRequired
};
export default HorizontalBarChartCard;
