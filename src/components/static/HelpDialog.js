import PropTypes from 'prop-types';

import React from 'react';
import {DialogContainer} from 'react-md';

const contentProps = {id: 'scrolling-content-dialog-content'};

const thesisUrl = 'https://comserv.cs.ut.ee/ati_thesis/datasheet.php?id=62131&year=2018';

const actions = [{
  label: 'Thesis Documentation',
  primary: true,
  onClick: () => window.open(thesisUrl),
}];

const HelpDialog = (props) => {
  const paragraphs = props.texts.map((text, i) => (
    <p key={i}>
      {text}
    </p>
  ));


  const header = <p key={0} className={'md-caption'}>This documentation is based on the Master thesis by Tõnis Kasekamp
    called "A Web Application to Support Researchers in Predictive Process Monitoring Tasks". The thesis contains better
    documentation about the functionality, so look there for a full explanation about the configuration
    options.</p>;

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
