import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// TODO move this config somewhere else
Enzyme.configure({adapter: new Adapter()});
