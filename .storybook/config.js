import {configure} from '@kadira/storybook';
// Link to the app CSS
import '../public/css/style.css';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:400', 'Material Icons'],
  },
});

// TODO automatically load all files in stories folder
function loadStories() {
  require('../stories/JobStatusTable');
  require('../stories/FetchState');
  require('../stories/LogListCard');
  require('../stories/Charts');
  require('../stories/TrainingForm');
}

configure(loadStories, module);
