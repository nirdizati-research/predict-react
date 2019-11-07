import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import Chart from 'react-google-charts';
import {labelJobToTable} from '../../util/tableUtil';

/* eslint-disable no-unused-vars */
const PrefixLineChart = (props) => {
    const data = labelJobToTable(props.jobs);
    const columns = data[0].map((label) => {
        return {type: 'number', label};
    });
    const [_, ...rows] = data;
    const opts = {
        vAxis: {
            title: 'Count'
        },
        hAxis: {
            title: 'Prefix length',
            minValue: rows[0][0]
        },
        legend: {textStyle: {fontSize: 12}},
        chartArea: {right: 150, left: 70},
        interpolateNulls: true
    };

    const chart = <Chart
        chartType="LineChart"
        rows={rows}
        columns={columns}
        options={opts}
        graph_id="prefix_chart"
        width="100%"
        legend_toggle
    />;
    return <Card className="md-block-centered">
        <CardTitle title="Label results by prefix length"/>
        <CardText>
            {rows.length < 2 ? 'Chart cannot be shown. Metrics not available.' : chart}
        </CardText>
    </Card>;
};

PrefixLineChart.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
};

export default PrefixLineChart;
