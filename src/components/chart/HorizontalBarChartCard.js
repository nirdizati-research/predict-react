import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";

class HorizontalBarChartCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
                        barHeight: '80%',
                    },
                 
                },
                dataLabels: {
                    enabled: true
                },
                yaxis:{show: true,
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        offsetX: 0,
                        offsetY: 0
                    },
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    categories: ['Atheizm', 'Christian', 'Religion.misc', 'Mideast']
                }
            },
            series: [{
                name: 'Value',
                data: [0.3, 0.4, 0.14, 0.48]
            }],
        }
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="200" />
            </div>
        );
    }
}

export default HorizontalBarChartCard;