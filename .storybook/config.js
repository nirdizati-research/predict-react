import {configure} from '@storybook/react';
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
  require('../stories/Advanced');
  require('../stories/JobStatusTable');
  require('../stories/FetchState');
  require('../stories/LogListCard');
  require('../stories/Charts');
  require('../stories/TrainingForm');
  require('../stories/Validation');
  require('../stories/Upload');
  require('../stories/Split');
  require('../stories/Logs');
}

configure(loadStories, module);
