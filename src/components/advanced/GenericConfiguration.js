import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-md/lib/index';
import {ExpansionPanel} from 'react-md/lib/ExpansionPanels/index';


const customFooter = (url) => (
  <footer style={{padding: 24}}>
    <Button flat secondary href={url} target="_blank">Documentation</Button>
  </footer>
);

export default class GenericConfiguration extends PureComponent {
  static propTypes = {
    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    panelLabel: PropTypes.string.isRequired,
    documentationUrl: PropTypes.string.isRequired,
    children: PropTypes.any
  };

  render() {
    const {panelLabel, documentationUrl, ...remProps} = this.props;
    return <ExpansionPanel key={panelLabel} label={panelLabel}
                           footer={customFooter(documentationUrl)}
                           contentClassName="md-grid" {...remProps}>
      {this.props.children}
    </ExpansionPanel>;
  }
}

