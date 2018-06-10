import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {logPropType} from '../../propTypes';
import {DialogContainer} from 'react-md';


/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
export const rotate = (visible) => {
  if (visible) {
    return <div id="rotating"><a href="http://math.ut.ee/~sander24/"><img
      src="https://github.com/TKasekamp/Veebirakendus/blob/110fe7c8f0705cc51b78eb2be56a46481e762a04/src/main/webapp/images/kryptox.gif?raw=true"
      alt="sander"/></a>
    </div>;
  } else {
    return null;
  }
};


export const dialog = (visible, hide) => (<DialogContainer
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

const LogMetricsCard = (props) => {
  return <Card className="md-block-centered">
    <CardTitle title="Log metrics" subtitle={props.log.name}/>
    <CardText>
      <div className="md-grid md-grid--no-spacing">
        <div className="md-cell md-cell--9">
          Maximum number of events in trace
        </div>
        <div className="md-cell md-cell--3 md-text-right">
          {props.log.properties.maxEventsInLog}
        </div>
      </div>
    </CardText>
  </Card>;
};


LogMetricsCard.propTypes = {
  log: logPropType
};
export default LogMetricsCard;
