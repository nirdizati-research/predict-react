/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import React from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import PropTypes from 'prop-types';

const FetchState = (props) => {
  let message = <div></div>;
  if (props.fetchState.inFlight) {
    message = <CircularProgress id="query-indeterminate-progress"/>;
  } else if (props.fetchState.error) {
    message = <div><code>
      {props.fetchState.error}
    </code></div>;
  }
  return message;
};

FetchState.propTypes = {
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
};
export default FetchState;
