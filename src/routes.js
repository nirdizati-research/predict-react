import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
// Containers
import Full from './containers/Full/';
import Dashboard from './views/Dashboard/';
import Upload from './views/Upload/Upload';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="upload" name="Upload" component={Upload}/>
      <Route path="page2" name="Page 2" component={Dashboard}/>
    </Route>
  </Router>
);
