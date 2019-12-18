import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const RadarChartCard = props => {
  let radarstates = {
    options: {
      type: 'radar',
      chart: {
        toolbar: {
          show: false
        },
      },
      labels: props.labels,
      plotOptions: {
        radar: {
          size: 98,
          polygons: {
            strokeColor: '#e9e9e9',
            fill: {
            }
          }
        }
      },
      markers: {
        size: 3,
        colors: ['#fff'],
        strokeColor: '#FF4560',
        strokeWidth: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          }
        }
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max: 1,
        labels: {
          formatter: function (val, i) {
            return '';
          }
        }
      }
    }
  };

  return (
    <ReactApexChart
      options={radarstates.options}
      series={props.data}
      type="radar"
      height ="250em"
    />
  );
};

RadarChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  labels: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired
};

export default RadarChartCard;
