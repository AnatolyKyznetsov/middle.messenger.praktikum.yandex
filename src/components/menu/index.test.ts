import Menu from './index';
import Text from '../text';

describe('Menu', () => {
    it('should render', () => {
        new Menu({ icon: '', content: [ new Text({}) ] });
    });
});
