import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';


const opts = {};

const columns = [
  {type: 'string', label: ''},
  {type: 'number', label: 'Time'},
  {type: 'number', label: 'F1-score'},
];

const data = [
  columns,
  ['With optimization', 377.61, 0.4649],
  ['No optimization', 326.09, 0.4560],
];

export const HyperOptCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Hyperparameter optimization comparison" subtitle="Tested version 1.0.0"/>
    <CardText>
      <p>Compared to a normal prediction task, the machine learning method is invoked multiple times with various
        parameters when using Hyperparameter optimization. In this test, we compared the results of a classification
        prediction task with and without Hyperparameter optimization. The optimization task was evaluated 10 times with
        the performance metric <b>F1-score</b>.</p>
      <p>
        The tests were run with the configuration: encoding type simple index, no padding, prefix length 20,
        prediction label next activity, no clustering and default classification method parameters. </p>

      The logs for this test are:
      <ul>
        <li><a href="https://data.4tu.nl/repository/uuid:5f3067df-f10b-45da-b98b-86ae4c7a310b">BPI challenge
          2017</a> about a loan application process. It contains 31,509 traces and 1,202,267 events
        </li>
      </ul>
      <p> As can be seen from the table, enabling the optimization increases the task execution
        time by 50 seconds while improving the F1-score metric by close to 1%. This makes hyperparameter optimization a
        credible option for improving the prediction model.</p>
      <Chart
        chartType="Table"
        data={data}
        options={opts}
        graph_id="hyperopt-methods"
        height="100%"
      />
    </CardText>
  </Card>;
};
