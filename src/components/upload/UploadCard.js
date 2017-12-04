import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ServerUpload from './ServerUpload.jsx';

const UploadCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Upload"/>
    <CardText>
      Upload a single log file.
      <ServerUpload/>
    </CardText>
  </Card>;
};


export default UploadCard;
