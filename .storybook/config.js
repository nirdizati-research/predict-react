import {configure} from '@kadira/storybook';
// Link to the app CSS
import '../public/css/style.css';

// TODO move stories to root folder
// TODO automatically load all files in stories folder
function loadStories() {
}

configure(loadStories, module);
