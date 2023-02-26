import template from './text.hbs';
import Component from '../../utils/Component';

export default class Text extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
