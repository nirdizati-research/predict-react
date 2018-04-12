import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-md/lib/index';
import {ExpansionPanel} from 'react-md/lib/ExpansionPanels/index';


const CustomFooter = (url) => (
  <footer style={{padding: 24}}>
    <Button flat secondary href={url}>Documentation</Button>
  </footer>
);
const GenericConfiguration = (props) => {
  return <ExpansionPanel label={props.panelLabel} secondaryLabel="Advanced configuration"
                         footer={CustomFooter(props.documentationUrl)} contentClassName="md-grid">
    {props.children}
  </ExpansionPanel>;
};

GenericConfiguration.propTypes = {
  onChange: PropTypes.func.isRequired,
  panelLabel: PropTypes.string.isRequired,
  documentationUrl: PropTypes.string.isRequired,
  children: PropTypes.any
};
export default GenericConfiguration;
