/**
 * Created by Tõnis Kasekamp on 20.09.2017.
 */
import React from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {fetchStatePropType} from '../propTypes';

const FetchState = (props) => {
  let message = null;
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
  fetchState: fetchStatePropType,
};
export default FetchState;
