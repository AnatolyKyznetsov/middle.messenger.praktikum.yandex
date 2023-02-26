import template from './menu.hbs';
import Component from '../../utils/Component';

export default class Menu extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
