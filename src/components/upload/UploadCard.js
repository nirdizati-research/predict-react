import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ServerUpload from './ServerUpload.jsx';

const UploadCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Option 1. Single log file upload"/>
    <CardText>
      <p>Once uploaded, you can split the log into training and validation log files on the Splitting page.</p>
      <p>Supported log file format is <span className="md-font-semibold">.xes</span></p>
      Upload a single log file.
      Metrics for the charts on Log details page will be calculated during the upload and this process may take
      time. Remain patient!
      <ServerUpload/>
    </CardText>
  </Card>;
};


export default UploadCard;
