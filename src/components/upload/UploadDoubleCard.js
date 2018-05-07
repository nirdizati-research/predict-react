import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import UploadDouble from './UploadDouble.jsx';

const UploadDoubleCard = () => {
  return <Card className="md-block-centered">
    <CardTitle title="Training and test set upload"/>
    <CardText>
      <p>Supported log file formats are <span className="md-font-semibold">xes, mxml, xes.gz and mxml.gz</span></p>
      Upload two log files.
      Log parameters for the charts will be calculated during the upload and this process may take time. Remain patient!
      <UploadDouble/>
    </CardText>
  </Card>;
};


export default UploadDoubleCard;
