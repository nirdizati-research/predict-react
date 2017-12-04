import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ServerUpload from './ServerUpload.jsx';

const UploadCard = (props) => {
  return <Card className="md-block-centered">
    <CardTitle title="Upload"/>
    <CardText>
      <ServerUpload/>
    </CardText>
  </Card>;
};


export default UploadCard;
