/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {
  hAxis: {
    title: 'Encoding methods',
    minValue: 0,
  },
  vAxis: {
    title: 'Time in seconds',
  },
  chartArea: {width: '60%'},
  bar: {groupWidth: '75%'},
};

const columns = [
  {type: 'string', label: 'Encoding method'},
  {type: 'number', label: 'Hospital log'},
  {type: 'string', role: 'annotation'},
  {type: 'number', label: 'BPI 2012'},
  {type: 'string', role: 'annotation'},
  {type: 'number', label: 'BPI 2017'},
  {type: 'string', role: 'annotation'},
];

const data = [
  columns,
  ['Frequency', 0.11, '0.11', 1.35, '1.35', 5.44, '5.44'],
  ['Boolean', 0.08, '0.08', 1.71, '1.71', 7.29, '7.29'],
  ['Simple index', 0.21, '0.21', 2.86, '2.86', 14.60, '14.60'],
  ['Last payload', 0.20, '0.20', 2.57, '2.86', 20.11, '20.11'],
  ['Complex index', 0.50, '0.50', 4.32, '4.32', 45.27, '45.27'],

];

const EncodingByLogCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Encoding performance by log size" subtitle="Tested version 1.0.0"/>
    <CardText>
      The encoding methods in this tool have a different performance impact. The size of the log also effects the
      encoding time. The following chart illustrates the relative difference of the methods and log sizes.
      The logs for this test are:
      <ul>
        <li><a href="https://data.4tu.nl/repository/uuid:915d2bfb-7e84-49ad-a286-dc35f063a460">Hospital log</a> about
          the treatment of Sepsis cases. It contains 1,050 traces and 15,214 events
        </li>
        <li><a href="https://data.4tu.nl/repository/uuid:3926db30-f712-4394-aebc-75976070e91f">BPI challenge
          2012</a> about a loan application process. It contains 13,087 traces and 262,200 events
        </li>
        <li><a href="https://data.4tu.nl/repository/uuid:5f3067df-f10b-45da-b98b-86ae4c7a310b">BPI challenge
          2017</a> about a loan application process. It contains 31,509 traces and 1,202,267 events
        </li>
      </ul>

      As can be seen, there is no performance difference with a small log file. However using a massive event log with
      tens of thousands of traces will have a significant impact on the encoding time.
      <Chart
        chartType="ColumnChart"
        data={data}
        options={opts}
        graph_id="encoding-by-log"
        width="100%"
      />
    </CardText>
  </Card>;
};

export default EncodingByLogCard;
