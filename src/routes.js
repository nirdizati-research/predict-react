import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
// Containers
import Full from './containers/Full/';
import Dashboard from './views/Dashboard/';
import Upload from './views/Upload/Upload';
import JobStatus from './views/JobStatus/JobStatus';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="upload" name="Upload" component={Upload}/>
      <Route path="jobStatus" name="Job status" component={JobStatus}/>
    </Route>
  </Router>
);
