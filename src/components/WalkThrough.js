import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../images/nirdizati-logo-e1501821874335.png';
import {Button, Cell, FontIcon, Grid} from 'react-md';

const WalkThrough = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Nirdizati Research"
               subtitle="A Web Application to Support Research in Predictive Monitoring Tasks">
      <div className="md-cell--right">
        <img src={nirdizati} alt="Nirdizati logo"/>
      </div>
    </CardTitle>
    <CardText>
      <p>Nirdizati Research is a tool to find the most suitable predictive model for an event log. The general flow
        to use the application is as follows.</p>
      <Grid>
        <Cell size={2}
        ><Button flat primary href={'/#/upload'} iconEl={<FontIcon>backup</FontIcon>}>Upload</Button></Cell>
        <Cell size={10}>The first step is to upload a log file.</Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/logs'} iconEl={<FontIcon>description</FontIcon>}>Log details</Button></Cell>
        <Cell size={10}>Check out log details page for uploaded log metrics.</Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/split'} iconEl={<FontIcon>swap_horiz</FontIcon>}>Split</Button></Cell>
        <Cell size={10}>The next step is to create a training/test split configuration using the event log. The Split
          configuration can be re-used for multiple prediction and labelling tasks.</Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/label'} iconEl={<FontIcon>label_outline</FontIcon>}>Labelling</Button></Cell>
        <Cell size={10}>Before creating a classification prediction task, there is an option to test out the labelling
          distribution on the Labelling page. The configuration of the labelling tasks can then be used as an input for
          the classification tasks.</Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/training'} iconEl={<FontIcon>build</FontIcon>}>Training</Button></Cell>
        <Cell size={10}>Classification and regression tasks can be created with a multitude of configuration options on
          the Training page. Submitted tasks are enqueued and will be completed when computing resources become
          available. </Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/jobs'} iconEl={<FontIcon>list</FontIcon>}>Task status</Button></Cell>
        <Cell size={10}>Enqueued tasks can be seen on the Task status page.</Cell>
      </Grid>
      <Grid>
        <Cell size={2}>
          <Button flat primary href={'/#/validation'}
                  iconEl={<FontIcon>insert_chart</FontIcon>}>Validation</Button></Cell>
        <Cell size={10}>The
          completed models can be compared using several evaluation metrics with various visualization options on the
          Validation page.</Cell>
      </Grid>
    </CardText>
  </Card>;
};

export default WalkThrough;
