import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
// Containers
import Full from './containers/Full/';
import Dashboard from './views/Dashboard/';
import Upload from './views/Upload/Upload';
import JobStatus from './views/JobStatus/JobStatus';
import Training from './views/Training/Training';
import Validation from './views/Validation/Validation';
import Split from './views/Split';
import Prediction from './views/Prediction/Prediction';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="upload" name="Upload" component={Upload}/>
      <Route path="split" name="Split" component={Split}/>
      <Route path="jobStatus" name="Job status" component={JobStatus}/>
      <Route path="training" name="Training" component={Training}/>
      <Route path="validation" name="Validation" component={Validation}/>
      <Route path="prediction" name="Prediction" component={Prediction}/>
    </Route>
  </Router>
);
