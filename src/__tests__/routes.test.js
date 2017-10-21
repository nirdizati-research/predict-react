import {shallow} from 'enzyme';
import routes from '../routes';

describe('Routes', () => {
  it('renders', () => {
    const element = shallow(routes);
    expect(element).toBeDefined();
  });
});
