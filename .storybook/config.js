import {configure} from '@kadira/storybook';
// Link to the app CSS
import '../public/css/style.css';


// TODO automatically load all files in stories folder
function loadStories() {
  require('../stories/JobStatusTable');
  require('../stories/FetchState');
  require('../stories/LogListCard');
}

configure(loadStories, module);
