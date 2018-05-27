import PropTypes from 'prop-types';

import React from 'react';
import {DialogContainer} from 'react-md';

const contentProps = {id: 'scrolling-content-dialog-content'};


const HelpDialog = (props) => {
  const paragraphs = props.texts.map((text, i) => (
    <p key={i}>
      {text}
    </p>
  ));

  return <DialogContainer
    id="help-dialog"
    visible={props.visible}
    title="Help dialog"
    onHide={props.hide}
    contentProps={contentProps}
    width={600}
    focusOnMount={false}
  >
    {paragraphs}
  </DialogContainer>;
};

HelpDialog.propTypes = {
  texts: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

export default HelpDialog;
