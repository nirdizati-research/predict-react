import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {
  hAxis: {
    title: 'Classification methods',
    minValue: 0,
  },
  vAxis: {
    title: 'Time in seconds',
  },
  chartArea: {width: '60%'},
  bar: {groupWidth: '75%'},
  isStacked: false,
};

const columns = [
  {type: 'string', label: 'Classification method'},
  {type: 'number', label: 'Log read in time'},
  {type: 'string', role: 'annotation'},
  {type: 'number', label: 'Encoding method'},
  {type: 'string', role: 'annotation'},
  {type: 'number', label: 'Method time'},
  {type: 'string', role: 'annotation'},
];

const data = [
  columns,
  ['Decision tree', 278.42, '278.42', 1.66, '1.66', 0.06, '0.06'],
  ['Random forest', 268.41, '268.41', 1.78, '1.78', 0.39, '0.39'],
  ['KNN', 286.33, '286.33', 1.19, '1.19', 4.60, '4.60'],
];

export const ClassificationMethodsCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Classification method comparison" subtitle="Tested version 1.0.0"/>
    <CardText>
      <p>How long does it take to run various classification methods? This is the answer.</p>
      <p>
        The classification tests were run with the configuration: encoding type boolean, no padding, prefix length 20,
        prediction label duration, no clustering and default classification method parameters. </p>

      The logs for this test are:
      <ul>
        <li><a href="https://data.4tu.nl/repository/uuid:5f3067df-f10b-45da-b98b-86ae4c7a310b">BPI challenge
          2017</a> about a loan application process. It contains 31,509 traces and 1,202,267 events
        </li>
      </ul>


      This is a big log file, so normal tasks won&apos;t take so long.
      <Chart
        chartType="ColumnChart"
        data={data}
        options={opts}
        graph_id="class-methods"
        width="100%"
      />
    </CardText>
  </Card>;
};
