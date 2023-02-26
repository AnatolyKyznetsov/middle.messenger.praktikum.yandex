import template from './icon.hbs';
import Component from '../../utils/Component';

export default class Icon extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
