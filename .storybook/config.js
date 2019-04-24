import {configure} from '@storybook/react';
import WebFontLoader from 'webfontloader';

import '../src/scss/style.scss'; // Link to the app CSS

WebFontLoader.load({
    google: {
        families: ['Roboto:400', 'Material Icons'],
    },
});

// TODO: automatically load all files in stories folder
// TODO: commenting all files doesn't seem to do anything (?)
function loadStories() {
    require('../stories/Advanced');
    require('../stories/LineChart');
    require('../stories/JobStatusTable');
    require('../stories/SmallComponents');
    require('../stories/LogListCard');
    require('../stories/Charts');
    require('../stories/TrainingForm');
    require('../stories/Validation');
    require('../stories/Upload');
    require('../stories/Split');
    require('../stories/Logs');
    require('../stories/Static');
}

configure(loadStories, module);
