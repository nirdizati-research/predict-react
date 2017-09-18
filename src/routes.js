import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
// Containers
import Full from './containers/Full/';
import Dashboard from './views/Dashboard/';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="page1" name="Page 1" component={Dashboard}/>
      <Route path="page2" name="Page 2" component={Dashboard}/>
    </Route>
  </Router>
);
