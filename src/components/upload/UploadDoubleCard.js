import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import UploadDouble from './UploadDouble.jsx';

const UploadDoubleCard = (props) => {
  return <Card className="md-block-centered">
    <CardTitle title="Upload"/>
    <CardText>
      <UploadDouble/>
    </CardText>
  </Card>;
};


export default UploadDoubleCard;
