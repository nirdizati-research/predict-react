import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../../images/nirdizati-logo-e1501821874335.png';

const WalkThrough = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Nirdizati Research"
               subtitle="A Web Application to Support Research in Predictive Monitoring Tasks">
      <div className="md-cell--right">
        <img src={nirdizati} alt="Nirdizati logo"/>
      </div>
    </CardTitle>
    <CardText>
      <h3>Walkthrough</h3>
      <p>Nirdizati Research is a tool to find the most suitable predictive model for an event log. The general flow
        to use the application is as follows.</p>
      <p>The first step is to upload a log file. The next step is to create a training/test split configuration
        using the event log. The Split configuration can be re-used for multiple prediction and labelling tasks.</p>
      <p>Before creating a classification prediction task, there is an option to test out the labelling
        distribution.
        The configuration of the labelling tasks can then be used as an input for the classification tasks.</p>
      <p>
        Classification and regression tasks can be created with a multitude of configuration options. When the tasks
        have been submitted, they are enqueued and will be completed when computing resources become available. The
        completed models can be compared using several evaluation metrics with various visualization options.</p>
      <p>
        The dashboard is the front page of the application as it provides a walk through of how to use Nirdizati
        Research.</p>
    </CardText>
  </Card>;
};

export default WalkThrough;
