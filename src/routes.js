import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
// Containers
import Full from './containers/Full/';
import Upload from './views/Upload/Upload';
import JobStatus from './views/JobStatus/JobStatus';
import Training from './views/Training/Training';
import Validation from './views/Validation/Validation';
import Split from './views/Split';
import Labelling from './views/Labelling';
import FrontPage from './views/FrontPage';
import Logs from './views/Logs/Logs';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={FrontPage}/>
      <Route path="home" name="Home" component={FrontPage}/>
      <Route path="logs" name="Logs" component={Logs}/>
      <Route path="upload" name="Upload" component={Upload}/>
      <Route path="split" name="Split" component={Split}/>
      <Route path="labelling" name="Labelling" component={Labelling}/>
      <Route path="jobStatus" name="Job status" component={JobStatus}/>
      <Route path="training" name="Training" component={Training}/>
      <Route path="validation" name="Validation" component={Validation}/>
    </Route>
  </Router>
);
