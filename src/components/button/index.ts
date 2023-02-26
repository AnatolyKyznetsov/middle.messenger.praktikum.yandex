import template from './button.hbs';
import Component from '../../utils/Component';

export default class Button extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
