import React, {PureComponent} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../images/nirdizati-logo-e1501821874335.png';
import {Avatar, Button, DialogContainer, FontIcon, List} from 'react-md';
import GuideItem from './static/GuideItem';


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
            <GuideItem
              avatar={<Avatar suffix="red">1</Avatar>}
              button={<Button flat primary href={'/#/upload'} iconEl={<FontIcon>backup</FontIcon>}>Upload</Button>}
              title="Upload"
              text="Upload a log file"
            />
            <GuideItem
              avatar={<Avatar suffix="orange">2</Avatar>}
              button={<Button flat primary href={'/#/logs'} iconEl={<FontIcon>description</FontIcon>}>Log
                details</Button>}
              title="Log details"
              text="Check the log details"
              threeLines
            />
            <GuideItem
              avatar={<Avatar suffix="yellow">3</Avatar>}
              button={<Button flat primary href={'/#/split'} iconEl={<FontIcon>swap_horiz</FontIcon>}>Split</Button>}
              title="Split"
              text="Split the log into a training and a test set"
              threeLines
            />
            <GuideItem
              avatar={<Avatar suffix="light-green">4</Avatar>}
              button={<Button flat primary href={'/#/label'}
                              iconEl={<FontIcon>label_outline</FontIcon>}>Labelling</Button>}
              title="Labelling"
              text="(Optional) Test the label distribution for a given labeling"
              threeLines
            />
            <GuideItem
              avatar={<Avatar suffix="cyan">5</Avatar>}
              button={<Button flat primary href={'/#/training'}
                              iconEl={<FontIcon>build</FontIcon>}>Training</Button>}
              title="Training"
              text="Submit a prediction task to train a predictive model with an array of configuration options"
              threeLines
            />
            <GuideItem
              avatar={<Avatar suffix="purple">6</Avatar>}
              title="Task status"
              text={'Check the status of the enqueued prediction tasks'}
              button={<Button flat primary href={'/#/jobs'} iconEl={<FontIcon>list</FontIcon>}>Task status</Button>}
              threeLines
            />
            <GuideItem
              avatar={<Avatar suffix="pink">7</Avatar>}
              button={<Button flat primary href={'/#/validation'}
                              iconEl={<FontIcon>insert_chart</FontIcon>}>Validation</Button>}
              title="Validation"
              text="Compare the resulting models using different metrics and download the results"
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

