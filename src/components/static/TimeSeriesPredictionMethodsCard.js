import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {
    hAxis: {
        title: 'Time Series Prediction methods',
        minValue: 0,
    },
    vAxis: {
        title: 'Time in seconds',
    },
    chartArea: {width: '60%'},
    isStacked: false,
};

const columns2 = [
    {type: 'string', label: 'Time Series Prediction method'},
    {type: 'number', label: 'Method time'},
    {type: 'string', role: 'annotation'},
];

const dataClass = [
    columns2,
    ['Decision tree', 0.06, '0.06'],
    ['Random forest', 0.39, '0.39'],
    ['KNN', 4.60, '4.60'],
];

export const TimeSeriesPredictionMethodsCard = () => { // TODO: update
    return <Card className="md-cell md-cell--6 md-cell--8-tablet">
        <CardTitle title="Time Series Prediction method comparison" subtitle="Tested version 1.0.0" expander/>
        <CardText expandable>
            <p>How long does it take to run various time series prediction methods? This is the answer.</p>
            <p>
                The time series prediction tests were run with the configuration: encoding type boolean, no padding,
                prefix length 20,
                prediction label duration, no clustering and default classification method parameters. </p>

            The logs for this test are:
            <ul>
                <li><a href="https://data.4tu.nl/repository/uuid:5f3067df-f10b-45da-b98b-86ae4c7a310b">BPI challenge
                    2017</a> about a loan application process. It contains 31,509 traces and 1,202,267 events
                </li>
            </ul>


            This is a big log file, so normal tasks won&apos;t take so long.
            <Chart
                chartType="BarChart"
                data={dataClass}
                options={opts}
                graph_id="class-methods2"
                width="100%"
            />
        </CardText>
    </Card>;
};
export default TimeSeriesPredictionMethodsCard;

