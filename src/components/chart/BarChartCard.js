/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';

const DEFAULT_CHART_COLORS = [
    '#3366CC',
    '#DC3912',
    '#FF9900',
    '#109618',
    '#990099',
    '#3B3EAC',
    '#0099C6',
    '#DD4477',
    '#66AA00',
    '#B82E2E',
    '#316395',
    '#994499',
    '#22AA99',
    '#AAAA11',
    '#6633CC',
    '#E67300',
    '#8B0707',
    '#329262',
    '#5574A6',
    '#3B3EAC'
];

// Custom compare because why not
const compare = (a, b) => {
    if (a[1] > b[1]) {
        return -1;
    }
    if (a[1] < b[1]) {
        return 1;
    }
    return 0;
};

// Make every bar different color
const getColor = (index) => {
    return index > 20 ? DEFAULT_CHART_COLORS[0] : DEFAULT_CHART_COLORS[index];
};

const BarChartCard = (props) => {
    const chart = (props) => {
        // Empty data means empty rows means error
        if (Object.keys(props.data).length === 0 && props.data.constructor === Object) {
            return 'No data, chart cannot be shown';
        }
        const rows = Object.keys(props.data)
            .map((key, index) => {
                if (key === '0') {
                    return ['', props.data[key], 'END: ' + props.data[key], getColor(index)];
                }
                return ['', props.data[key], key + ': ' + props.data[key], getColor(index)];
            });

        rows.sort(compare);
        const opts = {
            legend: 'none',
            hAxis: {
                title: props.hTitle,
                minValue: 0
            },
            vAxis: {
                title: props.chartTitle
            }
        };
        const columns = [
            {
                type: 'string',
                label: props.hTitle,
            },
            {
                type: 'number',
                label: props.chartTitle,
            },
            {
                type: 'string',
                role: 'annotation'
            },
            {
                type: 'string',
                role: 'style'
            }
        ];
        return <Chart
            chartType="BarChart"
            rows={rows}
            columns={columns}
            options={opts}
            graph_id={props.hTitle}
            width="100%"
            legend_toggle
        />;
    };
    return <Card className="md-block-centered">
        <CardTitle title={props.cardTitle}/>
        <CardText>
            {props.description}
            {chart(props)}
        </CardText>
    </Card>;
};

BarChartCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    cardTitle: PropTypes.string.isRequired,
    chartTitle: PropTypes.string.isRequired,
    hTitle: PropTypes.string.isRequired,
    description: PropTypes.string
};

export default BarChartCard;
