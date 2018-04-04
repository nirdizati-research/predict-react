import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {logPropType} from '../../helpers';

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
