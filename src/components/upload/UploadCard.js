import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import ServerUpload from './ServerUpload.jsx';

const UploadCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Single log file upload"/>
    <CardText>
      <h3>Once uploaded, you can split the log into training and validation log files.</h3>
      <p>Supported log file format are <span className="md-font-semibold">.xes</span></p>
      Upload a single log file.
      Metrics for the charts on Log details page will be calculated during the upload and this process may take
      time. Remain patient!
      <ServerUpload/>
    </CardText>
  </Card>;
};


export default UploadCard;
