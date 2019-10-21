import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";


const RadarChartCard = (props) => {

  var radarstates = {
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      labels: props.labels,
      plotOptions: {
        radar: {
          size: 88,
          polygons: {
            strokeColor: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff']
            }
          }
        }
      },
      colors: ['#FF4560'],
      markers: {
        size: 3,
        colors: ['#fff'],
        strokeColor: '#FF4560',
        strokeWidth: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (val, i) {
            return ''

          }
        }
      }
    },
    series: [{
      name: 'Value',
      data: props.data
    }]
  };

  return <ReactApexChart
    options={radarstates.options}
    series={radarstates.series}
    type="radar"
    height="260" />
};


export const getRadarChartLabels = () => {
  return['f1_score', 'accuracy', 'precision', 'recall', 'auc'];
};


RadarChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  labels: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default RadarChartCard;