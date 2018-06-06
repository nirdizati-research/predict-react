import React, {PureComponent} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../images/nirdizati-logo-e1501821874335.png';
import {Avatar, Button, DialogContainer, FontIcon, List, ListItem} from 'react-md';


/* eslint-disable max-len */

/* eslint-disable react/no-unescaped-entities */
class WalkThrough extends PureComponent {
  state = {visible: false, other: false};

  imageClick() {
    this.setState({visible: true});
  }

  otherClick() {
    this.setState({other: true});
  }

  hide() {
    this.setState({visible: false});
  }


  render() {
    return <Card className="md-block-centered">
      {dialog(this.state.visible, this.hide.bind(this))}
      <CardTitle title="Nirdizati Research"
                 subtitle="A Web Application to Support Research in Predictive Monitoring Tasks">
        <div className="md-cell--right">
          <img src={nirdizati} alt="Nirdizati logo" onDoubleClick={this.imageClick.bind(this)}/>
        </div>
      </CardTitle>
      <CardText>
        <p>Nirdizati Research is a <span onDoubleClick={this.otherClick.bind(this)}>tool</span> to find the most
          suitable predictive model for an event log. The general flow
          to use the application is as follows.</p>
        {rotate(this.state.other)}
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
              rightIcon={<Button flat primary href={'/#/training'}
                                 iconEl={<FontIcon>build</FontIcon>}>Training</Button>}
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
              leftAvatar={<Avatar suffix="light-green">7</Avatar>}
              rightIcon={<Button flat primary href={'/#/validation'}
                                 iconEl={<FontIcon>insert_chart</FontIcon>}>Validation</Button>}
              primaryText="Validation"
              secondaryText="Compare the resulting models using different metrics and download the results"
              threeLines
            />
          </List>
        </div>
      </CardText>
    </Card>;
  }
}

const rotate = (visible) => {
  if (visible) {
    return <div id="rotating"><a href="http://math.ut.ee/~sander24/"><img
      src="https://github.com/TKasekamp/Veebirakendus/blob/110fe7c8f0705cc51b78eb2be56a46481e762a04/src/main/webapp/images/kryptox.gif?raw=true"
      alt="sander"/></a>
    </div>;
  } else {
    return null;
  }
};

const dialog = (visible, hide) => (<DialogContainer
  id="help-dialog"
  visible={visible}
  title="Help dialog"
  onHide={hide}
  contentProps={{id: 'ids'}}
  width={600}
  focusOnMount={false}
>
  <img src={'https://i.imgur.com/du7CH6G.jpg'} alt="Nirdizati logo" width='550px'/>
  <h4 className="md-text-center">To the brave Horsemen of the Apocalypse!</h4>
  <p>This application is 100% vegan friendly!</p>
  <p>Application developed while searching for Ballmer's Peak.</p>
  <p>Could not be possible without running around Anne canal.</p>
  <p>Special thanks to the person who made me improve the presentation with their inquisitive questions. And for the
    ice cream after the presentation. </p>
  <p>And thanks to all helpers with React and just listening me talk about this application.</p>
  <p className="md-font-semibold">Tõnis Kasekamp</p>
</DialogContainer>);

export default WalkThrough;

