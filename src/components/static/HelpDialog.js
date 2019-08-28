import PropTypes from 'prop-types';

import React from 'react';
import {DialogContainer} from 'react-md';

const contentProps = {id: 'scrolling-content-dialog-content'};

const thesisUrl = 'http://nirdizati.org/nirdizati-research/';

const actions = [{
  label: 'Online Resources',
  primary: true,
  onClick: () => window.open(thesisUrl),
}];
/* eslint-disable react/no-unescaped-entities */
const HelpDialog = (props) => {
  const paragraphs = props.texts.map((text, i) => (
    <p key={i}>
      {text}
    </p>
  ));
  const header = <p key={0} className='md-caption md-text-justify'> </p>;

  return <DialogContainer
    id="help-dialog"
    visible={props.visible}
    title="Help dialog"
    onHide={props.hide}
    contentProps={contentProps}
    width={600}
    focusOnMount={false}
    actions={actions}
  >
    {header}
    {paragraphs}
  </DialogContainer>;
};

HelpDialog.propTypes = {
  texts: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

export default HelpDialog;
