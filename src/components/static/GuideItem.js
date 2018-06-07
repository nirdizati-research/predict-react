import PropTypes from 'prop-types';
import {Cell, GridList} from 'react-md';
import React from 'react';

const GuideItem = (props) => {
  return <GridList>
    <Cell component="section" size={2}>
      {props.button}
    </Cell>
    <Cell component="section" size={1}>
      {props.avatar}
    </Cell>
    <Cell component="section" size={9}>
      <h5 style={{margin: 0}}>{props.title}</h5>
      <p className="md-caption">{props.text}</p>
    </Cell>
  </GridList>;
};

GuideItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.element.isRequired,
  button: PropTypes.element.isRequired
};

export default GuideItem;
