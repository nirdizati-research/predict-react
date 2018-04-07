import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ServerUpload from './ServerUpload.jsx';

const UploadCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Upload"/>
    <CardText>
      <h3>After upload create a Split with this log!</h3>

      Upload a single log file.
      Log parameters for the charts will be calculated during the upload and this process may take time. Remain patient!
      <ServerUpload/>
    </CardText>
  </Card>;
};


export default UploadCard;
