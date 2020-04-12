import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const ScatterChartCard = props => {
    let scatterChartState = {
        series: [{
            data: props.data
            }],
      options: {
        type: 'scatter',
        chart: {
          toolbar: {
            show: false
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        },
        yaxis: {
           title: {
              text: 'Prediction',
            },
          tickAmount: 2,
          min: 0,
          max: 2,
          axisBorder: {
            show: true,
            color: '#000000',
            offsetX: 0,
            offsetY: 0
        },
        },
        xaxis: {
            min: 0,
            max: props.data.length + 1,
            tickAmount: props.data.length + 1,
            title: {
               text: 'Time',
             },
        }
      }
    };

    let chart = <ReactApexChart
        options={scatterChartState.options}
        // series={props.data}
        series={scatterChartState.series}
        type="scatter"
        height ="350em"
      />;
      return <div id="chart">{props.data.length === 0
        ? '' : chart}</div>;
  };


  ScatterChartCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  };

  export default ScatterChartCard;
