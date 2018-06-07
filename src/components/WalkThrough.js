import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../images/nirdizati-logo-e1501821874335.png';
import {Avatar, Button, FontIcon, List, ListItem} from 'react-md';

/* eslint-disable max-len */
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
      <div className="md-grid">
        <List className="md-cell md-cell--12">
          <ListItem
            leftAvatar={<Avatar suffix="purple">1</Avatar>}
            rightIcon={<Button flat primary href={'/#/upload'} iconEl={<FontIcon>backup</FontIcon>}>Upload</Button>}
            primaryText="Upload"
            secondaryText="Upload a log file"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="red">2</Avatar>}
            rightIcon={<Button flat primary href={'/#/logs'} iconEl={<FontIcon>description</FontIcon>}>Log
              details</Button>}
            primaryText="Log details"
            secondaryText="Check the log details"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="pink">3</Avatar>}
            rightIcon={<Button flat primary href={'/#/split'} iconEl={<FontIcon>swap_horiz</FontIcon>}>Split</Button>}
            primaryText="Split"
            secondaryText="Split the log into a training and a test set"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="amber">4</Avatar>}
            rightIcon={<Button flat primary href={'/#/label'}
                               iconEl={<FontIcon>label_outline</FontIcon>}>Labelling</Button>}
            primaryText="Labelling"
            secondaryText="(Optional) Test the label distribution for a given labeling"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="yellow">5</Avatar>}
            rightIcon={<Button flat primary href={'/#/training'} iconEl={<FontIcon>build</FontIcon>}>Training</Button>}
            primaryText="Training"
            secondaryText="Submit a prediction task to train a predictive model with an array of configuration options"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="cyan">6</Avatar>}
            primaryText="Task status"
            secondaryText={'Check the status of the enqueued prediction tasks'}
            rightIcon={<Button flat primary href={'/#/jobs'} iconEl={<FontIcon>list</FontIcon>}>Task status</Button>}
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="blue">7</Avatar>}
            rightIcon={<Button flat primary href={'/#/validation'}
                               iconEl={<FontIcon>insert_chart</FontIcon>}>Validation</Button>}
            primaryText="Validation"
            secondaryText="Compare the resulting models using different metrics and download the results"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="light-green">8</Avatar>}
            rightIcon={<Button flat primary href={'/#/prediction'}
                               iconEl={<FontIcon>work</FontIcon>}>Prediction</Button>}
            primaryText="Prediction"
            secondaryText="Create a prediction of an incomplete track"
            threeLines
          />
          <ListItem
            leftAvatar={<Avatar suffix="green">9</Avatar>}
            rightIcon={<Button flat primary href={'/#/runtime'}
                               iconEl={<FontIcon>flash_on</FontIcon>}>Runtime</Button>}
            primaryText="Runtime"
            secondaryText="Create continuous predictions for a stream of events"
            threeLines
          />
        </List>
      </div>
    </CardText>
  </Card>;
};

export default WalkThrough;
