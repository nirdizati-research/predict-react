import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {
  hAxis: {
    title: 'Regression methods',
    minValue: 0,
  },
  vAxis: {
    title: 'Time in seconds',
  },
  chartArea: {width: '60%'},
  isStacked: false,
};

const columns2 = [
  {type: 'string', label: 'Regression method'},
  {type: 'number', label: 'Method time'},
  {type: 'string', role: 'annotation'},
];

const dataReg = [
  columns2,
  ['Linear', 0.09, '0.09'],
  ['Lasso', 0.15, '0.15'],
  ['Random forest', 0.35, '0.35'],
];

export const RegressionMethodsCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Regression method comparison" subtitle="Tested version 1.0.0"/>
    <CardText>
      <p>How long does it take to run various regression methods? This is the answer.</p>
      <p>
        The regression tests were run with the configuration: encoding type boolean, no padding, prefix length 20,
        prediction label remaining time, no clustering and default classification method parameters. </p>

      The logs for this test are:
      <ul>
        <li><a href="https://data.4tu.nl/repository/uuid:5f3067df-f10b-45da-b98b-86ae4c7a310b">BPI challenge
          2017</a> about a loan application process. It contains 31,509 traces and 1,202,267 events
        </li>
      </ul>
      The time for any regression method takes up an insignificant percentage of the total task time.
      <Chart
        chartType="BarChart"
        data={dataReg}
        options={opts}
        graph_id="reg-methods"
        width="100%"
      />
    </CardText>
  </Card>;
};
